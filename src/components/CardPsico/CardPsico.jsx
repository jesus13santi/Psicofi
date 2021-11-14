import React from "react";
import styles from "./CardPsico.module.css";
import img from "../../img/photo.png";
import { Link } from "react-router-dom";
const CardPsico = ({ id, name, pais, lastName, photo, description }) => {
  return (
    <div className={styles.container}>
      <div className={styles.psico}>
        <picture className={styles.boxImg}>
          <img src={photo} alt="" />
        </picture>
        <div className={styles.boxInfo}>
          <Link to="" className={styles.link}>
            <h2 className={styles.title}>
              {" "}
              {name} {lastName}
            </h2>
          </Link>
          <p>{pais}</p>
          <p className={styles.description}>{description}</p>
        </div>
        <button type="button" className={styles.button}>
          Mas info.
        </button>
      </div>
    </div>
  );
};

export default CardPsico;
