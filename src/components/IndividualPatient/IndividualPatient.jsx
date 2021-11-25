import { useHistory } from 'react-router-dom';
import styles from "./IndividualPatient.module.css";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Footer from '../Footer/Footer';
import { db } from "../../utils/firebaseConfig";
import dayjs from "dayjs";
import Sweetalert from '../Sweetalert/Sweetalert';

const IndividualPatient = ({ id, name, email, pais, number, photo, incidencias }) => {

    var rn = dayjs()
    var today = rn.format('DD/MM/YYYY')

    const [ isAddingIncidenciaActive, setIsAddingIncidenciaActive ] = useState(false);
    const [ doIncidenciasExist, setDoIncidenciasExist ] = useState(false);
    const [ incidencies, setIncidencies ] = useState([]);

    const history = useHistory();
    const { user } = useContext(UserContext);
    const [values, setValues] = useState({
      title: "",
      description: "",
    });

    useEffect (() => {
        if (db) {
            db.collection("users").doc(id).onSnapshot((doc)=> {
                    const data = doc.data();
                    console.log(data);
                    setIncidencies(data.incidencias);
            })
        } 
    },
    [db])

    const handleOnChange = (event) => {
        const {value, name: inputName} = event.target;
        console.log({ inputName, value });
        setValues({...values,[inputName]: value})
        };

    async function crearIncidencia() {

        if(db){
            const aux = [...incidencies]
            const inc = {
                date: today,
                uid: user.id,
                title: values.title,
                description: values.description
            }

            aux.push(inc)
             await db.collection("users").doc(id).update({
                incidencias: aux
            })
            setIsAddingIncidenciaActive(false);
            setDoIncidenciasExist(true);
        }
    }

    const handleIncidencia = () => {
        setIsAddingIncidenciaActive(true);
    };

    function showIncidencia() {
    }

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
                                <h2 className={styles.text}>{name}</h2>
                                <p className={styles.text}>{pais}</p>
                            </div>
                        </div>

                        <div className={styles.boxAtribute}>
                            <div className={styles.atribute}>
                                <h3 className={styles.tag}>Correo electrónico:</h3>
                                <p className={styles.text}>{email}</p>
                                <h3 className={styles.tag}>Teléfono: </h3>
                                <p className={styles.text}>{number}</p>
                            </div>
                        </div>

                    </div>

                    <div className={styles.incidencias}>
                        <h3 className={styles.tag}>Próxima consulta:</h3>
                    </div>
                    <div className={styles.innerContainer}>
                        <p className={styles.text}>11/11/2022 10:00am</p>
                        <button type="button" className={styles.button}>
                            Ver chat 
                        </button>
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
                                        <h3 className={styles.tag}>Fecha:</h3>
                                        <p className={styles.text}>{today}</p>
                                        <p></p>
                                        <h3 className={styles.tag}>Título:</h3>

                                        <input
                                            name="title"
                                            value={values.title}
                                            className={styles.titleInput}
                                            placeholder=""
                                            onChange={handleOnChange}
                                            ></input>

                                        <p></p>
                                        <h3 className={styles.tag}>Descripción:</h3>
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
            
                                <div className={styles.boxAtribute}>
                                    <button
                                    className={styles.button}
                                    onClick={crearIncidencia}
                                    type="button">
                                    Listo
                                    </button>
                                </div>
                            </>
                            ) : (
                                incidencias.length > 0 && (
                                    incidencies.map((inc) => (
                                        <div className={styles.innerContainer}>
                                            <p className={styles.text}>{inc.title}</p>
                                            <button type="button" className={styles.button} onClick={showIncidencia}>
                                                Revisar 
                                            </button>
                                        </div>
                                    ))
                                )
                            )}


                </div>
            </div>
            <Footer />
      </>
    );
}

export default IndividualPatient;
