import React from "react";
import styles from "./UTabCard.module.css";
import img from "../../img/photo.png";


function UTabCard({appName, hour, date}) {
  return (
    <div className={styles.container}>

    <div className={styles.profile}>

      <img src={img} alt="" />
      <div className={styles.profileText}>
        <p>{appName}</p>
        <div className={styles.appointmentInfo}>
        <p>{date}</p> 
        <p>{hour}</p> 
      </div>
      </div> 
      
    </div>
    
      

  </div>

  );
};
export default UTabCard;