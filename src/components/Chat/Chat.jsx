import styles from './Chat.module.css'
import firebase from 'firebase'
import React, {useState, useEffect, useRef} from 'react'
import { db } from '../../utils/firebaseConfig'
import { doc, onSnapshot } from "firebase/firestore";
import Loading from '../Loading/Loading';
import CardChat from '../CardChat/CardChat';
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Message from '../Message/Message';
import ScrollableFeed from 'react-scrollable-feed'
import sendIcon from "../../img/sendIcon.svg";
import dayjs, { Dayjs } from 'dayjs'
import { useParams } from 'react-router-dom';


function Chat({name= "Nombre Apellido",img="https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6"}) {

    var now = dayjs()
    var time = now.format('DD/MM hh:mma')


    const scroll = useRef()

    //const params = useParams();
    const id = 'ljoTUjxwvKhVGeYjxVbD'
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [active, setActive]= useState("no")
    const {user, setUser}= useContext(UserContext);


    useEffect(()=> {
        if (db){
            
            db.collection("chats").doc(id).onSnapshot((doc)=> {
                    const data = doc.data()
                    setMessages(data.msjs)
                    setActive(data.active)
                })     
        }
        if (scroll.current){
            scroll.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start"
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
            const mensaje = {
                name: user.name,
                msj: newMessage,
                photo: user.photo,
                time: time
            }

            aux.push(mensaje)
             await db.collection("chats").doc(id).update({
                msjs: aux
            })
            setNewMessage("")
            
        }
    }

    function handleClick(e) {
        e.preventDefault();
        db.collection("chats").doc(id).update({
            active: 'no'
        })
      }

    const handleOnSubmit =  e =>{

        e.preventDefault();
        sendMessage(scroll)
    }

    
    return (
    <>
        {!!user ?(
        <div className={styles.bigBox}>
        <div className={styles.chatHeader}>
            <div className={styles.heatherData}>
            <picture >
                <img src={img} alt="" className={styles.heatherPic}></img>
            </picture>
            <div className={styles.heatherName}>{name}</div>
            </div>
            {user.role=="Psicologo" && active=='yes' &&(
            <button className={styles.endButton} onClick={handleClick} >Terminar Cita</button>
             )}
        </div>

            {messages.length > 0 ?(
             messages.map((m) => (
                <Message 
                name={m.name}
                time= {m.time}
                photo={m.photo}
                msj={m.msj}
                />

            ))):(
            <p className = {styles.emptyText}>Para activar el chat debes enviar el primer mensaje</p>
            )}
            <div ref={scroll}></div>

            {active=="yes" &&(
                <form onSubmit={handleOnSubmit} className={styles.inputForm}>
                    <input  className={styles.messageInput} 
                            type='text'
                            value={newMessage}
                            onChange={handdleOnChange}
                            placeholder="Escribe un mensaje aquí..."
                    />
                <button type= 'submit' disabled={!newMessage} className={styles.inputButton}>
                    <img className={styles.inputButtonImg} src={sendIcon} alt=""/>
                    
                </button>
                </form>
            )}


        </div>       
): (
      
    <Loading />
  )}
  </>
);
};
export default Chat
