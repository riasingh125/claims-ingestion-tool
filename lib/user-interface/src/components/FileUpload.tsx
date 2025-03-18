// FileUpload.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile && selectedFile.type !== "text/csv") {
      setError("Please upload a CSV file.");
      setFile(null);
    } else {
      setError(null);
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      setUploadStatus("Uploading...");
      console.log("Uploading file:", file);
      const response = await axios.post("/api/upload-csv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response:", response);
      setUploadStatus("Upload successful!");
      console.log("Server response:", response.data);
    } catch (error) {
      setUploadStatus("Upload failed.");
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={!file}>
        Upload Here
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </form>
  );
};

export default FileUpload;
