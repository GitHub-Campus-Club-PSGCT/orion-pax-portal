import { JSDOM } from "jsdom";

interface DiffResult {
  replicationScore: number;
  differences: string[];
}

export function calculateHTMLDiff(
  correctHTML: string,
  submittedHTML: string,
): DiffResult {
  const correctDOM = new JSDOM(correctHTML);
  const submittedDOM = new JSDOM(submittedHTML);

  const correctBody = correctDOM.window.document.body;
  const submittedBody = submittedDOM.window.document.body;

  let totalElements = 0;
  let matchedElements = 0;
  const differences: string[] = [];

  function compareElements(
    correctEl: Element,
    submittedEl: Element,
    path: string = "body",
  ): void {
    totalElements++;

    // Compare tag names
    if (correctEl.tagName !== submittedEl.tagName) {
      differences.push(
        `${path}: Expected <${correctEl.tagName.toLowerCase()}>, found <${submittedEl.tagName.toLowerCase()}>`,
      );

      return;
    }

    // Compare attributes
    const correctAttrs = Array.from(correctEl.attributes);
    const submittedAttrs = Array.from(submittedEl.attributes);

    if (correctAttrs.length !== submittedAttrs.length) {
      differences.push(`${path}: Attribute count mismatch`);
    }

    for (const attr of correctAttrs) {
      const submittedAttr = submittedEl.getAttribute(attr.name);

      if (submittedAttr === null) {
        differences.push(`${path}: Missing attribute "${attr.name}"`);
      } else if (submittedAttr !== attr.value) {
        differences.push(`${path}: Attribute "${attr.name}" value mismatch`);
      }
    }

    // Check for extra attributes in submitted HTML
    for (const attr of submittedAttrs) {
      if (!correctEl.hasAttribute(attr.name)) {
        differences.push(`${path}: Extra attribute "${attr.name}"`);
      }
    }

    // Compare children
    const correctChildren = Array.from(correctEl.children);
    const submittedChildren = Array.from(submittedEl.children);

    if (correctChildren.length !== submittedChildren.length) {
      differences.push(`${path}: Child element count mismatch`);
    }

    const minLength = Math.min(
      correctChildren.length,
      submittedChildren.length,
    );

    for (let i = 0; i < minLength; i++) {
      compareElements(
        correctChildren[i],
        submittedChildren[i],
        `${path} > ${correctChildren[i].tagName.toLowerCase()}[${i}]`,
      );
    }

    matchedElements++;
  }

  compareElements(correctBody, submittedBody);

  const replicationScore = (matchedElements / totalElements) * 100;

  return {
    replicationScore: Math.round(replicationScore * 100) / 100, // Round to 2 decimal places
    differences,
  };
}

// // Example usage
// const correctHTML = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <title>Correct Page</title>
// </head>
// <body>
//     <div id="container" class="main">
//         <h1>Hello, World!</h1>
//         <p>This is a test.</p>
//     </div>
// </body>
// </html>
// `;

// const submittedHTML = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <title>Submitted Page</title>
// </head>
// <body>
//     <div id="container" class="content">
//         <h1>Hello, World!</h1>
//         <p>This is a submission.</p>
//         <span>Extra element</span>
//     </div>
// </body>
// </html>
// `;

// const result = calculateHTMLDiff(correctHTML, submittedHTML);
// console.log("Replication Score:", result.replicationScore + "%");
// console.log("Differences:");
// result.differences.forEach((diff, index) =>
//   console.log(`${index + 1}. ${diff}`)
// );
