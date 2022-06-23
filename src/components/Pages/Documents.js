
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
import { ToastContainer, toast } from 'react-toastify';
import DocumentService from '../../service/document/DocumentService';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import AuthService from '../../service/authentication/AuthService';

const Documents= () => {
  const num_of_document = 20;
  // const doc_names = ['James', 'Paul', 'John', 'George', 'Ringo','siva','gam','gg','ff','James', 'Paul', 'John', 'George', 'Ringo','siva','gam','gg','ff','James', 'Paul', 'John', 'George', 'Ringo','siva','gam','gg','ff'];
  const[documents, setDocuments] = useState([]);
  const[DocumentError, setDocumentError] = useState('');
  const first_name=AuthService.getCurrentUser().firstName.slice(0,10)
  const last_name=AuthService.getCurrentUser().lastName.slice(0,10)
  const user = first_name+' '+last_name;


  const [item_position,set_position]=useState(0);

  const currentProject = 'Project One';
  
  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });
  
  useEffect(() => {
    DocumentService.getDocumentByProject(currentProject)
    .then(response => {
      setDocuments(response.data)
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

<div class="container" id="Alldocuments">
<div class="row" id="nextrow">
<div class="col-sm">
    <Paper
      sx={{
        p: 3,
        margin: 'auto',
        width: 250,
        height: 170,
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
      </Paper> 
    </div>

    {
      
    DocumentError.length > 0 ?
      <div id="document-error">{DocumentError}</div>
    :
    (documents).map(document => (
 
    <div class="col-sm">
    <Paper
      sx={{
        p: 3,
        margin: 'auto',
        width: 250,
        height: 170,
        flexGrow: 1,
        border: 0.1,
        borderColor: 'grey.500',
        borderRadius: 3,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <ButtonBase sx={{ width: 70, height: 100 }}>
            <Img alt="complex" src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" />
          </ButtonBase>
        </Grid>
        <Grid item xs={7}>
          <Grid item xs container direction="column" spacing={1}>
            <Grid>
              <Typography gutterBottom variant="subtitle1" component="div">
                <b>{document.title.slice(0,15)}</b>
              </Typography>
              <Typography variant="body2" gutterBottom>
                {document.description.slice(0,16)}
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
              <Typography sx={{ cursor: 'pointer',marginTop:'-16px', textAlign:'center' }} variant="body2"><button type="button" class="btn btn-link">Update</button></Typography>
              :
              " "
          }
        </Grid>
        <Grid item xs={2}>
        {
          document.author == user
          ? 
              <Typography sx={{ cursor: 'pointer',marginTop:'-20px', textAlign:'center' }} variant="body2"><IconButton aria-label="delete"><DeleteTwoToneIcon /></IconButton></Typography>
              :
              " "
          }
        </Grid>
        <Grid item xs={2}>
              <Typography sx={{ cursor: 'pointer',marginTop:'-20px', textAlign:'center' }} variant="body2"><IconButton aria-label="download"><DownloadForOfflineTwoTone /></IconButton></Typography>
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
                      Created Date : {document.createdDate}<br/>
                      Last Update : {document.updatedDate == null ? "No update" : document.updatedDate}
                    </React.Fragment>
                  }
                >
              <Typography sx={{ cursor: 'pointer',marginTop:'-20px', textAlign:'center' }} variant="body2"><IconButton aria-label="information"><InfoTwoToneIcon /></IconButton></Typography>
              </HtmlTooltip>
        </Grid>
      </Grid>
    </Paper>
    </div>
  
  ))

    }
  </div>




</div>
    

  </div>
  );
};

export default Documents;
