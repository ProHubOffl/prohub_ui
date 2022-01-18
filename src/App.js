
import React,{useState} from "react";
import Navbar from "./components/Navigation/Navbar";
import DropdownList from "./components/Navigation/DropdownList";
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Routing from './components/Navigation/Routing';
import Sidebar from "./components/Navigation/Sidebar";

function App() {
  const[is_this_open,set_open]=useState(false);
  const toggle=()=>{
    set_open(!is_this_open)
  }

  return (
    <Router>
        <div>
          <Navbar toggle={toggle} />
          <DropdownList is_open={is_this_open} toggle={toggle} />
          <Sidebar/>
          <Routing/>
        </div>
    </Router>
  );
}

export default App;
