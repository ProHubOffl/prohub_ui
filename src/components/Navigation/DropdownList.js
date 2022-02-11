import React from 'react'
import styled from 'styled-components'
import { menuData } from '../../data/Menudata'
import { dashboardData } from '../../data/Dashboarddata';
import { projectData } from '../../data/Projectdata';
import {Link} from 'react-router-dom'
import "../../Style/DropdownList.css"
import {FaTimes} from 'react-icons/fa'
import { DropdownButton,Dropdown,ButtonGroup} from 'react-bootstrap';
import { MdLogout } from "react-icons/md";
import logo from "../../images/prohub.png"
import Badge from '@mui/material/Badge';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AuthService from '../../service/authentication/AuthService';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


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

    const [open, setOpen] = React.useState(false);

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
                
                   {
                    menuData.map((item,index)=>(                          
                            <DropdownButton as={ButtonGroup} title={item.title}  key={index}  id="bg-nested-dropdown-sn">
                                {
                                (item.key === 1)
                                ?
                                projectData.map((item,index_sub1)=>(           
                                <Dropdown.Item  id="Nav_option_sn"  eventKey={item.event_key} to={item.link} onClick={()=>{}} key={index_sub1}>{item.sub1}</Dropdown.Item>
                                    ))
                                :
                                dashboardData.map((item,index_sub2)=>(           
                                <Dropdown.Item  id="Nav_option_sn" eventKey={item.event_key} to={item.link} onClick={()=>{}} key={index_sub2}>{item.sub2}</Dropdown.Item>
                                    ))
                                }
                            </DropdownButton>
                    ))
                   }
                    <div className="section3">
                        <input className="form-control" type="text" placeholder="Search.." aria-label="Search"></input>
                    </div>
                    <div className="section4">
                        <div className="notification_option_sn">
                            Notification
                            <Badge anchorOrigin={{ horizontal:'right', vertical:'top' }} color="error" badgeContent={5} max={9}>
                                <NotificationsActiveIcon id="notification_sn" />
                            </Badge>
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