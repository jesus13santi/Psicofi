import React from 'react'
import SentMessage from '../SentMessage/SentMessage'
import RecievedMessage from '../RecievedMessage/RecievedMessage'
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";


function Message({name, time, photo, msj}){
    const {user, setUser}= useContext(UserContext);
    return (
        <div>
          {name == user.name ?(
              <SentMessage 
                name={name}
                time={time}
                photo={photo}
                msj={msj}
              />
          ):(
            <RecievedMessage 
                name={name}
                time={time}
                photo={photo}
                msj={msj}
            />
          )

          }  
        </div>
    )
}

export default Message
