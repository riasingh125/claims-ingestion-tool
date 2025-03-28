// FileUpload.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile && selectedFile.type !== "text/csv") {
      setError("Please upload a CSV file.");
      setFile(null);
      toast.error("Invalid file type. Please upload a CSV file.");
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
      const response = await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("File uploaded successfully.");
        // Optionally navigate to a charts view after upload
        navigate("/view-charts");
        window.location.reload()
      } else {
        const errorMessage = await response.text();
        toast.error(`Upload failed: ${errorMessage}`);
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      toast.error("Error uploading file.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={!file} >
        Upload Here
      </button> 
      <ToastContainer />
    </form>
  );
};

export default FileUpload;
