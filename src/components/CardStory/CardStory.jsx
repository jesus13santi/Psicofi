import React from "react";
import styles from "./CardStory.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function CardStory({name, date, chatId, photo}) {
  const {user, setUser}= useContext(UserContext);
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
        <>
        <div className={styles.buttons}>
        <Link to ={`/history`}>
        <button type="button" className={styles.button}>Historia</button>
        </Link>
        <Link to ={`/chat/${chatId}`}>
        <button type="button" className={styles.button}>Chat</button>
        </Link>
        </div>
        </>
      )}

    </div>
  );
};

export default CardStory;