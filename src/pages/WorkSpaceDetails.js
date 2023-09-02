import { useParams } from "react-router-dom";
import Card from "../components/UI/Card/Card";
import Button from "../components/UI/Button/Button";
import classes from "./WorkSpaceDetails.module.css";
import { useNavigate } from "react-router-dom";
const WorkSpaceDetails = () => {
    const navigate = useNavigate();
    const params = useParams();

    const handleClickSingle = (id) => {
      navigate(`/home/workspace/${id}/single`);
    };

    const handleClickValidate = (id) => {
      navigate(`/home/workspace/${id}/validate`);
    };
    return ( 
        <Card className={classes.workspacedetails}>
            <h2>WorkSpace Details</h2>
            <p>{params.workspace_id}</p>
            <Button onClick={() => handleClickSingle(params.workspace_id)} className= {classes.blue} >Upload single file </Button>
            <Button onClick={() => handleClickValidate(params.workspace_id)} className= {classes.red} >Validate </Button>
        </Card>
     );
}

export default WorkSpaceDetails;