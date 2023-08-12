import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../UI/Card/Card";
import classes from "./Workspace.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import WorkspaceList from "./WorkSpaceList";

const Workspace = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [workspaceData, setWorkspaceData] = useState([]);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/workspace/getAllWorkspace",
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

  //   id: workspace_id,
  //   username: workspace.username,
  //   name: workspace.name,
  //   level: workspace.class,
  //   section: workspace.section,
  //   group: workspace.group,
  //   roll_start: workspace.roll_start,
  //   roll_end: workspace.roll_end,
  //   total: workspace.total,
  //   year: workspace.year,
  //   main: workspace.default,
  //   description: workspace.description

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



const handleClick = () => {
  navigate('/home/fileupload');
};

return (
  <>
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
