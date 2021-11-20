import React from "react";
import styles from "./CardStory.module.css";
import img from "../../img/photo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function CardStory({name, date}) {
  const {user, setUser}= useContext(UserContext);
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
      <Link to ='/'>
      <button type="button" className={styles.button}>Ver Chat</button>
      </Link>
      ):(
        <Link to ='/'>
        <button type="button" className={styles.button}>Ver Historia</button>
        </Link>
      )}

    </div>
  );
};

export default CardStory;