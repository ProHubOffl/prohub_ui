import React,{useState,useEffect} from 'react';
import CreateDocument from "./CreateDocument";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import DownloadForOfflineTwoTone from "@mui/icons-material/DownloadForOfflineTwoTone";
import "../../Style/Documents.css"
import Add_Document from "../../images/adddoc.png"
import Doc from "../../images/Doc.jpg"
import { ToastContainer, toast } from 'react-toastify';
import DocumentService from '../../service/document/DocumentService';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import AuthService from '../../service/authentication/AuthService';
import ReactTimeAgo from 'react-time-ago';
import UpdateDocument from './UpdateDocument';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Documents= () => {
  const[documents, setDocuments] = useState([]);
  const[DocumentError, setDocumentError] = useState('');
  const[currentdocument, setcurrentDocument] = useState({});
  const first_name=AuthService.getCurrentUser().firstName.slice(0,10)
  const last_name=AuthService.getCurrentUser().lastName.slice(0,10)
  const user = first_name+' '+last_name;
  const currentProject = AuthService.getCurrentProject().projectName
  const [open, setOpen] = useState(false);

  const handleDownload = (documentId, fileName) => {
    DocumentService.downloadFile(documentId)
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    })
    .catch(err => {
      toast.error('Unable to Download the File at the Moment', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });  
    })
  }
  
  const handleClickOpen = (document) => {
      setOpen(true);
      setcurrentDocument(document)
  };
  
  const handleClose = () => {
      setOpen(false);
  };
  
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  const selectDocument= (document) =>{
    setcurrentDocument(document)
  }

  const RemoveDocument_Handler = (id) => {
    DocumentService.deleteDocumentItem(id)
    .then(response => {
      toast.success('Document is Successfully Deleted!', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });      
        setTimeout(() => { window.location.replace('/Document')  }, 2500);
    })
    .catch(err => {
      toast.error('Unable to Remove at the moment plz login again', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });  
      console.log(err)
    })
  }
  
  useEffect(() => {
    DocumentService.getDocumentByProject(currentProject)
    .then(response => {
      setDocuments(response.data)
      if(response.data.length==0){
        setDocumentError('Document List is Empty')
      }
    })
    .catch(err => {
      setDocumentError('Unable to fetch Documents list at the moment')
    })
  },[])

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 500,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid grey',
    },
  }));

  return (
  <div>
    <div className="sub_header px-4" id="doc_top">
      <h3>Documents</h3>
      <p className="fw-bold">Project / <span className="fw-bolder">{currentProject}</span></p>
    </div>

<div className="container" id="Alldocuments">
<div className="row" id="nextrow">
<div className="col-sm">
    <Paper
      sx={{
        p: 3,
        margin: 'auto',
        width: 250,
        height: 215,
        flexGrow: 1,
        border: 0.1,
        borderColor: 'grey.500',
        borderRadius: 3,
      }}
    >
      <Tooltip title="Add Document" placement="top" arrow="true">
        <Img src={Add_Document} aria-label="Add" data-bs-toggle="modal" data-bs-target="#staticdocdrop" id="Adddoc"/>
      </Tooltip>
      <div className="modal fade" id="staticdocdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticdocdropLabel" aria-hidden="true">
        <CreateDocument/>
      </div>
      </Paper> 
    </div>

    {
      
    DocumentError.length > 0 ?
      <div id="document-error">{DocumentError}</div>
    :
    ([].concat(documents).reverse()).map(document => (
 
    <div className="col-sm">
    <Paper
      sx={{
        p: 3,
        margin: 'auto',
        width: 250,
        height: 215,
        flexGrow: 1,
        border: 0.1,
        borderColor: 'grey.500',
        borderRadius: 3,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <ButtonBase sx={{ width: 70, height: 100 }}>
              <Img alt="complex" src={Doc} /> 
          </ButtonBase>
        </Grid>
        <Grid item xs={7}>
          <Grid item xs container direction="column" spacing={1}>
            <Grid>
              <Typography gutterBottom variant="subtitle1" component="div">
                <b>{document.title.slice(0,10)}{document.title.length>10 ? "..." : "" }</b>
              </Typography>
              <Typography variant="body2" gutterBottom>
                {document.description.slice(0,16)}{document.description.length>16 ? "..." : "" }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                by :<br/>
                {document.author}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          {
          document.author == user
          ? 
          <Typography sx={{ cursor: 'pointer',marginTop:'-16px'}} variant="body2"><button type="button" className="btn btn-info" id="update-btn" aria-label="Add" data-bs-toggle="modal" onClick={()=>{selectDocument(document)}} data-bs-target="#staticdocupdatedrop">Update</button></Typography>
          :
          " "
          }
        </Grid>
        <Grid item xs={2}>
        {
          document.author == user
          ? 
              <Typography sx={{ cursor: 'pointer',marginTop:'-20px', textAlign:'center' }} variant="body2"><IconButton id="del-btn" aria-label="delete" onClick={()=>handleClickOpen(document)}><DeleteTwoToneIcon /></IconButton></Typography>
              :
              " "
          }
        </Grid>
        <Grid item xs={2}>
              <Typography sx={{ cursor: 'pointer',marginTop:'-20px', textAlign:'center' }} variant="body2"><IconButton aria-label="download" onClick={() => handleDownload(document.documentId, document.name)}><DownloadForOfflineTwoTone /></IconButton></Typography>
        </Grid>
        <Grid item xs={2}>
              <HtmlTooltip
                  title={
                    
                    <React.Fragment>
                      <Typography color="inherit">Document's Title : {document.title}</Typography>
                      Description : {document.description}<br/>
                      Project Name : {document.projectName}<br/>
                      Author : {document.author}<br/>
                      File Name : {document.name}<br/>
                      File Type : {document.type}<br/>
                      Created Date : {new Date(document.createdDate).toLocaleString()}<br/>
                      Last Update : {document.updatedDate == null ? "No update" : new Date(document.updatedDate).toLocaleString()}
                    </React.Fragment>
                  }
                >
              <Typography sx={{ cursor: 'pointer',marginTop:'-20px', textAlign:'center' }} variant="body2"><IconButton id="info-btn" aria-label="information"><InfoTwoToneIcon /></IconButton></Typography>
              </HtmlTooltip>
        </Grid>
      </Grid>
      <div id="time" align="right">
        {
        document.updatedDate == null ? 
        <i><ReactTimeAgo date={document.createdDate} locale="en-US"/></i>
        :
        <i><ReactTimeAgo date={document.updatedDate} locale="en-US"/> (Edited)</i>
         }
        
      </div>
    </Paper>
    </div>
  
  ))

    }
  </div>
</div>
<div className="modal fade" id="staticdocupdatedrop" data-bs-docdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticdocupdatedropLabel" aria-hidden="true">
    <UpdateDocument document={currentdocument}/>
</div>
<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use ProHub's service"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this <i>{currentdocument.name}</i> file ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={()=>RemoveDocument_Handler(currentdocument.documentId)} autoFocus>
            Yes
          </Button>
        </DialogActions>
</Dialog>
  <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
  </div>
  );
};

export default Documents;
