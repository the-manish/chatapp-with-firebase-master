import React from 'react'
import Message from './Message'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { db } from '../firebase'
import { onSnapshot, doc } from 'firebase/firestore'

function Messages() {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        })
        return () => {
            unSub();
        }
    }, [data.chatId]);

    return (
        <div className='messages'>
            {messages.map((message, index) => (
                <Message key={index} message={message} />
            ))}
        </div>
    )
}

export default Messages
