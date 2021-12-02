import React from "react";
import styles from "./CardPsico.module.css";
import { Link, useHistory } from "react-router-dom";
import start from "../../img/start.png"


const CardPsico = ({ id, name, pais, photo, description, problemas, rating }) => {
  const history = useHistory();
  let total = rating.reduce((a, b) => a + b, 0);
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
              <p className = {styles.ptitle}>País:</p>
              <p>{pais}</p>
            </div>
            <div className={styles.ratingData}>
            <div className ={styles.ratingData}>
              <p className = {styles.ptitle}>Valoración:</p>
              <p>{(total / rating.length).toFixed(1)}</p>
              <p>★</p>
            </div>
            </div>
            {problemas.length>0 && (
              <>
              <p className = {styles.ptitle}>Especialidades:</p>
              <p > {problemas.toString().replace(/,/g, ", ")}</p>
              </>
            )}

            {/* <p className={styles.description}>{description}</p> */}
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
