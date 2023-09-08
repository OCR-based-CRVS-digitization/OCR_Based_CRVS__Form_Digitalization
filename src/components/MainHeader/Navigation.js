
import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import classes from './Navigation.module.css';

const logoutHandler = () => {
  localStorage.setItem('isLoggedIn', '0');
  localStorage.setItem('token', '');
  window.location.href = "/";
};

const Navigation = (props) => {

  const [content, setContent] = useState(
    <li>
    <Link to="/"></Link>
    </li>
  );

  const [ LoggedIn, setIsLoggedIn ] = useState(localStorage.getItem('isLoggedIn'));

  useEffect(() => {
    if(LoggedIn === '1'){
      setContent(
        <>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/home/workspace">Workspaces</Link></li>
          <li><Link to="/home/profile">Profile</Link></li>
          <button type="button" onClick={logoutHandler}>Logout</button>
        </>
      );
    }else{
      setContent(
        <li>
          <Link to="/"></Link>
        </li>
      );
    }
    
  },[LoggedIn]);
  
  return (
    <nav className={classes.nav}>
      <ul>
        {content}
      </ul>
    </nav>
  );
};

export default Navigation;
