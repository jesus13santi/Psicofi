import { useHistory } from "react-router-dom";
import styles from "./Precios.module.css";
const Precios = () => {
    const history= useHistory()
    const handdleLoginOrRegister = () => {
      history.push("/login");
    };

  return (
    <div className={styles.container}>
      
        <div className={`${styles.costo} ${styles.box}`} id="boxPrecios">
          <h1 className={styles.title}>¿Cuenta cuesta una sesion?</h1>

          <div className={styles.boxCosto}>
            <p className={styles.individual}>Cita Individual</p>
            <h1>$29.99 USD</h1>

            <p>1 hora de videollamada</p>
          </div>
          <div className={styles.boxCosto}>
            <p className={styles.individual}>Cita Doble</p>
            <h1>$49.99 USD</h1>
            <p>1 hora de videollamada</p>
          </div>
        </div>

        <button
          type="button"
          className={styles.button}
          onClick={handdleLoginOrRegister}
        >
          Comenzar
        </button>
      
    </div>
  );
};

export default Precios;
