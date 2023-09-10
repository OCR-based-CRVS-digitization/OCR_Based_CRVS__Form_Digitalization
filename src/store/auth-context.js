import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (username, password) => {},
  token: '',
  baseurl: 'https://crvs.onrender.com'
  // baseurl: 'http://localhost:8080'
});



export const AuthProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const authCtx = React.useContext(AuthContext);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    // localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/');
  };

  const loginHandler = async (username, password) => {
    console.log('loginHandler');
    console.log(message);
    
    // localStorage.setItem('isLoggedIn', '1');
    // const User= {
    //   username: username,
    //   password: password
    // }
    // fetch('https://crvs.onrender.com/auth/login', {
    //   method: 'POST',
    //   mode: 'no-cors',
    //   body: JSON.stringify(User),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(res => {
    //   console.log(res)
    //   });

    let data = {
      username: username,
      password: password,
    };
    let url= localStorage.getItem('baseurl') + '/auth/login'

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(data),
      });
      console.log(JSON.stringify(data))
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData)
        setMessage(responseData.message); // Display success message
        // You can also store the token in state or context for future API calls
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('isLoggedIn', '1');
        // setToken(responseData.token);
        // setIsLoggedIn(true);
        // navigate('/home');
        window.location.href('/home');
      } else {
        const errorData = await response.json();
        localStorage.setItem('isLoggedIn', '0');
        localStorage.setItem('token', '');
        console.log(errorData);
        setMessage(errorData.error); // Display error message
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }


  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        token: token,
        baseurl: authCtx.baseurl,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
