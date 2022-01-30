import React,{useState} from 'react';
import Navbar from "./Navbar";
import DropdownList from "./DropdownList";
import Sidebar from "./Sidebar";

function Home(props) {
    const[is_this_open,set_open]=useState(false);
    const toggle=()=>{
      set_open(!is_this_open)
    }

    return (
        <div>
          <Navbar toggle={toggle} />
          <DropdownList is_open={is_this_open} toggle={toggle} />
          <Sidebar/> 
        </div>
    );
}

export default Home;