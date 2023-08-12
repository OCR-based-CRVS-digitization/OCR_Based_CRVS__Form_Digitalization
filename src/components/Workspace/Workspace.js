import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../UI/Card/Card";
import classes from "./Workspace.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";

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
    id: workspace.id,
    username: workspace.username,
    name: workspace.name,
    level: workspace.level,
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


// Extract and display a specific field from each workspace
const displayedField = loadedWorkspace.map(workspace => workspace.name); // Change 'name' to the desired field

const handleClick = () => {
  navigate('/home/fileupload');
};

return (
  <>
    <Card className={classes.workspace}>
      <div>
        <h1>My Workspace</h1>
        {displayedField.map((field, index) => (
          <p key={index}>{field}</p>
        ))}
      </div>
    </Card>
    <Card className={classes.workspace}>
      <div>
        <h1></h1>
      </div>
    </Card>
  </>
);
};

export default Workspace;
