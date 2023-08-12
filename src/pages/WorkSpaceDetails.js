import { useParams } from "react-router-dom";
import Card from "../components/UI/Card/Card";
import Button from "../components/UI/Button/Button";
import classes from "./WorkSpaceDetails.module.css";
import { useNavigate } from "react-router-dom";
const WorkSpaceDetails = () => {
    const navigate = useNavigate();
    const params = useParams();

    const handleClick = (id) => {
      navigate(`/home/workspace/${id}/fileupload`);
    };
    return ( 
        <Card className={classes.workspacedetails}>
            <h2>WorkSpace Details</h2>
            <p>{params.id}</p>
            <Button onClick={() => handleClick(params.id)}>Upload single file </Button>
        </Card>
     );
}

export default WorkSpaceDetails;