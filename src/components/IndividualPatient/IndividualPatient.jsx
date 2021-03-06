import styles from "./IndividualPatient.module.css";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Footer from '../Footer/Footer';
import { db } from "../../utils/firebaseConfig";
import dayjs from "dayjs";
import swal from 'sweetalert';
import uniqid from "uniqid";

const IndividualPatient = ({ id, name, email, pais, number, photo, incidencias }) => {

    var rn = dayjs()
    var today = rn.format('DD/MM/YYYY')

    const [ isAddingIncidenciaActive, setIsAddingIncidenciaActive ] = useState(() => {
        return false;
    });

    const [ incidencies, setIncidencies ] = useState([]);
    const { user } = useContext(UserContext);
    const [values, setValues] = useState({
      title: "",
      description: "",
    });

    useEffect (() => {
        if (db) {
            db.collection("users").doc(id).onSnapshot((doc)=> {
                    const data = doc.data(); // all of the patient data
                    setIncidencies(data.incidencias);
            })
        } 
    },
    [db])

    const handleOnChange = (event) => {
        const {value, name: inputName} = event.target;
        //console.log({ inputName, value });
        setValues({...values,[inputName]: value})
        };

    const resetIncidencia = () => {
        setIsAddingIncidenciaActive(false);
        setValues({
            title: "",
            description: ""
        })
    }

    async function crearIncidencia() {

        if(db){
            const aux = [...incidencies]
            const inc = {
                id: uniqid(),
                date: today,
                uid: user.id,
                title: values.title,
                description: values.description
            }

            aux.push(inc)
             await db.collection("users").doc(id).update({
                incidencias: aux
                })
            }
        resetIncidencia();
        }

    const cancelIncidencia = () => {
        resetIncidencia();
    }

    const handleIncidencia = () => {
        setIsAddingIncidenciaActive(true);
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.box}>

                    <h1 className={styles.title}>Historia del paciente</h1>
                    <div className={styles.firstBox}>

                        <div className={styles.info}>
                            <picture className={styles.boxImg}>
                                <img src={photo} alt="" />
                            </picture>
                            <div className={styles.boxAtribute}>
                                <h2 className={styles.tag}>{name}</h2>
                                <p className={styles.text}>{pais}</p>
                            </div>
                        </div>

                        <div className={styles.boxAtribute}>
                            <div className={styles.atribute}>
                                <h3 className={styles.tag}>Correo electr??nico:</h3>
                                <p className={styles.text}>{email}</p>
                                <h3 className={styles.tag}>Tel??fono: </h3>
                                <p className={styles.text}>{number}</p>
                            </div>
                        </div>

                    </div>

                    <div className={styles.incidencias}>
                        <h3 className={styles.tag}>Incidencias:</h3>
                        <button
                        className={styles.button}
                        onClick={handleIncidencia}
                        type="button">
                        Agregar
                        </button>
                    </div>

                    { isAddingIncidenciaActive ? (
                            <>
                                <div className={styles.addIncidencia}>

                                    <div className={styles.iAtribute}>
                                        <h3 className={styles.incTag}>Fecha:</h3>
                                        <p className={styles.text}>{today}</p>
                                        <p></p>
                                        <h3 className={styles.incTag}>T??tulo:</h3>

                                        <input
                                            name="title"
                                            value={values.title}
                                            className={styles.titleInput}
                                            placeholder=""
                                            onChange={handleOnChange}
                                            ></input>

                                        <p></p>
                                        <h3 className={styles.incTag}>Desc:</h3>
                                        <div className={styles.textAreaBox}>

                                            <textarea
                                              name="description"
                                              value={values.description}
                                              cols="30"
                                              rows="10"
                                              placeholder=""
                                              className={styles.textArea}
                                              onChange={handleOnChange}
                                            ></textarea>

                                        </div>
                                    </div>
                                </div>
            
                                <div className={styles.buttonPair}>
                                    <button
                                    className={styles.button}
                                    onClick={cancelIncidencia}
                                    type="button">
                                    Cancelar
                                    </button>
                                    <button
                                    className={styles.button}
                                    onClick={crearIncidencia}
                                    type="button">
                                    Guardar
                                    </button>
                                </div>
                            </>
                            ) : (
                                    incidencies.map((inc) => (
                                        <div className={styles.innerContainer}>
                                            <p className={styles.text}>{inc.title}</p>
                                            <button type="button" className={styles.button} onClick={() => {
                                                swal(inc.title, "Agregado el " + today + ".\n" + inc.description);
                                            }}>
                                                Revisar 
                                            </button>
                                        </div>
                                    ))
                            )}
                </div>
            </div>
            <Footer />
      </>
    );
}

export default IndividualPatient;
