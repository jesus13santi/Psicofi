import { useHistory } from 'react-router-dom';
import styles from "./IndividualPatient.module.css";
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Footer from '../Footer/Footer';
import { db } from "../../utils/firebaseConfig";

const IndividualPatient = ({ id, name, email, pais, number, photo }) => {

    const [ isAddingIncidenciaActive, setIsAddingIncidenciaActive ] = useState(false);
    const [ doIncidenciasExist, setDoIncidenciasExist ] = useState(false);

    const history = useHistory();
    const { user } = useContext(UserContext);
    const [values, setValues] = useState({
      title: "",
      description: "",
    });

    const handleOnChange = (event) => {
        const {value, name: inputName} = event.target;
        console.log({inputName, value });
        setValues({...values,[inputName]: value})
        };

    function createIncidencia(e) {
        e.preventDefault();
        db.collection("users").doc(id).update({
            "appointments.incidencias": {
                title: values.title,
                description: values.description
            }
        })
        setIsAddingIncidenciaActive(false);
        setDoIncidenciasExist(true);
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
                                        <p className={styles.text}>55/55/5555</p>
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
                                    onClick={createIncidencia}
                                    type="button">
                                    Listo
                                    </button>
                                </div>
                            </>
                            ) : doIncidenciasExist ? (
                                <>
                                    <div className={styles.innerContainer}>
                                        <p className={styles.text}>Titulo 0</p>
                                        <button type="button" className={styles.button}>
                                            Revisar 
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <p>No hay incidencias aún.</p>
                            )}

                </div>
            </div>
            <Footer />
      </>
    );
}

export default IndividualPatient;
