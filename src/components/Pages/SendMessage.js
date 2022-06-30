import React, { useState } from 'react'
import { db } from '../../Firebase'
import firebase from 'firebase'
import { Input, Button } from '@material-ui/core'
import "../../Style/Chat.css"
import AuthService from "../../service/authentication/AuthService";
import UserImageService from '../../service/userimage/UserImageService'

function SendMessage({ scroll }) {
    const currentProject = "Project One";

    const [msg, setMsg] = useState('')

    const currentUser = AuthService.getCurrentUser()

    async function sendMessage(e) {
        e.preventDefault()

        await UserImageService.getImageByEmail(currentUser.email)
        .then(response => {
            db.collection(currentProject).add({
                text: msg,
                displayName: currentUser.firstName.slice(0,10),
                email: currentUser.email,
                photoUrl:`data:image/jpeg;base64,${response.data}`,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            setMsg('')
            scroll.current.scrollIntoView({ behavior: 'smooth' })
        })
        .catch(err => {
            db.collection(currentProject).add({
                text: msg,
                displayName: currentUser.firstName.slice(0,10),
                email: currentUser.email,
                photoUrl:'',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            setMsg('')
            scroll.current.scrollIntoView({ behavior: 'smooth' })
        })

    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <div className="sendMsg">
                    <Input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} placeholder='Message...' type="text" value={msg} onChange={e => setMsg(e.target.value)} />
                    <Button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</Button>
                </div>
            </form>
        </div>
    )
}

export default SendMessage
