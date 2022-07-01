import React from 'react'
import Announcement from "../Pages/Announcement";
import Board from "../Pages/Board";
import Backlog from "../Pages/Backlog";
import Documents from "../Pages/Documents";
import EditProfile from '../Pages/EditProfile';
import ViewBacklog from '../Pages/ViewBacklog';

import {
    Route,
    Switch
  } from "react-router-dom";

function Routing() {
    return (
            <Switch>
                <Route exact path="/Announcement" component={Announcement} />
                <Route exact path="/Backlog" component={Backlog} />
                <Route exact path="/document" component={Documents} />
                <Route exact path="/Board" component={Board} />
                <Route exact path="/EditProfile" component={EditProfile} />
                <Route exact path="/Backlog/:backlogId" component={ViewBacklog} />
                <Route exact path="*" component={Board} />
            </Switch>        
    )
}

export default Routing