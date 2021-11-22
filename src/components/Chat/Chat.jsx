import styles from './Chat.module.css'
import firebase from 'firebase'
import React, {useState, useEffect} from 'react'
import { db } from '../../utils/firebaseConfig'
import { getArrayCollection, getFirstElementArrayCollection } from '../../utils/parser'


const Chat = () => {

    const [messages, setMessages] = useState([])


    console.log("DATABASE",db)
    useEffect(()=> {
        if (db){
            console.log("Llega")
            const unsubscribe = db.collection("chats").doc("ljoTUjxwvKhVGeYjxVbD").get().then((snapshot)=> {
                console.log("DOCs",snapshot.getFirstElementArrayCollection)
                /*
                snapshot.forEach((doc)=>{

                    setMessages(doc.data)

                })*/
                
            })
            return unsubscribe
        }
    },[db]
    )
    console.log(messages)

    return (
        <div>
            <ul>
                {messages.map(message =>{
                    <li>{message.msj}</li>
                })

                }
            </ul>
        </div>
    )
}
export default Chat
