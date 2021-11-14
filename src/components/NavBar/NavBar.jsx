import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import menuVector from "../../img/menuVector.png";
const NavBar = () => {
  const [isOpen, setOpen] = useState(false);
  const history = useHistory();
  const handdleHome = () => {
    history.push("/");
    setOpen(false)
  };
  const handdleLogin = () => {
    history.push("/login");
  };
  const handdleMenu = () => {
    !isOpen ? setOpen(true) : setOpen(false);
    
  };
  return (
    <>
      <nav className={styles.nav}>
        <img src={Logo} alt="" className={styles.img} onClick={handdleHome} />

        <ul className={styles.rightSize}>
          <li>
            <Link to="/" className={styles.link}>
              Contacto
            </Link>
          </li>
          <li>
            <Link to="/" className={styles.link}>
              Testimonios
            </Link>
          </li>
          <li>
            <Link to="/psicologos" className={styles.link}>
              Psicologos
            </Link>
          </li>
          <li>
            <Link to="/precio" className={styles.link}>
              Precios
            </Link>
          </li>
          <li>
            <Link to="/register" className={styles.link}>
              Registrarse
            </Link>
          </li>
          <li>
            <button
              type="button"
              className={styles.button}
              onClick={handdleLogin}
            >
              Iniciar Sesion
            </button>
          </li>
        </ul>
        <img
          src={menuVector}
          alt=""
          className={styles.menuVector}
          onClick={handdleMenu}
        />
      </nav>
      {isOpen && (
        <ul className={styles.menuMobile}>
          <li onClick={handdleMenu}>
            <Link to="/" className={styles.linkMobile}>
              Contacto
            </Link>
          </li>
          <li onClick={handdleMenu}>
            <Link to="/" className={styles.linkMobile}>
              Testimonios
            </Link>
          </li>
          <li onClick={handdleMenu}>
            <Link to="/psicologos" className={styles.linkMobile}>
              Psicologos
            </Link>
          </li>
          <li onClick={handdleMenu}>
            <Link to="/precio" className={styles.linkMobile}>
              Precios
            </Link>
          </li>
          <li onClick={handdleMenu}>
            <Link to="/login" className={styles.linkMobile}>
              Iniciar Sesion
            </Link>
          </li>
        </ul>
      )}
    </>
  );
};

export default NavBar;
