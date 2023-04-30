import Dashboard from '../Dashboard/Dashboard'
import Signup from '../Signup/signup';
import { useState, useEffect, useContext } from 'react';
import { LoggedContext } from "../App";
import Logincomponent from './login';
import { ThemeProvider } from '@emotion/react';


function RedirectAuth() {
    const { loggedIn, setLoggedIn } = useContext(LoggedContext);
    
    
    return loggedIn==='success'?<Dashboard />:loggedIn==='signup'?<Signup />:<Logincomponent />;
}

export default RedirectAuth;