import React from "react";
import styles from "./CardPatient.module.css";
import { Link, useHistory } from "react-router-dom";

const CardPatient = ({ id, name, pais, photo }) => {
  const history = useHistory();
  const handlePatientHistory = () => {
    history.push(`/historiaPacienteIndividual/${id}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.patientInfo}>
        <div>
          <picture className={styles.boxImg}>
            <img src={photo} alt="" />
          </picture>
        </div>
        <div className={styles.boxInfo}>
          <Link to={'/historiaPacienteIndividual'} className={styles.link}>
            <h2 className={styles.title}>{name}</h2>
          </Link>
          <p className={styles.p}>{pais}</p>
        </div>
        <button type="button" className={styles.button} onClick={handlePatientHistory}>
          Ver historia
        </button>
      </div>
    </div>
  );
};

export default CardPatient;
