import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./PerfilVistaPaciente.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Footer from "../Footer/Footer"
const PerfilVistaPaciente = ({id,name,birthday,pais,description,photo,problemas}) => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const handdleAppointment = () => {
    !!user ? history.push(`/reservarCita/${id}`): history.push("/register") ;
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.firstBox}>
            <div className={styles.boxAtribute}>
              <h1 className={styles.name}>{name}</h1>
              <div className={styles.atribute}>
                <h3 className={styles.title}>Fecha de nacimiento: </h3>
                <p className={styles.text}>{birthday}</p>

                <h3 className={styles.title}>Valoracion: </h3>
                <p className={styles.text}>5</p>

                <h3 className={styles.title}>Lugar de residencia: </h3>
                <p className={styles.text}>{pais}</p>

                <h3 className={styles.title}>Biografia: </h3>
                <p className={`${styles.text} ${styles.description}`}>
                  ¿Qué significa el texto Lorem Ipsum? Si eres diseñador o has
                  trasteado con programas de diseño, probablemente te hayas
                  encontrado con un texto conocido como Lorem Ipsum. ... Su
                  título deriva del latín dolorem ipsum, que significa «el dolor
                  en sí».
                </p>
              </div>
            </div>

            <picture className={styles.boxImg}>
              <img src={photo} alt="" />
            </picture>
          </div>

          <div className={styles.boxEspecialidades}>
            <h3>Especialidades:</h3>
            <div className={styles.especialidades}>
              {!!problemas &&
                problemas.map((pro) => (
                  <div className={styles.especialidad}>
                    <p>{pro.toUpperCase()}</p>
                  </div>
                ))}

              {/* <div className={styles.especialidad}>
              <p>Ansiedad</p>
            </div>
            <div className={styles.especialidad}>
              <p>Estrés</p>
            </div>
            <div className={styles.especialidad}>
              <p>Autoestima</p>
            </div> */}
            </div>
          </div>
          <button
            className={styles.button}
            onClick={handdleAppointment}
            type="button"
          >
            Solicitar consulta
          </button>
          <p className={styles.textAdvert}>
            Cada cita posee una duración de una (1) hora, y tiene un valor de
            $29.99 USD. Debe agendar su cita con al menos 24 horas de
            antelación, en un bloque de horario que el psicólogo tenga a
            disposición.
          </p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default PerfilVistaPaciente;
