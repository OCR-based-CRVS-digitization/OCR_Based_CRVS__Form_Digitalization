import React, { useState, useEffect } from "react";
import classes from "./Workspace.module.css";
import WorkspaceList from "./WorkSpaceList";
import WorkspaceModal from "../Modal/WorkSpaceModal";

const Workspace = () => {
  const [workspaceData, setWorkspaceData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // State to manage loading status

  const fetchWorkspaceData = async () => {
    console.log("fetchWorkspaceData");
    const url = localStorage.getItem('baseurl') + "/workspace/getAllWorkspace";
    console.log(url);
    try {
      const response = await fetch(
        url,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
          },
        }
      );

      if(response.status === 401 && ( response.statusText==='Token has expired!' || response.statusText==='Invalid token!' )){
        alert("Session Expired, Please Login Again");
        localStorage.removeItem('token');
        localStorage.setItem('isLoggedIn', '0');
        window.location.href = "/";
      }
      const data = await response.json();
      console.log("data");
      console.log(data);
      setWorkspaceData(data.workspaces); // Update the state with fetched data
      setIsDataLoaded(true); // Update the loading state
    } catch (error) {
      console.error("Error fetching workspace data:", error);
    }
  };

  useEffect(() => {
    fetchWorkspaceData(); // Fetch data when the component mounts
  }, []);
  
  // window.addEventListener("beforeunload", fetchWorkspaceData);
  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsDataLoaded(false);
      fetchWorkspaceData();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);


  // Process the fetched data and create an array of workspace objects
  const loadedWorkspace = workspaceData==null?[]:workspaceData.map(workspace => ({
    id: workspace.workspace_id,
    username: workspace.username,
    name: workspace.name,
    class: workspace.level,
    section: workspace.section,
    group: workspace.group,
    roll_start: workspace.roll_start,
    roll_end: workspace.roll_end,
    total: workspace.total,
    year: workspace.year,
    main: workspace.main,
    description: workspace.description,
  }));
  console.log(loadedWorkspace);




return (
  <>
    <div className={classes['upload-button-container']}>
          <WorkspaceModal />
    </div>
    <div className="text-center mt-4 ">
      <div className="d-inline-block rounded p-4 my-3 bg-light">
        <h3 className="mb-0">My Workspace</h3>
      </div>
    </div>
    <div>
      { isDataLoaded ? (
        loadedWorkspace.length > 0 ? (
          <WorkspaceList data={loadedWorkspace} />
        ) : (
          <div className="alert alert-success text-center" role="alert">
            No workspace found
          </div>
        )
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  </>
);
};

export default Workspace;
