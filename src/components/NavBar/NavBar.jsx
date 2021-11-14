import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";
import { useHistory } from "react-router-dom";
const NavBar = () => {
  const history = useHistory();
  const handdleHome = () => {
    history.push("/");
  };
  const handdleLogin = () => {
    history.push("/login");
  };  
  return (
    <nav className={styles.nav}>
      <img src={Logo} alt="" className={styles.img} onClick={handdleHome} />
      <div className={styles.rightSize}>
        <Link to="/" className={styles.link}>
          Contacto
        </Link>
        <Link to="/" className={styles.link}>
          Testimonios
        </Link>
        <Link className={styles.link}>Psicologos</Link>
        <Link to="/" className={styles.link}>
          Precios
        </Link>
        <Link to="/perfilPaciente" className={styles.link}>
          Perfil
        </Link>
        <Link to="/perfilEspecialista" className={styles.link}>
          Perfil Especialista
        </Link>
        {/* <Link to="/register" className={styles.link}>Registrarse</Link> */}
        <button type="button" className={styles.button} onClick={handdleLogin}>
          Iniciar Sesion
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
