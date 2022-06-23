import React,{useState,useEffect} from "react";
import AuthService from '../../service/authentication/AuthService';
import DocumentService from '../../service/document/DocumentService';
import "../../Style/Documents.css";
import { ToastContainer, toast } from 'react-toastify';
import $ from 'jquery';

function CreateDocument() {
    const first_name=AuthService.getCurrentUser().firstName.slice(0,10)
    const last_name=AuthService.getCurrentUser().lastName.slice(0,10)
    const currentProject = 'Project One';
    const[selectedFile,setSelectedFile] = useState(undefined)
    const[title, setTitle] = useState('');
    const[project_name, setproject_name] = useState(currentProject);
    const[author, setautor] = useState(first_name+" "+last_name);
    const[created_date, setcreated_date] = useState(new Date());
    const[description, setDescription] = useState('');


    const addDocumentItem = async(e) => {
        e.preventDefault();
        let data = new FormData()
        data.append('file',selectedFile[0])
        data.append('title',title)
        data.append('project_name',project_name)
        data.append('author',author)
        data.append('created_date',created_date)
        data.append('description',description)
        console.log(data)
        await DocumentService.addDocumentItem(data)
        .then(response => {
          toast.success('Document Uploaded Successfully', {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
          setTimeout(() => { window.location.replace('/Document')  }, 1500);
          setTitle('')
          setSelectedFile('')
          setproject_name('')
          setautor('')
          setcreated_date('')
          setDescription('')
        })
        .catch(err => {
          console.log(err)
          toast.error('Unable to proceed your request', {
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
    
    return (
        <div className="document-form" id="modal1">
                <div className="modal-dialog modal-lg modal-dialog-centered" id="modal">
                    <form onSubmit={addDocumentItem}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title fw-bolder" id="staticdocdropLabel">Add New Document</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-7">
                                        <label for="title" className="form-label">Title of the Document *</label>
                                        <input type="text" className="form-control" id="title" placeholder="Enter your team name" onChange={(e) => setTitle(e.target.value)} value={title} required/>
                                    </div>
                                    <div className="col-md-5">
                                        <label for="projectName" className="form-label">Project Name</label>
                                        <input type="text" className="form-control" id="projectName" onChange={(e) => setproject_name(e.target.value)} value={project_name} readOnly/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label for="description" className="form-label">Description *</label>
                                        <textarea className="form-control border-secondary" id="description" placeholder="Enter the Description" onChange={(e) => setDescription(e.target.value)} value={description} required></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label for="file" className="form-label">Upload your File *</label>
                                        <input type="file" className="form-control" id="file" onChange={(e) => setSelectedFile(e.target.files)} required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="author" className="form-label">Author</label>
                                        <input type="text" className="form-control" id="author" onChange={(e) => setautor(e.target.files)} value={author} readOnly/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary fw-bolder" id="btn-document-close" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary fw-bolder" id="btn-document-create">Create</button>
                            </div>
                        </div>
                    </form>
                </div>
        </div>
    );
}

export default CreateDocument;