import React from "react";
import styles from "./CardAdmin.module.css";
import img from "../../img/photo.png";
import { db } from "../../utils/firebaseConfig"

const CardAdmin = ({ id, name, pais, photo, pdf }) => {
 
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

  const openPDF = () =>{
    window.open(pdf)
  }

  return (
    <div className={styles.container}>
      <div className={styles.pend}>
        <picture className={styles.boxImg}>
          <img src={photo} alt="" />
        </picture>
        <div className={styles.boxInfo}>
            <h2 className={styles.title}>{name}</h2>
          <p>{pais}</p>
        </div>
      </div>
      <div className={styles.buttonBox}>

          <button type="button" className={styles.img1} onClick={handdleAceptar}>
          </button>

          <button type="button" id={styles.img2R} className={styles.img2} onClick={handdleRechazar}>
          </button>

          <button type="button" className={styles.img3} onClick={openPDF}>
          </button>
          
        </div>
    </div>
  );
};

export default CardAdmin;