import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Toast from "light-toast";


const DraftList = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // State to manage loading status 

    const handleClick = (id) => {
        navigate(`/home/workspace/${params.workspace_id}/draft/${id}/1`);
    };

    const fetchData = async () => {
      const url = localStorage.getItem('baseurl') + "/workspace/getDraftList";
      console.log(url);
      console.log(params.workspace_id);
      try {
        console.log(params.workspace_id);
        const response = await fetch(
          url,
          {
            method: "POST",
            headers: {
              Authorization: "Bearer " + localStorage.getItem('token'),
              "content-type": "application/json",
            },
            body: JSON.stringify({
                workspace_id: params.workspace_id,
            }),
          }
        );

        if(response.status === 401 && ( response.statusText==='Token has expired!' || response.statusText==='Invalid token!' ) ){
          Toast.fail("Session Expired, Please Login Again", 2000);
          localStorage.removeItem('token');
          localStorage.setItem('isLoggedIn', '0');
          window.location.href = "/";
        }

        console.log(response);
        const newData = await response.json();
        console.log(newData);
        setData(newData); // Update the state with fetched data
        setIsDataLoaded(true); // Update the loading state
        
      } catch (error) {
        console.error("Error fetching workspace data:", error);
      }
    };

    useEffect(() => {  
        fetchData(); // Fetch data when the component mounts or authCtx.token changes
    }, [params.workspace_id]);

    useEffect(() => {
      const handleBeforeUnload = () => {
        setIsDataLoaded(false);
        fetchData();
      };
      window.addEventListener("beforeunload", handleBeforeUnload);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, []);

    


  return (
    <div className= "container">
      {isDataLoaded ? (
        data.length > 0 ? (<table className="table table-success table-striped caption-top">
          <caption>Forms to be validated</caption>
          <thead>
            <tr>
              <th>Form ID</th>
              <th>Name</th>
              <th>Roll</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.roll}</td>
                <td>
                <button className="btn btn-success" onClick={() => handleClick(item.id)} >Validate</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>) : (
          <div className="alert alert-success text-center" role="alert">
            No forms to validate
          </div>
        )
      ) :
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      }
    </div>
  );
};

export default DraftList;
