import React, { useState, useContext } from "react";
import "./FileUploadPage.css"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Toast from "light-toast";

const FileUploadPage = () => {
  const navigate = useNavigate();
  const params = useParams();
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
      let url = localStorage.getItem('baseurl') + "/fileUpload/single/";

      const response = await fetch(
        url,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
          },
          body: formData,
        }
      );

      if (response.ok) {
        Toast.success("File uploaded successfully.", );
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
    <div className="container custom-container">
    <div className="input-group input-group-lg">
      <input
        type="file"
        className="form-control"
        id="fileUpload"
        aria-describedby="fileUpload"
        aria-label="Upload"
        onChange={handleFileChange}
      />
      <button
        className="btn btn-outline-success"
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
