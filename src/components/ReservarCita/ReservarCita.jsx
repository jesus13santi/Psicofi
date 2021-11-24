import React from 'react';
import styles from "./ReservarCita.module.css";
import Footer from "../Footer/Footer";


const ReservarCita = ({psicologo}) => {
    console.log(psicologo)
    function diaSemana(x) {
      const date1 = new Date(x.replace(/-+/g, "/"));
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const result = date1.toLocaleDateString("es-Es", options);
      // console.log(date1.toLocaleDateString("es-MX", options));
      return result;
    }
    return (
      <div className={styles.container}>
        {!!psicologo ? (
          <div className={styles.boxContainer}>
            <h1 className={styles.title}>Reservar una Cita</h1>
            <div className={styles.boxInput}>
              <div className={styles.inputAndTitle}>
                <h3 className={styles.subTitle}>Psicólogo escogido: </h3>
                <p>{psicologo.name}</p>
              </div>
              <div className={styles.inputAndTitle}>
                <h3>Fechas disponibles: </h3>
                <select name="" id="" className={styles.select}>
                  <option value="">Seleccione una cita</option>
                  {psicologo.appointment.length > 0 &&
                    psicologo.appointment.map((cita) => (
                      <option value="">
                        {diaSemana(cita.date)} - Hora: {cita.hour}{" "}
                      </option>
                    ))}
                </select>
              </div>
              <div className={styles.inputAndTitle}>
                <h3>Breve descripcion:</h3>
                <div className={styles.textAreaBox}>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Razones por las cuales se necesita una consulta, e. j. problemas amorosos"
                    className={styles.textArea}
                  ></textarea>
                  <p>máx. 400 caracteres</p>
                </div>
              </div>
            </div>
            <button className={styles.button}>Continuar al Pago</button>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    );
      
}

export default ReservarCita