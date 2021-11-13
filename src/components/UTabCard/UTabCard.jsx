import React from "react";
import styles from "./UTabCard.module.css";
import img from "../../img/photo.png";


const UTabCard = () => {
  return (
    <div className={styles.container}>

    <div className={styles.profile}>

      <img src={img} alt="" />
      <div className={styles.profileText}>
        <p>Asunto</p>
        <p>Nombre Apellido</p>
      </div> 
      
    </div>
    
    <div className={styles.appointmentInfo}>
      <p>DD/MM/AAAA</p> 
      <p>HH:MM - HH:MM</p> 
      <p>Sesión #N</p> 
    </div>  

  </div>

  );
};
export default UTabCard;