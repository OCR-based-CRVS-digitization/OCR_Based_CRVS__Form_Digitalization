import React, { useState, useEffect, useContext } from "react";
import Card from "../UI/Card/Card";
import classes from "./Workspace.module.css";
import AuthContext from "../../store/auth-context";
import WorkspaceList from "./WorkSpaceList";
import WorkspaceModal from "../Modal/WorkSpaceModal"

const Workspace = () => {
  const authCtx = useContext(AuthContext);
  const [workspaceData, setWorkspaceData] = useState([]);


  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        const response = await fetch(
          "https://crvs.onrender.com/workspace/getAllWorkspace",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + authCtx.token,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setWorkspaceData(data.workspaces); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching workspace data:", error);
      }
    };

    fetchWorkspaceData(); // Fetch data when the component mounts or authCtx.token changes
  }, [authCtx.token]);


  // Process the fetched data and create an array of workspace objects
  const loadedWorkspace = workspaceData.map(workspace => ({
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
    <header>
    <div className={classes['upload-button-container']}>
          <WorkspaceModal />
      </div>
    </header>
    <Card className={classes.workspace}>
      <div>
        <h1>My Workspace</h1>
      </div>

    </Card>
    <Card className={classes.workspace}>
      <div>
        <WorkspaceList data= {loadedWorkspace} />
      </div>
    </Card>
  </>
);
};

export default Workspace;
