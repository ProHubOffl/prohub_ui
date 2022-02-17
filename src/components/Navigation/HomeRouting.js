import React from 'react'
import Announcement from "../Pages/Announcement";
import Board from "../Pages/Board";
import Backlog from "../Pages/Backlog";
import Documents from "../Pages/Documents";
import Tickets from "../Pages/Tickets";

import {
    Route,
    Switch
  } from "react-router-dom";

function Routing() {
    return (
            <Switch>
                <Route exact path="/Announcement" component={Announcement} />
                <Route exact path="/Backlog" component={Backlog} />
                <Route exact path="/Tickets" component={Tickets} />
                <Route exact path="/document" component={Documents} />
                <Route exact path="/Board" component={Board} />
                <Route exact path="*" component={Board} />
            </Switch>        
    )
}

export default Routing