import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import "../../Style/DropdownList.css"
import {FaTimes} from 'react-icons/fa'
import { DropdownButton,Dropdown} from 'react-bootstrap';
import { MdLogout } from "react-icons/md";
import logo from "../../images/prohub.png"
import Badge from '@mui/material/Badge';
import VideocamIcon from '@mui/icons-material/Videocam';
import AuthService from '../../service/authentication/AuthService';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import ProjectUserService from '../../service/user/ProjectUserService';
import Select from 'react-select';
import BacklogService from '../../service/backlog/BacklogService'
import Tooltip from '@mui/material/Tooltip';


const Dropdowncontainer=styled.div`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, #003847 0%, rgba(0, 56, 71, 0.75) 100%);
    display: grid;
    align-items: center;
    top: 0;
    left:0;
    transition: 0.3s ease-in-out;
    display:${({is_open})=>(is_open? 'block':'none')};
    top:${({is_open})=>(is_open? '0':'-100%')};
`;

const Image_section = styled(Link)`
    
`;

const Icon=styled.div`
    position: absolute;
    top:1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`;

const CloseIcon=styled(FaTimes)`
    color:#000d1a;
    :hover{
        color:red;
    }
`;

const DropdownMenu=styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(7,80px);
    text-align: center;
    width:60%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    @media screen and(max-width:1000px){
        grid-template-rows: repeat(7,80px);
    }      
`;

const Logo=styled(Link)`
    font-size: 2rem;
    color: white;
    margin-bottom: auto;
    font-weight: bold;
    text-decoration:none;
    padding-top: 1rem;
    :hover{
        color: orange;
    }
`;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function DropdownList(props){

    const currentUser = AuthService.getCurrentUser();
    const [open, setOpen] = useState(false);
    const [projectData, setProjectData] = useState([])
    const [projectBacklogs,setProjectBacklogs] = useState([]);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const handle_logout = () => {
      AuthService.logout()
      setOpen(false);
    };

    const searchStyle = {
        control: (base,state) => ({
            ...base,
            borderColor: state.isFocused ? "green" : "blue",
            boxShadow: state.isFocused ? null : null,
            height:50,
            minHeight:50,
            borderRadius: 20,
            border:'2px solid blue',
            "&:hover": {
                borderColor: state.isFocused ? "blue" : "green"
            }
        })
    }

    useEffect(() => {
        ProjectUserService.getProjectsByUser(currentUser.email)
        .then(response => {
            setProjectData(response.data)
        })
        .catch(err => {console.log(err)})

        BacklogService.getBacklogbyEmail(currentUser.email)
        .then(response => {
            let backlogs = []
            response.data.map(backlog => {
                let backlogItem = {label:backlog.title,value:backlog.backlogId}
                backlogs.push(backlogItem)
            })
            setProjectBacklogs(backlogs)
        })
        .catch(err =>  console.log(err))
    },[])

    const setcurrentProject = (project) => {
        localStorage.setItem("project", JSON.stringify(project));
        window.location.reload()
    }

    return(
            <div>
                <Dropdowncontainer is_open={props.is_open}>
                    <Icon onClick={props.toggle}>
                        <CloseIcon/>
                    </Icon>
                <DropdownMenu>
                
                    <div className="logo_pic_sn" >
                        <Image_section to="/" onClick={()=>{}}>
                            <img src={logo} alt='logo'/>
                        </Image_section>
                    </div>
                    <Logo to="/" onClick={()=>{}}>
                        ProHub
                    </Logo>
                
                    <DropdownButton title="Active Projects" id="bg-nested-dropdown-sn">
                        {
                            projectData.map((project,index1)=>(           
                                <Dropdown.Item id="Nav_option_sn"  href="#" key={index1}>
                                    <div className="Edit_option"><Link to={{pathname:"/project", state:{project:project}}}><span id="Edit_option"><i className="bi bi-pencil-square"></i></span></Link></div>
                                    <Tooltip title={project.projectName} placement="left" arrow="true"><div className='Text_option' onClick={()=>{setcurrentProject(project)}}>{project.projectName.slice(0,8)}{project.projectName.length>8?"..":""}</div></Tooltip>
                                </Dropdown.Item>
                            ))
                        }
                        <button type="button" className="btn btn-primary fw-bolder" id="btn-CreateProject" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Create Project
                        </button>
                    </DropdownButton>
                    <button id="bg-nested-dropdown-sn"  onClick={props.toggle} href="#">
                        <Link to="/personaldashboard" id='personaldashboard'>Personal&nbsp;Dashboard</Link>
                    </button>

                    <div class="section3">
                        <Select 
                            className="search-select" 
                            placeholder="Search Backlogs" 
                            options={projectBacklogs}
                            onChange={opt => window.location.replace("/backlog/"+opt.value)}
                            style={searchStyle}
                            components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                        />
                    </div>
                    <div className="section4">
                        <div className="notification_option_sn">
                            <Link to = "/videoChat" onClick={props.toggle}  style={{color:'black',textDecoration:'none'}}>
                                Meet
                                <Badge anchorOrigin={{ horizontal:'right', vertical:'top' }} color="error" style={{marginLeft:'5px'}}>
                                    <VideocamIcon />
                                </Badge>
                            </Link>
                        </div>
                    </div>
                    <div className="section5" >
                            <button className="btn btn-info btn-lg" onClick={handleClickOpen}>
                                Logout <MdLogout/>
                            </button>
                                <Dialog
                                open={open}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description"
                                >
                                <DialogTitle>{"Use ProHub's service"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                    Are You Sure You Want To Log Out?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>No</Button>
                                    <Button onClick={handle_logout}>Yes</Button>
                                </DialogActions>
                                </Dialog>
                    </div> 
                </DropdownMenu>
                </Dropdowncontainer>                
            </div>      
        )
}

export default DropdownList