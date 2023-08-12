import React from 'react';
import classes from './WorkSpaceCard.module.css';

const WorkSpaceCard = ({ text, onClick }) => {
  return (
    <div className={classes.card} onClick={onClick}>
      <p>{text}</p>
    </div>
  );
};

export default WorkSpaceCard;
