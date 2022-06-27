import React,{useState,useEffect} from "react";
import AuthService from '../../service/authentication/AuthService';
import DocumentService from '../../service/document/DocumentService';
import "../../Style/Documents.css";
import { ToastContainer, toast } from 'react-toastify';

function UpdateDocument(props) {
    const[selectedFile,setSelectedFile] = useState(undefined)
    const project_name = props.document.projectName;
    const author= props.document.author;
    const[newTitle, setNewTitle] = useState('');
    const title = props.document.title;
    const[newDescription, setNewDescription] = useState('');
    const description =props.document.description;
    const docId = props.document.documentId;

    const UpdateDocumentItem = async(e) => {
        e.preventDefault();
        let data = new FormData()
        data.append('file',selectedFile[0])
        data.append('title',newTitle)
        data.append('project_name',project_name)
        data.append('author',author)
        data.append('description',newDescription)
        await DocumentService.updateDocumentItem(data,docId)
        .then(response => {
          toast.success('Document Updated Successfully', {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
          });
          setTimeout(() => { window.location.replace('/Document')  }, 1500);
          setNewTitle('')
          setSelectedFile('')
          setNewDescription('')
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
                    <form onSubmit={UpdateDocumentItem}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title fw-bolder" id="staticdocdropLabel">Update the Document</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-7">
                                        <label for="title" className="form-label">Title of the Document *</label>
                                        <input type="text" className="form-control" id="title" placeholder={title} onChange={(e) => setNewTitle(e.target.value)}  required/>
                                    </div>
                                    <div className="col-md-5">
                                        <label for="projectName" className="form-label">Project Name</label>
                                        <input type="text" className="form-control" id="projectName" value={project_name} readOnly/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label for="description" className="form-label">Description *</label>
                                        <textarea className="form-control border-secondary" id="description" placeholder={description} onChange={(e) => setNewDescription(e.target.value)}  required></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label for="file" className="form-label">Upload your File *</label>
                                        <input type="file" className="form-control" id="file" onChange={(e) => setSelectedFile(e.target.files)} required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label for="author" className="form-label">Author</label>
                                        <input type="text" className="form-control" id="author" value={author} readOnly/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary fw-bolder" id="btn-document-close" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary fw-bolder" id="btn-document-create">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
        </div>
    );
}

export default UpdateDocument;