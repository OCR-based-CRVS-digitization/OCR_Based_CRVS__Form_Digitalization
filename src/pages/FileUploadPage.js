import React, { useState, useContext } from "react";
import "./FileUploadPage.css"
import { useParams } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const FileUploadPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const authCtx = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClick = (id) => {
    navigate(`/home/workspace/${id}`);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log("No file selected.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("filename", selectedFile);
      formData.append("workspace_id", params.workspace_id);

      const response = await fetch(
        "https://crvs.onrender.com/fileUpload/single/",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
          body: formData,
        }
      );

      if (response.ok) {
        alert("File uploaded successfully.");
        console.log("File uploaded successfully.");
        handleClick(params.workspace_id);
        // Do something with the response if needed
      } else {
        console.error("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    // <div className={classes['upload-container']}>
    //   <h1>File Upload Page</h1>
    //   <div class="input-group mb-3">
    //   <input
    //     type="file"
    //     className={classes['file-input']}
    //     onChange={handleFileChange}
    //   />
    //   {selectedFile && (
    //     <button className={classes['upload-button']} onClick={handleUpload}>
    //       Upload
    //     </button>
    //   )}
    //   </div>
    // </div>
    <div class="container custom-container">
    <div class="input-group input-group-lg">
      <input
        type="file"
        class="form-control"
        id="fileUpload"
        aria-describedby="fileUpload"
        aria-label="Upload"
        onChange={handleFileChange}
      />
      <button
        class="btn btn-outline-success"
        type="button"
        id="fileUpload"
        onClick={handleUpload}
      >
        Submit
      </button>
    </div>
    </div>

    // {/* <div class="input-group mb-3">
    // <button class="btn btn-outline-secondary" type="button">Button</button>
    // <button class="btn btn-outline-secondary" type="button">Button</button>
    // <input type="text" class="form-control" placeholder="" aria-label="Example text with two button addons">
    // </div> */}
  );
};

export default FileUploadPage;
