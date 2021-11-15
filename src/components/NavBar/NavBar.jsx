import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";
import { useHistory } from "react-router-dom";
import { useState, useContext } from "react";
import menuVector from "../../img/menuVector.png";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../utils/firebaseConfig";
// import { auth } from "firebase";
const NavBar = () => {
  const {user, setUser} = useContext(UserContext)
  const [isOpen, setOpen] = useState(false);
  const [isOpenLog, setOpenLog] = useState(false);
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
  const handdleMenu1 = () => {
    !isOpenLog ? setOpenLog(true) : setOpenLog(false);
    console.log(isOpen)
  };
  const handdleLogOut = async () => {
      handdleMenu1()
      await auth.signOut();
      setUser(null);
      await history.push("/")
      
  };



  return (
    <>
      <nav className={styles.nav}>
        <img src={Logo} alt="" className={styles.img} onClick={handdleHome} />

        {!!user ? (
          <div className={styles.rightSize}>
            <img
              src={menuVector}
              alt=""
              className={styles.menuVecto}
              onClick={handdleMenu1}
            />
          </div>
        ) : (
          <>
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
          </>
        )}
      </nav>
      {isOpen && !user && (
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
      {/* Usuario Logueado */}
      {user && isOpenLog ? (
        <ul className={styles.menuLog}>
          <li onClick={handdleMenu1}>
            <Link to="/" className={styles.linkMobile}>
              Mi Pefil
            </Link>
          </li>
          <li onClick={handdleMenu1}>
            <Link to="/" className={styles.linkMobile}>
              Buscar Especialistas
            </Link>
          </li>
          <li onClick={handdleMenu1}>
            <Link to="/psicologos" className={styles.linkMobile}>
              Chats
            </Link>
          </li>
          <li onClick={handdleMenu1}>
            <Link to="/precio" className={styles.linkMobile}>
              Historial de Consultas
            </Link>
          </li>
          <li onClick={handdleMenu1}>
            <button className={styles.buttonMobile} onClick={handdleLogOut}>
              Cerrar Sesión
            </button>
          </li>
        </ul>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default NavBar;
