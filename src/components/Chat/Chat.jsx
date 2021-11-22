import styles from './Chat.module.css'
import firebase from 'firebase'
import React, {useState, useEffect, useRef} from 'react'
import { db } from '../../utils/firebaseConfig'
import { doc, onSnapshot } from "firebase/firestore";
import { getArrayCollection, getFirstElementArrayCollection } from '../../utils/parser'
import Loading from '../Loading/Loading';
import CardChat from '../CardChat/CardChat';
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import SentMessage from '../SentMessage/SentMessage';
import Message from '../Message/Message';

const Chat = () => {

    const scroll = useRef
    const id = "ljoTUjxwvKhVGeYjxVbD"
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [active, setActive]= useState("no")
    const {user, setUser}= useContext(UserContext);


    useEffect(()=> {
        if (db){
            /*
            const unsub = onSnapshot(doc(db, "chats", "ljoTUjxwvKhVGeYjxVbD"), (doc) => {
                const data = doc.data()
                setMessages(data.msjs)
                setActive(data.active)
            })
            */
            
            db.collection("chats").doc(id).onSnapshot((doc)=> {
                    const data = doc.data()
                    setMessages(data.msjs)
                    setActive(data.active)
                })
            
        }
    },[db]
    )
    
    const handdleOnChange = e => {
        setNewMessage(e.target.value);
    };

    async function  sendMessage({scroll}) {
        if(db){
            const aux = [...messages]
            console.log("LLEGA")
            const mensaje = {
                name: user.name,
                msj: newMessage,
                photo: user.photo,
                time: "time"
            }
            console.log("AUX", aux)
            console.log("Nuevo", mensaje)
            aux.push(mensaje)
             await db.collection("chats").doc(id).update({
                msjs: aux
            })
            setNewMessage("")
            
        }
    }

    const handleOnSubmit =  e =>{
        console.log("LLEGA")
        e.preventDefault();
        console.log("LLEGA")
        sendMessage(scroll)
    }

    
    return (
    <>
        {!!user ?(
        <div className={styles.bigBox}>
        <div>
            {messages.length > 0 ?(
             messages.map((m) => (
                <Message 
                name={m.name}
                time="time"
                photo={m.photo}
                msj={m.msj}
                />
            ))):(
            <p className = {styles.emptyText}>Para activar el chat debes enviar el primer mensaje</p>
            )}
        </div>

        <div>
                <form onSubmit={handleOnSubmit} className={styles.inputForm}>
                    <input  className={styles.messageInput} 
                            type='text'
                            value={newMessage}
                            onChange={handdleOnChange}
                            placeholder="Escribe un mensaje aquí..."
                    />
                <button type= 'submit' disabled={!newMessage} className={styles.inputButton}>
                    Enviar
                </button>
                </form>

        </div>


        </div>       
): (
      
    <Loading />
  )}
  </>
);
};
export default Chat
