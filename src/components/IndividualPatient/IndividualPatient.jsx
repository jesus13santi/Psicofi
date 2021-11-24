import { useHistory } from 'react-router-dom';
import styles from "./IndividualPatient.module.css";
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Footer from '../Footer/Footer';

const IndividualPatient = ({ id, name, email, pais, number, photo }) => {

    const [ toggleIncidencia, setToggleIncidencia ] = useState(false);
    const [ addIncidencia, setAddIncidencia ] = useState(false);
    const history = useHistory();
    const { user } = useContext(UserContext);

    const createIncidencia = () => {
        setToggleIncidencia(false);
    }

    const handleIncidencia = () => {
        setToggleIncidencia(true);
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
                        <h3 className={styles.tag}>Próximas consultas:</h3>
                    </div>
                    <div className={styles.innerContainer}>
                            <p className={styles.text}>Sesión #4: Progreso</p>
                            <button type="button" className={styles.button}>
                                Revisar 
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

                    { toggleIncidencia ? (
                        <>
                        <div className={styles.innerContainer}>
                            <input className={styles.input} placeholder="Titulo"></input>
                            <button type="button" className={styles.button}>
                                Guardar 
                            </button>
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
