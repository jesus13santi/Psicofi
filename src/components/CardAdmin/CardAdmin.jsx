import React from "react";
import styles from "./CardAdmin.module.css";
import img from "../../img/photo.png";
import { db } from "../../utils/firebaseConfig"

const CardAdmin = ({ id, name, country, photo }) => {
 
  const handdleAceptar = async() => {

    const usersReference = db.collection("users");
        await usersReference.doc(id).update({
            role:("Psicologo"),
            
        });
    window.location.reload();    

  };
  
  const handdleRechazar = async() => {

    const usersReference = db.collection("users");
        await usersReference.doc(id).update({
            role:("Rechazado"),
            
        })
    window.location.reload();  
  };

  return (
    <div className={styles.container}>
      <div className={styles.pend}>
        <picture className={styles.boxImg}>
          <img src={photo} alt="" />
        </picture>
        <div className={styles.boxInfo}>
            <h2 className={styles.title}>{name}</h2>
          <p>{country}</p>
        </div>
      </div>
      <div className={styles.buttonBox}>

          <button type="button" className={styles.button} onClick={handdleAceptar}>
            Aceptar
          </button>

          <button type="button" className={styles.button} onClick={handdleRechazar}>
            Rechazar
          </button>

          <button type="button" className={styles.button} onClick={handdleRechazar}>
            Ver PDF
          </button>
          
        </div>
    </div>
  );
};

export default CardAdmin;