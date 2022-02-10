import React from 'react'
import Announcement from "../Pages/Announcement";
import Board from "../Pages/Board";
import Backlog from "../Pages/Backlog";
import Documents from "../Pages/Documents";
import Tickets from "../Pages/Tickets";

import {
    BrowserRouter as Router,
    Link,
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
                <Route exact path="/Announcement" component={Announcement} />
                <Route exact path="/Backlog" component={Backlog} />
                <Route exact path="/Tickets" component={Tickets} />
                <Route exact path="/document" component={Documents} />
                <Route exact path="/Board" component={Board} />            
            </Switch>        
    )
}

export default Routing