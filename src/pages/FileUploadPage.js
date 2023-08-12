import React, { useState, useContext } from 'react';
import classes from './FileUploadPage.module.css';
import { useParams } from 'react-router-dom';
import AuthContext from '../store/auth-context';

const FileUploadPage = () => {
    const params = useParams();
    const authCtx = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log('No file selected.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('filename', selectedFile);
      formData.append('workspace_id', params.id);

      const response = await fetch('http://localhost:8080/fileUpload/single/', {
        method: 'POST',
        headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully.');
        // Do something with the response if needed
      } else {
        console.error('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className={classes['upload-container']}>
      <h1>File Upload Page</h1>
      <input
        type="file"
        className={classes['file-input']}
        onChange={handleFileChange}
      />
      {selectedFile && (
        <button className={classes['upload-button']} onClick={handleUpload}>
          Upload
        </button>
      )}
    </div>
  );
};

export default FileUploadPage;
