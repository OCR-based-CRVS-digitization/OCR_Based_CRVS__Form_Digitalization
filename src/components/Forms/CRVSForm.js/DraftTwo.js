import React from 'react';
import PDFComponent from './PDFComponent';
import FormPageTwo from './FormPageTwo';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from "react";

function DraftTwo(props) {
    const params = useParams();
    const [formData, setFormData] = useState(null);
    const [isFormLoaded, setIsFormLoaded] = useState(false); // State to manage loading status
    const [pdfUrl, setPDFUrl] = useState(null);
    const [form_id, setFormId] = useState(null);
    console.log(params.form_id);

    const fetchFormData = async () => {
      const url = localStorage.getItem('baseurl') + "/workspace/getDraftForm";
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

        if(response.status === 401 && ( response.statusText==='Token has expired!' || response.statusText==='Invalid token!' )){
          alert("Session Expired, Please Login Again");
          localStorage.removeItem('token');
          localStorage.setItem('isLoggedIn', '0');
          window.location.href = "/";
        }
        const data = await response.json();
        console.log(data)
         // Update the state with fetched data
         if(data !== null){
          setFormData(data.draft);
          setPDFUrl(data.url);
          setFormId(data.form_id);
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
        <PDFComponent pdfUrl={pdfUrl} pageNumber= {2}/>
      </div>
      <div className="col-md-6 mt-5">
        <FormPageTwo formData={formData} form_id={form_id}/>
      </div>
    </div>
  </div>): <p>Loading...</p>}
  </div>
  );
}

export default DraftTwo;
