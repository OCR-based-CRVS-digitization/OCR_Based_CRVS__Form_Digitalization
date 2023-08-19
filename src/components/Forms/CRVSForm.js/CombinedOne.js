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
            //console.log(data.validateForm);
            setFormData(data.validateForm);
            // setWorkspaceData(data.workspaces); // Update the state with fetched data
          } catch (error) {
            console.error("Error fetching workspace data:", error);
          }
        };
    
        fetchFormData(); // Fetch data when the component mounts or authCtx.token changes
      }, []);
  return (
    <div className="container-fluid p-0"> {/* Use container-fluid for full-width container */}
      <div className="row">
        <div className="col-md-6">
          <ImageComponent />
        </div>
        <div className="col-md-6">
          <FormPageOne formData={formData}/>
        </div>
      </div>
    </div>
  );
}

export default CombinedOne;
