import React from "react";
import styles from "./CardPsico.module.css";
import img from "../../img/photo.png";
import { Link } from "react-router-dom";
const CardPsico = () => {
  return (
    <div className={styles.container}>
      <div className={styles.psico}>
        <picture className={styles.boxImg}>
          <img src={img} alt="" />
        </picture>
        <div className={styles.boxInfo}>
          <Link className={styles.link}>
            <h2 className={styles.title}> Gregorio Spamtam</h2>
          </Link>
          <p>Caracas, Venezuela</p>
        </div>
      </div>

      <button type="button" className={styles.button}>
        Mas info.
      </button>
    </div>
  );
};

export default CardPsico;
