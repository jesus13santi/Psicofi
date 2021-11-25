import styles from "./Incidencia.module.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const Incidencia = ({ name, date, id }) => {

  const history = useHistory();
  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const handleOnChange = (event) => {
    const {value, name: inputName} = event.target;
    console.log({inputName, value });
    setValues({...values,[inputName]: value})
    };

  return (
    <>
        <div className={styles.atribute}>
            <h3 className={styles.tag}>Fecha:</h3>
            <p className={styles.text}>{date}</p>
            <h3 className={styles.tag}>Título:</h3>

            <input
                name="title"
                value={values.title}
                className={styles.titleInput}
                placeholder=""
                onChange={handleOnChange}
                ></input>

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
    </>
  );
};

export default Incidencia;

/*
      <div className={styles.patientInfo}>
        <div>
          <picture className={styles.boxImg}>
            <img src={photo} alt="" />
          </picture>
        </div>
        <div className={styles.boxInfo}>
            <h2 className={styles.title}>nombre</h2>
            <p className={styles.p}>pais</p>
        </div>
      </div>
*/