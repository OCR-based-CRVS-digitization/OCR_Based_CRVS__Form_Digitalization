import { useParams } from "react-router-dom";
import Card from "../components/UI/Card/Card";
import Button from "../components/UI/Button/Button";
import classes from "./WorkSpaceDetails.module.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const WorkSpaceDetails = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [workspaceData, setWorkspaceData] = useState([]);

  const handleClickSingle = (id) => {
    navigate(`/home/workspace/${id}/single`);
  };

  const handleClickValidate = (id) => {
    navigate(`/home/workspace/${id}/validate`);
  };

  const handleClickDraft = (id) => {
    navigate(`/home/workspace/${id}/draft`);
  };

  const handleClickValidated = (id) => {
    navigate(`/home/workspace/${id}/history`);
  };



  const fetchData = async () => {
    const url = localStorage.getItem("baseurl") + "/workspace/getworkspace";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "content-type": "application/json",
        },
        body: JSON.stringify({
          workspace_id: params.workspace_id,
        }),
      });

      if (response.status === 401 && (response.statusText === "Token has expired!" || response.statusText === "Invalid token!")) {
        alert("Session Expired, Please Login Again");
        localStorage.removeItem("token");
        localStorage.setItem("isLoggedIn", "0");
        window.location.href = "/";
      }
      const data = await response.json();
      console.log(data);
      setWorkspaceData(data.workspace); // Update the state with fetched data
      // setWorkspaceData(data.workspaces); // Update the state with fetched data
    }
    catch (error) {
      console.error("Error fetching workspace data:", error);
    }
  };

useEffect(() => {
  fetchData(); // Fetch data when the component mounts or authCtx.token changes
}, [params.workspace_id]);

useEffect(() => {
  const handleBeforeUnload = () => {
    fetchData();
  };
  window.addEventListener("beforeunload", handleBeforeUnload);
  
  // Clean up the event listener when the component unmounts
  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, []);



  return (
    <div className="container-fluid p-0">
      <div className="row">
        <div className="col-md-6">
          <Card className={classes.workspacedetails}>
            <h2>WorkSpace Details</h2>
            <h5>{location.state}</h5>
            <Button
              onClick={() => handleClickSingle(params.workspace_id)}
              className={classes.blue}
            >
              Upload single file{" "}
            </Button>
            <Button
              onClick={() => handleClickValidate(params.workspace_id)}
              className={classes.red}
            >
              Validate{" "}
            </Button>
            <Button
              onClick={() => handleClickDraft(params.workspace_id)}
              className={classes.green}
            >
              Draft
            </Button>
            {/* <button type="button" onClick={() => handleClickEdit(params.workspace_id)} className="btn btn-light">Edit Workspace</button> */}
            <Button
              onClick={() => handleClickValidated(params.workspace_id)}
              className={classes.yellow}
            >
              Validated
            </Button>
          </Card>
        </div>
        <div className="col-md-6">
          <div className="container mt-4">
            <h2 className="text-center">Statistics</h2>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Total Uploaded</h5>
                    <p className="card-text">{workspaceData.uploaded}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Waiting for Validation</h5>
                    <p className="card-text">{workspaceData.waiting}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">In Drafts</h5>
                    <p className="card-text">{workspaceData.draft}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h5 className="card-title">Total Validated</h5>
                    <p className="card-text">{workspaceData.validated}</p>
                  </div>
                </div>
              </div>
              {/* Add more statistic cards here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  };


export default WorkSpaceDetails;
