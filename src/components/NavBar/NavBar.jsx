import styles from "./NavBar.module.css";
import { Link, useHistory } from "react-router-dom";
import Logo from "../../img/Logo.png";
import { useState, useContext } from "react";
import menuVector from "../../img/menuVector.png";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../utils/firebaseConfig";
import flechaArriba from "../../img/flecha-arriba.png"
import flechaAbajo from "../../img/flecha-abajo.png";

// import { auth } from "firebase";
const NavBar = () => {
  const {user, setUser} = useContext(UserContext)
  const [isOpen, setOpen] = useState(false);
  const [isOpenLog, setOpenLog] = useState(false);
  const history = useHistory();

  const handdleHome = () => {
    if(!!user){
    if(user.role==="Pendiente" || user.role==="Admin" || user.role=="Rechazado"){
        handdleLogOut()
    }else{
      history.push("/");
      setOpen(false);
    }
  }else{
    history.push("/");
    setOpen(false);
  }
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
    history.push("/")  
    handdleMenu1()
      await auth.signOut();
    
    setUser(null);
      
      
  };
  const historyDeck=()=>{
    history.push("/deck")
  }


  return (
    <>
      <nav className={styles.nav}>
        <img src={Logo} alt="" className={styles.img} onClick={handdleHome} />

        {!!user ? (
          <div className={`${styles.rightSize1} ${styles.rightSize}`}>
            {user.role === "Pendiente" ||
            user.role === "Admin" ||
            user.role === "Rechazado" ? (
              <>
                <button className={styles.button} onClick={handdleLogOut}>
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <picture className={styles.boxImg} onClick={historyDeck}>
                  <img
                    src={user.photo}
                    alt=""
                    className={styles.menuVecto}
                    onClick={historyDeck}
                  />
                </picture>
                <p onClick={historyDeck}>{user.name}</p>
                {isOpenLog ? (
                  <img src={flechaArriba} alt="" onClick={handdleMenu1} />
                ) : (
                  <img src={flechaAbajo} alt="" onClick={handdleMenu1} />
                )}
              </>
            )}
          </div>
        ) : (
          <>
            <ul className={`${styles.rightSize}`}>
              <li>
                <a href="mailto:psicofi.therapy@gmail.com" target="_blank" className={styles.link}>
                  Contacto
                </a>
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
            <a href="mailto:psicofi.therapy@gmail.com" target="_blank" className={styles.link}>
                  Contacto
                </a>
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
          {user.role == "Paciente" && (
            <>
              <li onClick={handdleMenu1}>
                <Link to="/perfil" className={styles.linkMobile}>
                  Mi Perfil
                </Link>
              </li>
              <li onClick={handdleMenu1}>
                <Link to="/psicologos" className={styles.linkMobile}>
                  Buscar Especialistas
                </Link>
              </li>
              <li onClick={handdleMenu1}>
                <Link to="/chats" className={styles.linkMobile}>
                  Chats
                </Link>
              </li>
              <li onClick={handdleMenu1}>
                <Link to="/history" className={styles.linkMobile}>
                  Historial de Consultas
                </Link>
              </li>
              <li onClick={handdleMenu1}>
                <button className={styles.buttonMobile} onClick={handdleLogOut}>
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
          {user.role == "Psicologo" && (
            <>
              <li onClick={handdleMenu1}>
                <Link to="/perfil" className={styles.linkMobile}>
                  Mi Perfil
                </Link>
              </li>
              <li onClick={handdleMenu1}>
                <Link to="/" className={styles.linkMobile}>
                  Citas Agendadas
                </Link>
              </li>
              <li onClick={handdleMenu1}>
                <Link to="/chats" className={styles.linkMobile}>
                  Chats
                </Link>
              </li>
              <li onClick={handdleMenu1}>
                <Link to="/history" className={styles.linkMobile}>
                  Historial de Consultas
                </Link>
              </li>
              <li onClick={handdleMenu1}>
                <button className={styles.buttonMobile} onClick={handdleLogOut}>
                  Cerrar Sesión
                </button>
              </li>
            </>
          )}
        </ul>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default NavBar;
