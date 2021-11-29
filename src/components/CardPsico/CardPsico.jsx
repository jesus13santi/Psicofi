import React from "react";
import styles from "./CardPsico.module.css";
import { Link, useHistory } from "react-router-dom";

const CardPsico = ({ id, name, pais, photo, description,problemas }) => {
  const history = useHistory();
  const handlePatientHistory = () => {
    history.push(`/profile/${id}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.psico}>
        <div className={styles.aux}>
          <picture className={styles.boxImg}>
            <img src={photo} alt="" />
          </picture>
          <div className={styles.boxInfo}>
            <Link to={`/profile/${id}`} className={styles.link}>
              <h2 className={styles.title}>{name}</h2>
            </Link>
            <div className={styles.pais}>
              <p>País:</p>
              <p>{pais}</p>
            </div>
            {problemas.length>0 && (
              <p>Especialidades: {problemas.toString().replace(/,/g, ", ")}</p>
            )}

            <p className={styles.description}>{description}</p>
          </div>
        </div>
        <button
          type="button"
          className={styles.button}
          onClick={handlePatientHistory}
        >
          Mas info.
        </button>
      </div>
    </div>
  );
};

export default CardPsico;
