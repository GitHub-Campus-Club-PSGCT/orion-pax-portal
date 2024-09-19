// File: components/OrionpaxComponent.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import FileUploaderMultipleUpload from "../functionalCompnents/fileUploader";

interface ComparisonResult {
  isExactMatch: boolean;
  structuralScore: number;
  contentScore: number;
  overallScore: number;
  differences: string[];
}

const readFileContent = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target && typeof event.target.result === "string") {
        resolve(event.target.result);
      } else {
        reject(new Error("Error reading file"));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

const concatenateFileContents = async (
  uploadedFiles: File[]
): Promise<string> => {
  const contents = await Promise.all(uploadedFiles.map(readFileContent));
  return contents.join("\n");
};

const OrionpaxComponent: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [comparisonResult, setComparisonResult] =
    useState<ComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesUploaded = (files: File[]) => setUploadedFiles(files);

  const performEval = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const uploadedContent = await concatenateFileContents(uploadedFiles);
      const response = await fetch("/api/compareHTML", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uploadedContent }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to compare HTML");
      }
      setComparisonResult(data as ComparisonResult);
    } catch (err: unknown) {
      console.error("Error in performEval:", err);
      if (err instanceof Error) {
        setError(`Error: ${err.message}`);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <FileUploaderMultipleUpload onFilesUploaded={handleFilesUploaded} />
      <div className="flex gap-4 w-full flex-row justify-center items-center">
        <Button
          as="a"
          href="https://github.com/GitHub-Campus-Club-PSGCT/OrionPAX"
          target="_blank"
          rel="noopener noreferrer"
          color="warning"
          variant="shadow"
        >
          Get your Questions...
        </Button>
        <Button
          disabled={uploadedFiles.length === 0 || isLoading}
          onClick={performEval}
          color="success"
          variant="shadow"
        >
          {isLoading ? "Evaluating..." : "Evaluate HTML"}
        </Button>
        <Button
          as="a"
          href="https://forms.gle/nFs87PJf4bNXV2mY7"
          target="_blank"
          rel="noopener noreferrer"
          color="success"
          variant="shadow"
        >
          Submit Image
        </Button>
      </div>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {/* {comparisonResult && (
        <div className="bg-gray-900 p-4 rounded">
          <h2 className="text-xl font-bold">Evaluation Result:</h2>
          <p>
            Structural Score: {comparisonResult.structuralScore.toFixed(2)}%
          </p>
          <p>Content Score: {comparisonResult.contentScore.toFixed(2)}%</p>
          <p>Overall Score: {comparisonResult.overallScore.toFixed(2)}%</p>
          <p>
            {comparisonResult.isExactMatch
              ? "Perfect Match!"
              : "Differences Found"}
          </p>
          {!comparisonResult.isExactMatch && (
            <>
              <h3 className="text-lg font-semibold mt-2">Differences:</h3>
              <ul className="list-disc pl-5">
                {comparisonResult.differences.map((diff, index) => (
                  <li key={index}>{diff}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )} */}
    </div>
  );
};

export default OrionpaxComponent;
