import { useContext, component } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import React, { useState, useEffect } from "react";
import styles from "./PerfilEspecialista.module.css";
import { db } from "../../utils/firebaseConfig";
import $ from "jquery";
import firebase from "firebase";
import Footer from "../Footer/Footer";
//import es from "date-fns/locale/es";
import uniqid from "uniqid";
import Loading from "../Loading/Loading";
import swal from "sweetalert";

const PerfilEspecialista = ({areas}) => {
  const [date, setDate] = useState(new Date());
  const [birthday, setBirthday] = useState("");
  const [biography, setBiography] = useState("");
  const { user, setUser, getUserByEmail } = useContext(UserContext);
  // const [TodayCompare, setTodayCompare]=useState("")
  // const [Date1Compare, setDate1Compare]=useState("")
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    hour: "",
    date: "",
  });
  const history = useHistory();
  
  useEffect(() => {
    console.log("####################################");
    if (user.problemas != undefined) {
      console.log(user.problemas);
      $.each(user.problemas, function (index, value) {
        $("#" + value).prop("checked", true);
      });
    }
  });
  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;

    setValues({ ...values, [inputName]: value });
  };
  const OnChange = (event) => {
    setDate(event);
  };
  
  const validar_campos = () => {
    let valido = true;
    // si fecha de nacimiento no es valido
    // valido = false
    // si correo no es valido
    // valido = false
    // si telefono no es valido
    // valido = false
    // si residencia no es valido
    // valido = false
    // si condiciones es vacio
    // valido = false

    return valido;
  };
  const handleOnClick = async (event) => {
    if (validar_campos()) {
      console.log(biography);
      console.log(user.id);
      let problemas = [];
      $.each(
        [
          "ansiedad",
          "autoestima",
          "sexualidad",
          "estres",
          "amorosos",
          "desarrollo",
        ],
        function (index, value) {
          if ($("#" + value).prop("checked")) {
            problemas.push(value);
          }
        }
      );
      console.log(problemas);
      user.problemas = problemas;
      await db.collection("users").doc(user.id).update({
        number: user.number,
        pais: user.pais,
        description: user.description,
        problemas: problemas,
      });
      const updateUser = await getUserByEmail(user.email);
      setUser(updateUser);
      history.push("/deck");
    }
  };

  const actualizarUsuario = async () => {
    console.log(user);
    await db.collection("users").doc(user.id).update({
      number: user.number,
      pais: user.pais,
    });
    setUser(user);
    console.log("************************************");
    console.log(user);
    return true;
  };

  const handdleDay = (e) => {
    const option = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    // console.log(values.date.toLocaleDateString('es-Es',option))
  };
  const ordenarHour = (lista) => {
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
  };
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

  const handleDeletePhoto= async()=>{
    await db.collection("users").doc(user.id).update({
      photo:
        "https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6",
    });
    const updateUser = await getUserByEmail(user.email);
    setUser(updateUser);
    
    
}

  const agregarCita = async () => {
    
    const citaRepetida = user.appointments.find((element) => element.date === values.date && element.hour === values.hour);
    const Today = new Date().setHours(0,0,0,0);
    
    
    const Date1 = new Date(values.date).setHours(0,0,0,0);
    
  
    
    
      
      if (!citaRepetida) {
        if (values.date !== "" && values.hour !== "") {
          if (Today <= Date1) {
            await db
              .collection("users")
              .doc(user.id)
              .update({
                appointments: [
                  ...user.appointments,
                  {
                    date: values.date,
                    hour: values.hour,
                    id: uniqid(),
                    status: 2,
                    name: "",
                    incidencias: [],
                  },
                ],
              });
            const updateUser = await getUserByEmail(user.email);
            setUser(updateUser);
            swal("Horario Agregado", "Su horario disponible para una cita ha sido guardado exitosamente.", "success");
            setError("");
          } else {
            setError("La fecha seleccionada ya paso, por favor verifique he intente de nuevo")
          }
        } else {
          setError("Debe completar todos los campos");
        }
      } else {
        setError("Ya ingreso una cita con esa fecha y hora");
      }
    
  };
  const deleteAppointment = async (id) => {
    const newArray = user.appointments.filter((item) => item.id !== id);
    
    await db.collection("users").doc(user.id).update({
       appointments: newArray
     })
    const updateUser = await getUserByEmail(user.email);
    setUser(updateUser);
    swal("Horario Eliminado", "Su horario disponible para una cita ha sido eliminado exitosamente.", "success");
  };
