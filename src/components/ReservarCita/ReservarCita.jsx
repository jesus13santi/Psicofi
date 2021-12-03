import styles from "./ReservarCita.module.css";
import Footer from "../Footer/Footer";
import { useState, useContext } from "react";
import { db } from "../../utils/firebaseConfig";
import { UserContext } from "../../context/UserContext";
import { useParams, useHistory } from "react-router-dom";
import swal from "sweetalert";
import Loading from "../Loading/Loading";
import Checkout from "../Checkout/Checkout";


const ReservarCita = ({ psicologo }) => {
  const params = useParams()
  const history = useHistory()
  const { user, setUser, getUserByEmail } = useContext(UserContext);
  const [cita, setCita] = useState("");
  const [today,setToday]=useState(new Date())
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
    // //console.log(date1.toLocaleDateString("es-MX", options));
    return result;
  }
  const createChat = async (user, uid) => {
    try {
      await db.collection("chats").doc(uid).set(user);
    } catch (e) {
      //console.log(e);
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
    if(!cita){
      swal(
        "No se selecciono ninguna cita",
        "",
        "warning"
      );
    }else{
      setUltimoPaso(true);
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
                        {cita.status === 2 && today< new Date(cita.date) && (
                          <option value={cita.id} key={cita.id}>
                            {diaSemana(cita.date)} - Hora: {cita.hour}{" "}
                          </option>
                        )}
                      </>
                    ))}
                </select>
              </div>
             
            </div>
            <button className={styles.button} onClick={handdleAppointment}>
              Continuar al Pago
            </button>
            {ultimoPaso === true && cita && <Checkout psicologo={psicologo} cita={cita} />}
          </div>
          <Footer/>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ReservarCita;
