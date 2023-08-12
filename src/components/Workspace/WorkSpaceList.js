import React from 'react';
import WorkSpaceCard from './WorkSpaceCard';
import classes from './WorkSpaceList.module.css';
import { useNavigate } from 'react-router-dom';

const WorkspaceList = (props) => {
    const navigate= useNavigate();
    const {data} = props;
    // const descriptions = data.map(item => item.description)
    // const description= descriptions[0];
    // console.log(descriptions);
    console.log("Hewwo")
    console.log(props);
    const handleCardClick = (id) => {
        navigate(`/home/workspace/${id}`)
      };
      

  return (
    <div className={classes.workSpaceList}>
      <div className={classes.cardContainer}>
        <ul>
            {data.map((item) => (
                <WorkSpaceCard key={item.id} text= {item.name} onClick={() => handleCardClick(item.id)} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkspaceList;
