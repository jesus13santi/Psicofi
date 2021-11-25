import React from "react";
import styles from "./CardStory.module.css";
import img from "../../img/photo.png";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function CardStory({id, name, date, chatId}) {
  const {user, setUser}= useContext(UserContext);
  const history = useHistory();
  const handlePatientHistory = () => {
    history.push(`/historiaPacienteIndividual/${chatId}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.psico}>
        <picture className={styles.boxImg}>
          <img src={img} alt="" />
        </picture>
        <div className={styles.boxInfo}>
          <Link className={styles.link}>
            <h2 className={styles.title}>Nombre Apellido</h2>
          </Link>
          <p>DD/HH/AAAA</p>
        </div>
      </div>
      {user.role =="Paciente" ?(
      <Link to ={`/chat/${chatId}`}>
      <button type="button" className={styles.button}>Ver Chat</button>
      </Link>
      ):(
        <>
        <div>
        <button type="button" className={styles.button} onClick={handlePatientHistory}>Ver historia</button>
        <Link to ={`/chat/${chatId}`}>
        <button type="button" className={styles.button}>Ver Chat</button>
        </Link>
        </div>
        </>
      )}

    </div>
  );
};

export default CardStory;