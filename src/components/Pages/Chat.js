import React, { useState, useEffect, useRef } from 'react'
import { db } from '../../Firebase'
import SendMessage from './SendMessage'
import "../../Style/Chat.css"
import AuthService from "../../service/authentication/AuthService";
import Unknown_image from "../../images/Unknown.png"

function Chat() {
    const currentProject = "Project One";

    const scroll = useRef()
    const [messages, setMessages] = useState([])

    const currentUsr = AuthService.getCurrentUser()
    useEffect(() => {
        db.collection(currentProject).orderBy('createdAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })
    }, [])
    return (
        <div>
            <div className="msgs">
                {messages.map(({ id, text, displayName, email, photoUrl }) => (
                    <div>
                        <div key={id} className={`msg ${email === currentUsr.email ? 'sent' : 'received'}`}>
                            <img className='chat_img' src={photoUrl === '' ? Unknown_image : photoUrl} alt='' /><br/>
                            <p className='chat'>{displayName}</p><br/><br/>
                            <p className='chat'>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
        </div>
    )
}

export default Chat
