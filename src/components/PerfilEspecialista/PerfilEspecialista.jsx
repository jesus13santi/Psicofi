import { useContext, component } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import React, { useState, useEffect } from "react";
import styles from "./PerfilEspecialista.module.css";
import { db } from "../../utils/firebaseConfig";
import $ from "jquery";
import firebase from "firebase";
//import es from "date-fns/locale/es";
import uniqid from "uniqid";

const PerfilEspecialista = () => {
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
            alert("Cita Agregada");
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
    alert("Cita Eliminada");
  };
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
    <div className={`${styles.fondorosa} ${styles.bordecontenedor}`}>
      <div className={styles.titulo}>Mi perfil</div>
      <form>
        <div>
          <div className={styles.etiqueta}>
            <label for="NombreCompleto">Nombre Completo:</label>
          </div>
          <div className={styles.campo}>
            <label id="NombreCompleto">{user.name}</label>
          </div>
        </div>
        <div>
          <div className={styles.etiqueta}>
            <label for="FechaNacimiento">Fecha de nacimiento:</label>
          </div>
          <div className={styles.campo}>
            <label name="FechaNacimiento">{diaBirthday(user.birthday)}</label>
          </div>
        </div>
        <div>
          <div className={`${styles.etiqueta} ${styles.lineagruesa}`}>
            <label for="FotoPerfil">Foto de perfil:</label>
          </div>
          <div
            className={`${styles.campofoto} ${styles.campo}  ${styles.lineagruesa}`}
          >
            <img src={user.photo} className={styles.fotoperfil}></img>
            <label for="upload" class={styles.boton}>
                  Cambiar
              </label>
              <input id="upload" className={styles.boton} type="file" onChange={(e)=>{upload(e.target.files[0])}}/>
            <a href="#" className={`${styles.boton} ${styles.eliminar}`}>
              Eliminar
            </a>
          </div>
        </div>
        <div>
          <div className={styles.etiqueta}>
            <label for="correo">Correo electrónico:</label>
          </div>
          <div className={styles.campo}>
            <input
              name="correo"
              className={styles.entrada}
              type="email"
              id="correo"
              defaultValue={user.email}
              onChange={(e) => (user.email = e.target.value)}
            ></input>
          </div>
        </div>
        <div>
          <div className={styles.etiqueta}>
            <label for="telefono">Teléfono:</label>
          </div>
          <div className={styles.campo}>
            <input
              name="telefono"
              className={styles.entrada}
              type="text"
              id="telefono"
              defaultValue={user.number}
              onChange={(e) => (user.number = e.target.value)}
            ></input>
          </div>
        </div>
        <div>
          <div className={styles.etiqueta}>
            <label for="pais">Lugar de residencia:</label>
          </div>
          <div className={styles.campo}>
            <input
              type="text"
              name="pais"
              className={styles.entrada}
              id="pais"
              defaultValue={user.pais}
              onChange={(e) => (user.pais = e.target.value)}
            ></input>
          </div>
        </div>
        <div>
          <div className={`${styles.etiqueta} ${styles.lineagruesa}`}>
            <label for="description">Biografía:</label>
          </div>
          <div className={`${styles.campo} ${styles.lineagruesa}`}>
            <textarea
              className={styles.entrada}
              id="description"
              defaultValue={user.description}
              onChange={(e) => (user.description = e.target.value)}
            />
          </div>
        </div>
        <div className={styles.subtitulo}>
          <label>Especialidades</label>
        </div>
        <div className={styles.texto}>
          <label>
            Marque a continuación las opciones que coincidan con sus
            Especialidades
          </label>
        </div>
        <div className={styles.seleccion}>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="ansiedad"
            value="ansiedad"
            id="ansiedad"
          />
          <label className={styles.checklabel} for="ansiedad">
            Ansiedad
          </label>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="autoestima"
            value="autoestima"
            id="autoestima"
          />
          <label className={styles.checklabel} for="autoestima">
            Autoestima
          </label>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="sexualidad"
            value="sexualidad"
            id="sexualidad"
          />
          <label className={styles.checklabel} for="sexualidad">
            Sexualidad
          </label>
        </div>
        <div className={styles.seleccion}>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="estres"
            value="estres"
            id="estres"
          />
          <label className={styles.checklabel} for="estres">
            Estres
          </label>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="amorosos"
            value="Problemsa amorosos"
            id="amorosos"
          />
          <label className={styles.checklabel} for="amorosos">
            Problemas amorosos
          </label>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="desarrollo"
            value="desarrollo"
            id="desarrollo"
          />
          <label className={styles.checklabel} for="desarrollo">
            Desarrollo personal
          </label>
        </div>
        <div className={styles.submit}>
          <input
            type="button"
            className={styles.boton}
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
                    {m.status === 2 && (
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
  );
};

export default PerfilEspecialista;
