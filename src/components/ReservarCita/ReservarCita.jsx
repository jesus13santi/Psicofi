import React from "react";
import styles from "./ReservarCita.module.css";
import Footer from "../Footer/Footer";
import { useState, useContext } from "react";
import { db } from "../../utils/firebaseConfig";
import { UserContext } from "../../context/UserContext";

const ReservarCita = ({ psicologo }) => {
  const { user, setUser } = useContext(UserContext);
  const [cita, setCita] = useState();
  const handdleOnChange = () => {};
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
  const createChat = async (user, uid) => {
    try {
      await db.collection("chats").doc(uid).set(user);
    } catch (e) {
      console.log(e);
    }
  };
  const AddData = async (appointment, uid) => {
    try {
      console.log(appointment);
    } catch (e) {
      console.log(e);
    }
  };
  const handdleSelect = (e) => {
    setCita(e.target.value);
  };
  

  const handdleAppointment = async () => {
    createChat(
      {
        active: "no",
        msjs: [],
        status: 1,
        users: [
          { img: user.photo, name: user.name },
          { img: psicologo.photo, name: psicologo.name },
        ],
      },
      cita
    );
    // await db
    //   .collection("users")
    //   .doc(user.id)
    //   .update({
    //     appointment: [
    //       ...user.appointment,
    //       {
    //         date: "Hola",
    //         hour: "Hola",
    //         id: "sfsadsadas",
    //         status: 1,
    //         name: "",
    //         incidencias: [],
    //       },
    //     ],
    //   });
    alert("usuario Creado");
  };
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
              <select
                name=""
                id=""
                className={styles.select}
                onChange={handdleSelect}
              >
                <option value="">Seleccione una cita</option>
                {psicologo.appointment.length > 0 &&
                  psicologo.appointment.map((cita) => (
                    <>
                      {cita.status === 2 && (
                        <option value={cita.id}>
                          {diaSemana(cita.date)} - Hora: {cita.hour}{" "}
                        </option>
                      )}
                    </>
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
          <button className={styles.button} onClick={handdleAppointment}>
            Continuar al Pago
          </button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default ReservarCita;
