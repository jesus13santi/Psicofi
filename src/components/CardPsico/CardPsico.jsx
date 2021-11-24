import React from "react";
import styles from "./CardPsico.module.css";
import img from "../../img/photo.png";
import { Link, useHistory } from "react-router-dom";

const CardPsico = ({ id, name, pais, lastName, photo, description }) => {
  const history = useHistory();
  const handlePatientHistory = () => {
    history.push(`/profile/${id}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.psico}>
        <picture className={styles.boxImg}>
          <img src={photo} alt="" />
        </picture>
        <div className={styles.boxInfo}>
          <Link to={`/profile/${id}`} className={styles.link}>
            <h2 className={styles.title}>{name}</h2>
          </Link>
          <p>{pais}</p>
          <p className={styles.description}>{description}</p>
        </div>
        <button type="button" className={styles.button} onClick={handlePatientHistory}>
          Mas info.
        </button>
      </div>
    </div>
  );
};

export default CardPsico;
