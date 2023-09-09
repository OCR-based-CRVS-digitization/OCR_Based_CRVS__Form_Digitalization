import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';


const ValidatedList = () => {
    const params = useParams();
    // const navigate = useNavigate(); // State to hold list of items from API

    const [data, setData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // State to manage loading status 

    // const handleClick = (id) => {
    //     navigate(`/home/workspace/${params.workspace_id}/validate/${id}/1`);
    // };

    const fetchData = async () => {
      const url = localStorage.getItem('baseurl') + "/workspace/getValidatedList";
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
          localStorage.removeItem('token');
          localStorage.setItem('isLoggedIn', '0');
          alert("Session Expired, Please Login Again");
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

    const sortItemsRoll = () => {
        const sortedItems = [...data]; // Create a copy of the original array
        sortedItems.sort((a, b) => a.ROLL.localeCompare(b.ROLL)); // Sort by name field
        setData(sortedItems); // Update state with the sorted array
      };

      const sortItemsName = () => {
        const sortedItems = [...data]; // Create a copy of the original array
        sortedItems.sort((a, b) => a.STUDENT_NAME.localeCompare(b.STUDENT_NAME)); // Sort by name field
        setData(sortedItems); // Update state with the sorted array
      };


  return (
    <div className= "container">
      {isDataLoaded ? (
        data.length > 0 ? (<div>
        <h4 centered>Validated Form List</h4>
        <button onClick={sortItemsRoll}>Sort by Roll</button>
        <button onClick={sortItemsName}>Sort by Name</button>
        <table className="table table-success table-striped caption-top">
          <thead>
            <tr>
              <th>Roll</th>
              <th>Name</th>
              <th>Father's Name</th>
              <th>Mother's Name</th>
              <th>Gender</th>
              <th>Religion</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.ROLL}>
                <td>{item.ROLL}</td>
                <td>{item.STUDENT_NAME}</td>
                <td>{item.FATHER_NAME}</td>
                <td>{item.MOTHERS_NAME}</td>
                <td>{item.GENDER}</td>
                <td>{item.RELIGION}</td>
              </tr>
            ))}
          </tbody>
        </table> </div>) : (
          <div className="alert alert-success text-center" role="alert">
            No validated forms
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

export default ValidatedList;
