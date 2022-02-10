
import React from "react";
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Routing from './components/Navigation/Routing';
import AuthService from "./service/authentication/AuthService";
import Home from "./components/Navigation/Home";


function App() {
  return (
    <>
      {
      (AuthService.getCurrentUser() != null)
      ?
        <Home/>
      :
        <Router>
          <div>
            <Routing/>
          </div>
        </Router>
      } 
    </>
  );
}

export default App;
