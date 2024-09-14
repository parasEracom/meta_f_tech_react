import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import "./DocumentUpload.css";

const DocumentUpload = ({ onFilesChange }) => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState(null);

  const onDrop = async (acceptedFiles) => {
    const compressedFiles = await Promise.all(
      acceptedFiles.map(async (file) => {
        const options = {
          maxSizeMB: 1, // Maximum file size in MB
          maxWidthOrHeight: 1024, // Maximum width or height in pixels
          useWebWorker: true,
        };
        try {
          const compressedFile = await imageCompression(file, options);
          return compressedFile;
        } catch (err) {
          console.error("Error compressing image:", err);
          return file;
        }
      })
    );

    setFiles(compressedFiles);
    setPreviews(compressedFiles.map((file) => URL.createObjectURL(file)));
    onFilesChange(compressedFiles); // Pass the files back to the parent component
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="file-upload-container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drop your files here</p>
      </div>

      {error && <p className="error-message">{error}</p>}
      <div className="previews">
        {previews.map((preview, index) => (
          <div key={index} className="preview">
            <img src={preview} alt={`Preview ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentUpload;
