import fs from "fs/promises";
import path from "path";

import { NextRequest, NextResponse } from "next/server";
import { JSDOM } from "jsdom";
import { diffWords, Change } from "diff";
import { currentUser } from "@clerk/nextjs/server";

import { createClient } from "@/utils/supabase/server";

interface ComparisonResult {
  isExactMatch: boolean;
  structuralScore: number;
  contentScore: number;
  overallScore: number;
  differences: string[];
}

export async function POST(request: NextRequest) {
  console.log("API route called");
  try {
    const body = await request.json();

    console.log("Request body received");

    const { uploadedContent } = body;

    if (!uploadedContent) {
      console.error("Missing uploadedContent");

      return NextResponse.json(
        { error: "Missing uploadedContent" },
        { status: 400 },
      );
    }

    console.log("Attempting to read correct HTML file");
    const correctFilePath = path.join(
      process.cwd(),
      "data",
      "correct_html.html",
    );

    let correctContent;

    try {
      correctContent = await fs.readFile(correctFilePath, "utf-8");
      console.log("Correct HTML file read successfully");
    } catch (fileError) {
      console.error("Error reading correct HTML file:", fileError);

      return NextResponse.json(
        {
          error: "Failed to read correct HTML file",
          details:
            fileError instanceof Error ? fileError.message : "Unknown error",
        },
        { status: 500 },
      );
    }

    console.log("Comparing HTML");
    const result = compareHTML(correctContent, uploadedContent);

    console.log("Comparison result:", result);
    const supabase = createClient();
    const user = await currentUser();
    const { error } = await supabase.from("orionpax").insert({
      competition_id: 1,
      username: user?.username,
      userid: user?.id,
      structural_score: result.structuralScore,
      content_score: result.contentScore,
      overall_score: result.overallScore,
    });

    if (error) {
      console.log("Supabase push error");
      console.log(error);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Unhandled error in API route:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

function normalizeHTML(html: string): string {
  const dom = new JSDOM(html);

  return dom.window.document.body.innerHTML.replace(/\s+/g, " ").trim();
}

function compareStructure(correctHTML: string, uploadedHTML: string): number {
  const correctDOM = new JSDOM(correctHTML);
  const uploadedDOM = new JSDOM(uploadedHTML);

  const correctElements = Array.from(
    correctDOM.window.document.body.querySelectorAll("*"),
  );
  const uploadedElements = Array.from(
    uploadedDOM.window.document.body.querySelectorAll("*"),
  );

  const totalElements = correctElements.length;
  let matchedElements = 0;

  correctElements.forEach((correctEl, index) => {
    const uploadedEl = uploadedElements[index];

    if (uploadedEl && correctEl.tagName === uploadedEl.tagName) {
      matchedElements++;
    }
  });

  return (matchedElements / totalElements) * 100;
}

function compareHTML(
  correctHTML: string,
  uploadedHTML: string,
): ComparisonResult {
  const normalizedCorrect = normalizeHTML(correctHTML);
  const normalizedUploaded = normalizeHTML(uploadedHTML);

  const structuralScore = compareStructure(correctHTML, uploadedHTML);

  const diff = diffWords(normalizedCorrect, normalizedUploaded);

  const differences: string[] = [];
  let totalWords = 0;
  let matchedWords = 0;

  diff.forEach((part: Change) => {
    if (part.added) {
      differences.push(`Added: "${part.value}"`);
    } else if (part.removed) {
      differences.push(`Removed: "${part.value}"`);
    } else {
      matchedWords += part.value.split(/\s+/).length;
    }
    totalWords += part.value.split(/\s+/).length;
  });

  const contentScore = (matchedWords / totalWords) * 100;

  const overallScore = structuralScore * 0.7 + contentScore * 0.3;
  const isExactMatch = normalizedCorrect === normalizedUploaded;

  return {
    isExactMatch,
    structuralScore: Math.round(structuralScore * 100) / 100,
    contentScore: Math.round(contentScore * 100) / 100,
    overallScore: Math.round(overallScore * 100) / 100,
    differences: isExactMatch ? [] : differences,
  };
}
