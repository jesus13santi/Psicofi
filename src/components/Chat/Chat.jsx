import styles from './Chat.module.css'
import firebase from 'firebase'
import React, {useState, useEffect, useRef} from 'react'
import { db } from '../../utils/firebaseConfig'
import { doc, onSnapshot } from "firebase/firestore";
import Loading from '../Loading/Loading';
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Message from '../Message/Message';
import sendIcon from "../../img/sendIcon.svg";
import dayjs, { Dayjs } from 'dayjs'
import { useParams } from 'react-router-dom';


function Chat() {

    var now = dayjs()
    var time = now.format('DD/MM hh:mma')

    const scroll = useRef()

    const [status, setStatus]=useState(0)
    const params = useParams();
    const id = params.chatId
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [active, setActive]= useState("no")
    const {user, setUser}= useContext(UserContext);
    const [users, setUsers] = useState([])
    const [newArray, setNewArray]= useState([])




    useEffect(()=> {
        if (db){
            console.log('docs')
            db.collection("chats").doc(id).onSnapshot((doc)=> {
                    const data = doc.data()
                    setMessages(data.msjs)
                    setActive(data.active)
                    setUsers(data.users)
                    setStatus(data.status)
                })
        } 
    },[db]
    )

    function scrollDown(){
        if (scroll.current){
            scroll.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start"
              })
        }
    }
    
    const handdleOnChange = e => {
        setNewMessage(e.target.value);
    };

    async function  sendMessage() {
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
            scrollDown()
            
        }
    }

    function handleClick(e) {
        e.preventDefault();
        db.collection("chats").doc(id).update({
            active: 'no',
            status: 0
        })
        endAppointment(users)
      }

      function activateChat(e) {
        e.preventDefault();
        db.collection("chats").doc(id).update({
            active: 'yes'
        })
      }

    const handleOnSubmit =  e =>{

        e.preventDefault();
        sendMessage()
    }

    async function endAppointment(users){
        const cita = user.appointments.find(
            (element) => element.id == id
          );
        const aux = (user.appointments.filter((item) => item.id !== id))
        console.log('cita',cita)
        console.log('aux',aux)
        console.log('USERS', users)

        const firstUid = users[0].id
        console.log(firstUid)
        const firstName = users[1].name
        
        const secondUid = users[1].id
        const secondName = users[0].name
        console.log(secondUid)

        // usuario
        await db
            .collection("users")
            .doc(firstUid)
            .update({
          appointments: [
            ...aux,
            {
              date: cita.date,
              hour: cita.hour,
              id: cita.id,
              status: 0,
              name: firstName,
              incidencias: [],
              uid: secondUid
            },
          ],
        })
        //especialista
        await db
            .collection("users")
            .doc(secondUid)
            .update({
          appointments: [
            ...aux,
            {
              date: cita.date,
              hour: cita.hour,
              id: cita.id,
              name: secondName,
              incidencias: [],
              status: 0,
              uid: firstUid
              
            },
          ],
        })

        
    }
    
    return (
    <>
        {!!user ?(
        <div className={styles.bigBox}>
        <div className={styles.chatHeader}>

            
            {users.length >0 &&(
                users.map((u)=>(
                    <>
                    {u.name != user.name &&(
                    <div className={styles.heatherData}>
                    <picture >
                        <img src={u.img} alt="" className={styles.heatherPic}></img>
                    </picture>
            
                    <div className={styles.heatherName}>{u.name}</div>
                    </div>
                    )}
                    </>
                ))
            )}
            <>
            {user.role=="Psicologo" && active=='yes' &&(
            <button className={styles.endButton} onClick={handleClick} >Terminar Cita</button>
             )}
             {user.role == 'Psicologo' && active =='no' && status ==1 &&(
                <button className={styles.endButton} onClick={activateChat} >Iniciar Chat</button>
                
            )}
            </>
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
                <>
            
            {user.role =='Paciente' && active =='no' &&(
                
                <p className = {styles.emptyText}>Debes esperar a que el especialista inice el chat</p>
            )
            }
            
            </>
            )}
            

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

            <div ref={scroll} className={styles.scrollDiv}></div>
        </div>       
): (
      
    <Loading />
  )}
  </>
);
};
export default Chat
