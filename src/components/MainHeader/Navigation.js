// import React, { useContext } from 'react';

// import AuthContext from '../../store/auth-context';
// import classes from './Navigation.module.css';

// const Navigation = () => {
//   const ctx = useContext(AuthContext);

//   return (
//     <nav className={classes.nav}>
//       <ul>
//         {ctx.isLoggedIn && (
//           <li>
//             <a href="/"></a>
//           </li>
//         )}
//         {ctx.isLoggedIn && (
//           <li>
//             <a href="/">Admin</a>
//           </li>
//         )}
//         {ctx.isLoggedIn && (
//           <li>
//             <button onClick={ctx.onLogout}>Logout</button>
//           </li>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navigation;

import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  const ctx = useContext(AuthContext);
  const content = ctx.isLoggedIn ? (
      <>
      <li><Link to="/home">Home</Link></li>
        <li><Link to="/home/workspace">Workspaces</Link></li>
        <li><Link to="/home/profile">Profile</Link></li>
        <button onClick={ctx.onLogout}>Logout</button>
        </>
  
  ) : (
    <li>
      <Link to="/"></Link>
    </li>
  );
  return (
    <nav className={classes.nav}>
      <ul>
        {content}
      </ul>
    </nav>
  );
};

export default Navigation;
