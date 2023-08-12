import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import Button from '../UI/Button/Button';
import { useState} from 'react';

const Home = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/home/workspace');
  };
  


  return (
    <Card className={classes.home} >
      <div>
      <Button className= {classes.blue} onClick= {handleClick}>Upload to Workspace</Button>
      <Button className= {classes.red}>Validate</Button>
      <Button className= {classes.green}>Draft</Button>
      <Button className= {classes.yellow}>History</Button>
      </div>
    </Card>
  );
};

export default Home;
