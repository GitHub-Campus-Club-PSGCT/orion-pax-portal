"use client";
import React, { useState, useEffect } from "react";
import {
  Pane,
  FileUploader,
  Alert,
  FileCard,
  majorScale,
  rebaseFiles,
  FileRejectionReason,
  FileRejection,
} from "evergreen-ui";

interface FileUploaderMultipleUploadDemoProps {
  onFilesUploaded: (files: File[]) => void;
  disabled?: boolean;
}

const FileUploaderMultipleUpload: React.FC<
  FileUploaderMultipleUploadDemoProps
> = ({ onFilesUploaded, disabled = false }) => {
  const maxFiles = 1;
  const maxSizeInBytes = 2048 * 1024 ** 2; // 2GB

  const [files, setFiles] = useState<File[]>([]);
  const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);

  useEffect(() => {
    onFilesUploaded(files);
  }, [files, onFilesUploaded]);

  const handleRemove = (file: File) => {
    const updatedFiles = files.filter((existingFile) => existingFile !== file);
    const updatedFileRejections = fileRejections.filter(
      (fileRejection) => fileRejection.file !== file,
    );
    const { accepted, rejected } = rebaseFiles(
      [
        ...updatedFiles,
        ...updatedFileRejections.map((fileRejection) => fileRejection.file),
      ],
      { maxFiles, maxSizeInBytes },
    );

    setFiles(accepted);
    setFileRejections(rejected);
  };

  const fileCountOverLimit = files.length + fileRejections.length - maxFiles;
  const fileCountError = `You can upload up to 50 files. Please remove ${fileCountOverLimit} ${
    fileCountOverLimit === 1 ? "file" : "files"
  }.`;

  return (
    <Pane className="bg-white p-5 m-5 rounded-xl w-full" maxWidth={654}>
      <FileUploader
        description="You can upload up to 50 files. Files can be up to 2GB. You can upload in the .py, .jl, .r formats."
        disabled={disabled || files.length + fileRejections.length >= maxFiles}
        label="Upload Files"
        maxFiles={maxFiles}
        maxSizeInBytes={maxSizeInBytes}
        renderFile={(file, index) => {
          const { name, size, type } = file;
          const renderFileCountError = index === 0 && fileCountOverLimit > 0;
          const fileRejection = fileRejections.find(
            (rejection) =>
              rejection.file === file &&
              rejection.reason !== FileRejectionReason.OverFileLimit,
          );
          const message = fileRejection?.message || "";

          return (
            <React.Fragment key={`${name}-${index}`}>
              {renderFileCountError && (
                <Alert
                  intent="danger"
                  marginBottom={majorScale(2)}
                  title={fileCountError}
                />
              )}
              <FileCard
                isInvalid={fileRejection != null}
                name={name}
                sizeInBytes={size}
                type={type}
                validationMessage={message}
                onRemove={() => handleRemove(file)}
              />
            </React.Fragment>
          );
        }}
        values={[
          ...files,
          ...fileRejections.map((fileRejection) => fileRejection.file),
        ]}
        onAccepted={(acceptedFiles: File[]) => setFiles(acceptedFiles)}
        onRejected={(rejectedFiles: FileRejection[]) =>
          setFileRejections(rejectedFiles)
        }
      />
    </Pane>
  );
};

export default FileUploaderMultipleUpload;
