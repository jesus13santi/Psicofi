import React from 'react'
import { useHistory, useParams } from 'react-router-dom';
import styles from "./PerfilVistaPaciente.module.css"
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
const PerfilVistaPaciente = ({id,name,birthday,pais,description,photo}) => {
    const history= useHistory()
    const {user}= useContext(UserContext)
    const handdleAppointment= ()=>{
        !!user?(history.push("/")):(history.push("/register"))
    }
    return (
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.firstBox}>
            <div className={styles.boxAtribute}>
              <h1 className={styles.name}>{name}</h1>
              <div className={styles.atribute}>
                <h3 className={styles.title}>Fecha de nacimiento: </h3>
                <p className={styles.text}>{birthday}</p>

                <h3 className={styles.title}>Valoracion: </h3>
                <p className={styles.text}></p>

                <h3 className={styles.title}>Lugar de residencia: </h3>
                <p className={styles.text}>{pais}</p>

                <h3 className={styles.title}>Biografia: </h3>
                <p className={styles.text}>{description}</p>
              </div>
            </div>

            <picture className={styles.boxImg}>
              <img src={photo} alt="" />
            </picture>
          </div>
          <div className={styles.especialidades}>
            <div className={styles.especialidad}>
              <p>Sexualidad</p>
            </div>
            <div className={styles.especialidad}>
              <p>Ansiedad</p>
            </div>
            <div className={styles.especialidad}>
              <p>Estrés</p>
            </div>
            <div className={styles.especialidad}>
              <p>Autoestima</p>
            </div>
          </div>
          <button className={styles.button} onClick={handdleAppointment}
          type="button">
            Solicitar consulta
          </button>
        </div>
      </div>
    );
}

export default PerfilVistaPaciente
