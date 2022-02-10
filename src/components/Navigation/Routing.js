import React from 'react'
import Announcement from "../Pages/Announcement";
import Board from "../Pages/Board";
import Backlog from "../Pages/Backlog";
import Documents from "../Pages/Documents";
import Tickets from "../Pages/Tickets";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import Home from './Home';
import HomeRouting from '../Navigation/HomeRouting';


import {
    BrowserRouter as Router,
    Link,
    Redirect,
    Navigate,
    Outlet,
    Route,
    Routes,
    useLocation,
    Switch
  } from "react-router-dom";

function Routing() {
    const location = useLocation();
    return (
            <Switch location={location} key={location.pathname}>
                <Route exact path="/authenticate" component={Signin} />
                <Route exact path="/" component={Signin} />
                <Route exact path="/register" component={Signup} />                            
            </Switch>        
    )
}

export default Routing