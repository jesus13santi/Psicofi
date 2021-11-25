import React from "react";
import styles from "./ReservarCita.module.css";
import Footer from "../Footer/Footer";
import { useState, useContext } from "react";
import { db } from "../../utils/firebaseConfig";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import UltimoPaso from "../UltimoPaso/UltimoPaso"
import Loading from "../Loading/Loading";

const ReservarCita = ({ psicologo }) => {
  const params = useParams()
  const { user, setUser, getUserByEmail } = useContext(UserContext);
  const [cita, setCita] = useState();
  const handdleOnChange = () => {};
  const [ultimoPaso, setUltimoPaso]= useState(false)
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
  
  const handdleSelect = (e) => {
    setCita(e.target.value);
  };
  const ordenarHour=(lista)=>{
    const listaOrdenada = lista.slice().sort((a, b) => {
      const hourA = a.hour;
      const hourB = b.hour;
      if (hourA < hourB) {
        return -1;
      }
      if (hourA > hourB) {
        return 1;
      }
      return 0;
    });
    return listaOrdenada;
  }
  const ordenar = (lista) => {
    const listaOrdenada = ordenarHour(lista).slice().sort((a, b) => {
      const fechaA = a.date;
      const fehchaB = b.date;
      
      if (fechaA < fehchaB) {
        return -1;
      }
      if (fechaA > fehchaB) {
        return 1;
      }
      return 0;
    });
    return listaOrdenada;
  };

  const handdleAppointment = async () => {
    if (cita !== ""){
      const cita1 = psicologo.appointments.find(
        (element) => element.id === cita
      );
      
      
      createChat(
        {
          active: "no",
          msjs: [],
          status: 1,
          users: [
            { img: user.photo, name: user.name, id:user.id },
            { img: psicologo.photo, name: psicologo.name, id:params.uid },
          ],
        },
        cita
      );
      const newArray = psicologo.appointments.filter((item) => item.id !== cita);

      // Update cita del psicologo
      await db
        .collection("users")
        .doc(params.uid)
        .update({
          appointments: [
            ...newArray,
            {
              date: cita1.date,
              hour: cita1.hour,
              id: cita1.id,
              status: 1,
              name: user.name,
              incidencias: [],
            },
          ],
        });
        
      // Update Usuario logueado
      await db
        .collection("users")
        .doc(user.id)
        .update({
          appointments: [
            ...user.appointments,
            {
              date: cita1.date,
              hour: cita1.hour,
              id: cita1.id,
              status: 1,
              name: psicologo.name,
              incidencias: [],
            },
          ],
        });

      console.log("cita Creada");

    }else{
      console.log("No se selecciono ninguna cita")
    }
    
  };
  return (
    <div className={styles.container}>
      {!!psicologo ? (
        <>
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
                  {psicologo.appointments.length > 0 &&
                    ordenar(psicologo.appointments).map((cita) => (
                      <>
                        {cita.status === 2 && (
                          <option value={cita.id} key={cita.id}>
                            {diaSemana(cita.date)} - Hora: {cita.hour}{" "}
                          </option>
                        )}
                      </>
                    ))}
                </select>
              </div>
              {/* <div className={styles.inputAndTitle}>
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
              </div> */}
            </div>
            <button className={styles.button} onClick={handdleAppointment}>
              Continuar al Pago
            </button>
            {ultimoPaso === true && <UltimoPaso />}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ReservarCita;
