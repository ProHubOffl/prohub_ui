
import React from "react";
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import Routing from './components/Navigation/Routing';

function App() {
  return (
    <Router>
        <div>
          <Routing/>
        </div>
    </Router>
  );
}

export default App;
