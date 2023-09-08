import React from 'react';
import ImageComponent from './ImageComponent';
import FormPageOne from './FormPageOne';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

function CombinedOne() {
    const params = useParams();
    const [formData, setFormData] = useState(null);
    const [isFormLoaded, setIsFormLoaded] = useState(false); // State to manage loading status
    const [imageUrl, setImageUrl] = useState(null);
    console.log(params.form_id);


    const fetchFormData = async () => {
      const url = localStorage.getItem('baseurl') + "/workspace/getValidateForm";
      try {
        const response = await fetch(
          url,
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem('token'),
              "content-type": "application/json",
            },
            body: JSON.stringify({
                form_id: params.form_id,
            }),
          }
        );

        if(response.status === 401){
          alert("Session Expired, Please Login Again");
          window.location.href = "/";
        }
        const data = await response.json();
        console.log(data)
         // Update the state with fetched data
         if(data !== null){
          setFormData(data.validateForm.ocr_result);
          setImageUrl(data.validateForm.url);
          setIsFormLoaded(true);
         }
        // setWorkspaceData(data.workspaces); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching workspace data:", error);
      }
    };


    useEffect(() => {
        fetchFormData(); // Fetch data when the component mounts or authCtx.token changes
      }, [ params.form_id]);

    useEffect(() => {
      const handleBeforeUnload = () => {
        setIsFormLoaded(false);
        fetchFormData();
      };
      window.addEventListener("beforeunload", handleBeforeUnload);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, []);



  return (
    <div>
    {isFormLoaded ? (<div className="container-fluid p-0">
    <div className="row">
      <div className="col-md-6">
        <ImageComponent imageURL={imageUrl}/>
      </div>
      <div className="col-md-6 mt-5">
        <FormPageOne formData={formData}/>
      </div>
    </div>
  </div>): <p>Loading...</p>}
  </div>
  );
}

export default CombinedOne;
