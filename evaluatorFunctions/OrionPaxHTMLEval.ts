import { JSDOM } from "jsdom";

interface EvaluationResult {
  overallScore: number;
  structureScore: number;
  attributeScore: number;
  textContentScore: number;
  errors: string[];
  warnings: string[];
  metrics: {
    totalElements: number;
    correctElements: number;
    missingElements: number;
    extraElements: number;
    correctAttributes: number;
    incorrectAttributes: number;
    missingAttributes: number;
    extraAttributes: number;
    correctTextNodes: number;
    incorrectTextNodes: number;
  };
}

export function evaluateHTMLDebug(
  correctHTML: string,
  participantHTML: string
): EvaluationResult {
  const correctDOM = new JSDOM(correctHTML);
  const participantDOM = new JSDOM(participantHTML);

  const correctDoc = correctDOM.window.document;
  const participantDoc = participantDOM.window.document;

  let overallScore = 100;
  const errors: string[] = [];
  const warnings: string[] = [];
  const metrics = {
    totalElements: 0,
    correctElements: 0,
    missingElements: 0,
    extraElements: 0,
    correctAttributes: 0,
    incorrectAttributes: 0,
    missingAttributes: 0,
    extraAttributes: 0,
    correctTextNodes: 0,
    incorrectTextNodes: 0,
  };

  // Compare structure
  const structureResult = compareStructure(
    correctDoc.body,
    participantDoc.body
  );
  const structureScore = structureResult.score;
  overallScore -= (100 - structureScore) * 0.5;
  errors.push(...structureResult.errors);
  warnings.push(...structureResult.warnings);
  Object.assign(metrics, structureResult.metrics);

  // Compare attributes
  const attributeResult = compareAttributes(
    correctDoc.body,
    participantDoc.body
  );
  const attributeScore = attributeResult.score;
  overallScore -= (100 - attributeScore) * 0.3;
  errors.push(...attributeResult.errors);
  warnings.push(...attributeResult.warnings);
  Object.assign(metrics, attributeResult.metrics);

  // Compare text content
  const textResult = compareTextContent(correctDoc.body, participantDoc.body);
  const textContentScore = textResult.score;
  overallScore -= (100 - textContentScore) * 0.2;
  errors.push(...textResult.errors);
  warnings.push(...textResult.warnings);
  Object.assign(metrics, textResult.metrics);

  return {
    overallScore: Math.max(0, Math.round(overallScore)),
    structureScore: Math.round(structureScore),
    attributeScore: Math.round(attributeScore),
    textContentScore: Math.round(textContentScore),
    errors,
    warnings,
    metrics,
  };

  function compareStructure(
    correctNode: Node,
    participantNode: Node
  ): {
    score: number;
    errors: string[];
    warnings: string[];
    metrics: Partial<EvaluationResult["metrics"]>;
  } {
    const result = {
      score: 100,
      errors: [] as string[],
      warnings: [] as string[],
      metrics: {
        totalElements: 0,
        correctElements: 0,
        missingElements: 0,
        extraElements: 0,
      },
    };

    if (!correctNode || !participantNode) {
      result.score = 0;
      result.errors.push("Node mismatch: One of the nodes is missing");
      return result;
    }

    if (correctNode.nodeType !== participantNode.nodeType) {
      result.errors.push(
        `Node type mismatch: Expected ${correctNode.nodeType}, got ${participantNode.nodeType}`
      );
      result.score -= 50;
      return result;
    }

    if (
      correctNode.nodeType === Node.ELEMENT_NODE &&
      participantNode.nodeType === Node.ELEMENT_NODE
    ) {
      const correctElement = correctNode as Element;
      const participantElement = participantNode as Element;
      result.metrics.totalElements++;

      if (correctElement.tagName !== participantElement.tagName) {
        result.errors.push(
          `Tag name mismatch: Expected <${correctElement.tagName.toLowerCase()}>, got <${participantElement.tagName.toLowerCase()}>`
        );
        result.score -= 50;
        result.metrics.missingElements++;
      } else {
        result.metrics.correctElements++;
      }

      const correctChildren = Array.from(correctElement.children);
      const participantChildren = Array.from(participantElement.children);

      if (correctChildren.length !== participantChildren.length) {
        result.warnings.push(
          `Child count mismatch: Expected ${correctChildren.length}, got ${participantChildren.length}`
        );
        result.score -= 20;
        result.metrics.missingElements += Math.max(
          0,
          correctChildren.length - participantChildren.length
        );
        result.metrics.extraElements += Math.max(
          0,
          participantChildren.length - correctChildren.length
        );
      }

      const minLength = Math.min(
        correctChildren.length,
        participantChildren.length
      );
      for (let i = 0; i < minLength; i++) {
        const childResult = compareStructure(
          correctChildren[i],
          participantChildren[i]
        );
        result.score += childResult.score;
        result.errors.push(...childResult.errors);
        result.warnings.push(...childResult.warnings);
        Object.entries(childResult.metrics).forEach(([key, value]) => {
          result.metrics[key] += value;
        });
      }

      result.score /= minLength + 1;
    }

    return result;
  }

  function compareAttributes(
    correctNode: Node,
    participantNode: Node
  ): {
    score: number;
    errors: string[];
    warnings: string[];
    metrics: Partial<EvaluationResult["metrics"]>;
  } {
    const result = {
      score: 100,
      errors: [] as string[],
      warnings: [] as string[],
      metrics: {
        correctAttributes: 0,
        incorrectAttributes: 0,
        missingAttributes: 0,
        extraAttributes: 0,
      },
    };

    if (!correctNode || !participantNode) return result;

    if (
      correctNode.nodeType === Node.ELEMENT_NODE &&
      participantNode.nodeType === Node.ELEMENT_NODE
    ) {
      const correctElement = correctNode as Element;
      const participantElement = participantNode as Element;

      const correctAttrs = correctElement.attributes;
      const participantAttrs = participantElement.attributes;

      if (correctAttrs.length !== participantAttrs.length) {
        result.warnings.push(
          `Attribute count mismatch: Expected ${correctAttrs.length}, got ${participantAttrs.length}`
        );
        result.score -= 20;
      }

      for (let i = 0; i < correctAttrs.length; i++) {
        const correctAttr = correctAttrs[i];
        const participantAttr = participantElement.getAttribute(
          correctAttr.name
        );

        if (!participantAttr) {
          result.errors.push(`Missing attribute: ${correctAttr.name}`);
          result.score -= 10;
          result.metrics.missingAttributes++;
        } else if (participantAttr !== correctAttr.value) {
          result.errors.push(
            `Attribute value mismatch for ${correctAttr.name}: Expected "${correctAttr.value}", got "${participantAttr}"`
          );
          result.score -= 5;
          result.metrics.incorrectAttributes++;
        } else {
          result.metrics.correctAttributes++;
        }
      }

      for (let i = 0; i < participantAttrs.length; i++) {
        const participantAttr = participantAttrs[i];
        if (!correctElement.hasAttribute(participantAttr.name)) {
          result.warnings.push(`Extra attribute: ${participantAttr.name}`);
          result.metrics.extraAttributes++;
        }
      }

      const correctChildren = Array.from(correctElement.children);
      const participantChildren = Array.from(participantElement.children);

      const minLength = Math.min(
        correctChildren.length,
        participantChildren.length
      );
      for (let i = 0; i < minLength; i++) {
        const childResult = compareAttributes(
          correctChildren[i],
          participantChildren[i]
        );
        result.score += childResult.score;
        result.errors.push(...childResult.errors);
        result.warnings.push(...childResult.warnings);
        Object.entries(childResult.metrics).forEach(([key, value]) => {
          result.metrics[key] += value;
        });
      }

      result.score /= minLength + 1;
    }

    return result;
  }

  function compareTextContent(
    correctNode: Node,
    participantNode: Node
  ): {
    score: number;
    errors: string[];
    warnings: string[];
    metrics: Partial<EvaluationResult["metrics"]>;
  } {
    const result = {
      score: 100,
      errors: [] as string[],
      warnings: [] as string[],
      metrics: {
        correctTextNodes: 0,
        incorrectTextNodes: 0,
      },
    };

    if (!correctNode || !participantNode) return result;

    if (
      correctNode.nodeType === Node.TEXT_NODE &&
      participantNode.nodeType === Node.TEXT_NODE
    ) {
      const correctText = correctNode.textContent?.trim() || "";
      const participantText = participantNode.textContent?.trim() || "";

      if (correctText !== participantText) {
        result.errors.push(
          `Text content mismatch: Expected "${correctText}", got "${participantText}"`
        );
        result.score -= 50;
        result.metrics.incorrectTextNodes++;
      } else {
        result.metrics.correctTextNodes++;
      }
    } else if (
      correctNode.nodeType === Node.ELEMENT_NODE &&
      participantNode.nodeType === Node.ELEMENT_NODE
    ) {
      const correctElement = correctNode as Element;
      const participantElement = participantNode as Element;

      const correctChildren = Array.from(correctElement.childNodes);
      const participantChildren = Array.from(participantElement.childNodes);

      const minLength = Math.min(
        correctChildren.length,
        participantChildren.length
      );
      for (let i = 0; i < minLength; i++) {
        const childResult = compareTextContent(
          correctChildren[i],
          participantChildren[i]
        );
        result.score += childResult.score;
        result.errors.push(...childResult.errors);
        result.warnings.push(...childResult.warnings);
        Object.entries(childResult.metrics).forEach(([key, value]) => {
          result.metrics[key] += value;
        });
      }

      result.score /= minLength + 1;
    }

    return result;
  }
}
