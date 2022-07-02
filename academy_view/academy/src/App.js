import React, { useEffect, useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material';

import { validUser } from './utils/Authentication/ValidUser';
import { lightTheme, darkTheme } from './themes/themes';

import Routing from './Routing';

function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authType, setAuthType] = useState();
  const [token, setToken] = useState();
  const theme = createTheme(lightTheme);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    //console.log(userData);
    if (validUser(userData)) {
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    const tokenData = localStorage.getItem('token');
    setToken(tokenData);
  }, []);

  useEffect(() => {
    if (validUser(user)) {
      const auth = JSON.parse(localStorage.getItem('authType'));
      setAuthType(auth);
    }
  }, [user]);

  useEffect(() => {
    setIsLoggedIn(validUser(user));
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <Routing
        user={user}
        setUser={setUser}
        isLoggedIn={isLoggedIn}
        authType={authType}
      />
    </ThemeProvider>
  );
}

export default App;
