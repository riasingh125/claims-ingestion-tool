import React, { useState, ChangeEvent, FormEvent } from "react";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  // Handle form submission
  // connect to the backend API to upload the file
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;
    console.log("Uploading file:", file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit" disabled={!file}>
        Upload Here
      </button>
    </form>
  );
};

export default FileUpload;
