import React from "react";
import styles from "./UTabCard.module.css";
import img from "../../img/photo.png";


function UTabCard(params) {
  return (
    <div className={styles.container}>

    <div className={styles.profile}>

      <img src={img} alt="" />
      <div className={styles.profileText}>
        <p>{params.subject}</p>
        <p>{params.appName}</p>
      </div> 
      
    </div>
    
    <div className={styles.appointmentInfo}>
      <p>{params.date}</p> 
      <p>{params.startTime} - {params.endTime}</p> 
    </div>  

  </div>

  );
};
export default UTabCard;