// Funcion para mostrar la fecha de la cita
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
  // Funcion para mostrar la fecha de su cumpleaños
  function diaBirthday(x) {
    const date1 = new Date(x.replace(/-+/g, "/"));
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const result = date1.toLocaleDateString("es-Es", options);
    // console.log(date1.toLocaleDateString("es-MX", options));
    return result;
  }

  const upload = async(img)=>{

    if(img == null)
        return;


    const storage = firebase.storage();    
    const snapshot = await storage.ref(`/pfp/${img.name}`).put(img)
    const url = await snapshot.ref.getDownloadURL() 

    const u = await getUserByEmail(user.email)
    const usersReference = db.collection("users");
    await usersReference.doc(u.id).update({
        photo:(url)
    });
    const updateUser = await getUserByEmail(user.email);
    console.log({updateUser})
    setUser(updateUser);
  }

  return (
    <>
      <div className={`${styles.fondorosa} ${styles.bordecontenedor}`}>
        <div className={styles.titulo}>Mi perfil</div>
        <form>
          <div className={styles.boxInput}>
            <h3 for="NombreCompleto">Nombre Completo:</h3>

            <p id="NombreCompleto">{user.name}</p>

            <h3 for="FechaNacimiento">Fecha de nacimiento:</h3>

            {/* <input
                name = "FechaNacimiento"
                className={styles.entrada}
                type="date"
                id="FechaNacimiento"
                defaultValue={birthday} 
                onChange = {e => user.birthday = e.target.value}              
              ></input> */}
            <p>{diaBirthday(user.birthday)}</p>

            <h3 for="FotoPerfil">Foto de perfil:</h3>

            <div
              className={`${styles.campofoto} ${styles.campo}  ${styles.lineagruesa}`}
            >
              <picture className={styles.boxPhoto}>
                <img src={user.photo} className={styles.fotoperfil}></img>
              </picture>
              <div className={styles.boxBtn}>
                <label for={styles.upload} class={styles.boton}>
                  Cambiar
                </label>

                <input
                  id={styles.upload}
                  className={styles.boton}
                  type="file"
                  onChange={(e) => {
                    upload(e.target.files[0]);
                  }}
                />
                <button className={`${styles.boton} ${styles.eliminar}`}>
                  Eliminar
                </button>
              </div>
            </div>

            <h3 for="correo">Correo electrónico:</h3>

            <label>{user.email}</label>

            <h3 for="telefono">Teléfono:</h3>

            <input
              name="telefono"
              className={styles.entrada}
              type="text"
              id="telefono"
              defaultValue={user.number}
              onChange={(e) => (user.number = e.target.value)}
            ></input>

            <h3 for="pais">Lugar de residencia:</h3>

            <input
              type="text"
              name="pais"
              className={styles.entrada}
              id="pais"
              defaultValue={user.pais}
              onChange={(e) => (user.pais = e.target.value)}
            ></input>

            <h3 for="description">Biografía:</h3>

            <textarea
              className={`${styles.entrada} ${styles.btn}`}
              id="description"
              defaultValue={user.description}
              onChange={(e) => (user.description = e.target.value)}
            />

            <h3>Especialidades</h3>
          </div>
          <div className={styles.texto}>
            <label>
              Marque a continuación las opciones que coincidan con sus especialidades
            </label>
          </div>
          <div className={styles.seleccion}>
            {!!areas &&
              areas.map((area) => (
                <div>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    name={area.especialidad}
                    value={area.especialidad}
                    id={area.especialidad}
                  />
                  <label className={styles.checklabel} for={area.especialidad}>
                    {area.especialidad}
                  </label>
                </div>
              ))}
          </div>
          <div className={styles.submit}>
            <input
              type="button"
              className={`${styles.boton} ${styles.btn2}`}
              value="Guardar cambios"
              onClick={handleOnClick}
            ></input>
          </div>
        </form>
        <div className={styles.boxAgregarCita}>
          <div className={styles.boxInputAgregarCita}>
            <h1 className={styles.title}>Agregar citas disponibles</h1>
            <input
              name="date"
              type="date"
              onChange={handleOnChange}
              className={styles.picker}
            />
            <input
              name="hour"
              type="time"
              value={values.hour}
              onChange={handleOnChange}
              disabled={values.date === ""}
              className={styles.picker}
            />

            {/* <DatePicker
        selected={date}
        // onChange={OnChange}
        locale="es"
        className="pickers"
        dateFormat="dd 'de' MMM 'de' yyyy"
      /> */}
            <input
              type="button"
              value="Agregar cita"
              onClick={agregarCita}
              className={styles.button}
            />
            {error !== "" && <span className={styles.error}>{error}</span>}
          </div>
          <div className={styles.rightSize}>
            <h1 className={styles.title}>Citas Disponibles</h1>
            <div className={styles.citas}>
              {user.appointments.length !== 0 ? (
                <>
                  <div className={styles.titleList}>
                    <h3>Fecha:</h3>
                    <h3>Hora:</h3>
                  </div>

                  {ordenar(user.appointments).map((m) => (
                    <>
                      {console.log(user.appointments.date)}
                      {m.status === 2 && date < new Date(m.date) && (
                        <div key={m.id} className={styles.cita}>
                          <p className={styles.grid}>{diaSemana(m.date)}</p>
                          <p className={styles.grid}>
                            {m.hour}
                            <button
                              className={styles.btnDelete}
                              onClick={() => deleteAppointment(m.id)}
                            >
                              Borrar
                            </button>
                          </p>
                        </div>
                      )}
                    </>
                  ))}
                </>
              ) : (
                <span>No hay citas disponibles</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PerfilEspecialista;