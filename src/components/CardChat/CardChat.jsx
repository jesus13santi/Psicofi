import React from "react";
import styles from "./CardChat.module.css";
import img from "../../img/photo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";


function CardChat({name, date, chatId, photo}) {
  const {user, setUser}= useContext(UserContext);
  console.log(chatId)
  return (
    <div className={styles.container}>
      <div className={styles.psico}>
        <picture className={styles.boxImg}>
          <img src={photo} alt="" />
        </picture>
        <div className={styles.boxInfo}>
            <h2 className={styles.title}>{name}</h2>
          <p>{date}</p>
        </div>
      </div>
      {user.role =="Paciente" ?(

      <Link to ={`/chat/${chatId}`}>
      <button type="button" className={styles.button}>Ver Chat</button>
      </Link>


      ):(
        <Link to ={`/chat/${chatId}`}>
        <button type="button" className={styles.button}>Ver Chat</button>
        </Link>
      )}

    </div>
  );
};

export default CardChat;