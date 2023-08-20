import React from 'react';
import ImageComponent from './ImageComponent';
import FormPageOne from './FormPageOne';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../store/auth-context";

function CombinedOne() {
    const authCtx = useContext(AuthContext);
    const params = useParams();
    const [formData, setFormData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    console.log(params.form_id);

    useEffect(() => {
        const fetchFormData = async () => {
          try {
            const response = await fetch(
              "https://crvs.onrender.com/workspace/getValidateForm",
              {
                method: "POST",
                headers: {
                  Authorization: "Bearer " + authCtx.token,
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                    form_id: params.form_id,
                }),
              }
            );
            const data = await response.json();
             // Update the state with fetched data
            setFormData(data.validateForm.ocr_result);
            setImageUrl(data.validateForm.url);;
            // setWorkspaceData(data.workspaces); // Update the state with fetched data
          } catch (error) {
            console.error("Error fetching workspace data:", error);
          }
        };
    
        fetchFormData(); // Fetch data when the component mounts or authCtx.token changes
      }, [authCtx.token, params.form_id]);
  return (
    <div className="container-fluid p-0"> {/* Use container-fluid for full-width container */}
      <div className="row">
        <div className="col-md-6">
          <ImageComponent imageURL={imageUrl}/>
        </div>
        <div className="col-md-6 mt-5">
          <FormPageOne formData={formData}/>
        </div>
      </div>
    </div>
  );
}

export default CombinedOne;
