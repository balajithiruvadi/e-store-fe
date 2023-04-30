import './App.css';
import Datagrid from './Datagrid/datagrid';
import "bootstrap/dist/css/bootstrap.min.css"
import Header from './Header/header';
import { Box, CssBaseline } from '@mui/material';
import RedirectAuth from './Auth/redirection';
import { createContext, useState } from 'react';
export const LoggedContext = createContext();
function App() {
  const [loggedIn, setLoggedIn] = useState('signup');
  return (
    <LoggedContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Box
        sx={{ display: 'flex' }}
        role="presentation"
      >
        <Header />
        <RedirectAuth />
      </Box >
    </LoggedContext.Provider>
  );
}

export default App;
