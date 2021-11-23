import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { auth, googleProvider, facebookProvider } from "../../utils/firebaseConfig";
import { Link, useHistory } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { validateEmail } from "../../utils/helpers.js";
import { size } from "lodash";

function LoginForm() {
  const history = useHistory();
  const { user, setUser ,createUser,getUserByEmail } = useContext(UserContext);

  const [errorName, setErrorName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordB, setErrorPasswordB] = useState("");
  const [errorNumber, setErrorNumber] = useState("");

  const [role, setRole] = useState("");
  const cambioRole = (a) => {
    setRole(a.target.value);
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
    
    
  });

  const handleGoogleLogin = async () => {
    await auth.signInWithPopup(googleProvider);
    history.push("/deck");
    
  };

  const handleFacebookLogin = async () =>{
    await auth.signInWithPopup(facebookProvider);
    history.push("/deck");
    
  };

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    // console.log({ inputName, value });
    setValues({ ...values, [inputName]: value });
  };

  const validateData = () => {
    setErrorName("");
    setErrorLastName("");
    setErrorPasswordB("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorNumber("");
    let isValid = true;

    if (size(values.name) < 3) {
      setErrorName("Debes ingresar un nombre de al menos tres carácteres.");
      isValid = false;
    }

    if (size(values.lastname) < 3) {
      setErrorLastName(
        "Debes ingresar una contraseña de al menos tres carácteres."
      );
      isValid = false;
    }

    if (!validateEmail(values.email)) {
      setErrorEmail("Debes de ingresar un email válido.");
      isValid = false;
    }

    if (size(values.password) < 8) {
      setErrorPassword(
        "Debes ingresar una contraseña de al menos ocho carácteres."
      );
      isValid = false;
    }

    if (size(values.passwordB) < 8) {
      setErrorPasswordB(
        "Debes ingresar una confirmación de contraseña de al menos ocho carácteres."
      );
      isValid = false;
    }

    if (values.password !== values.passwordB) {
      setErrorPassword("Asegure que la contraseñas coincidan.");
      setErrorPasswordB("Asegure que la contraseñas coincidan.");
      isValid = false;
      console.log("no ta iguales");
    }

    if (size(values.number) < 1) {
      setErrorName("Ingrese un numero de telefono valido");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth.signInWithEmailAndPassword(values.email, values.password);
    history.push("/deck");
    console.log("LOGIN_PASSWOROD");
  };

  return (
    <section className={styles.registerSecc}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.tittle}> Que bueno tenerte </h2>
          <p className={styles.nextText}> Continua con... </p>
          <div className={styles.socialButtons}>
            <button
              className={styles.img1}
              type="button"
              onClick={handleGoogleLogin}
            >
              {" "}
            </button>

            <button
              className={styles.img2}
              type="button"
              onClick={handleFacebookLogin}
            >
              {" "}
            </button>

            <button
              className={styles.img3}
              type="button"
              onClick={handleGoogleLogin}
            >
              {" "}
            </button>
          </div>
          <p className={styles.nextText}> o correo electronico: </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className={styles.input2}>
            <input
              className={styles.formRegis}
              name="email"
              id={styles.email}
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleOnChange}
              errorMessage={errorEmail}
            />

            <input
              className={styles.formRegis}
              name="password"
              id={styles.password}
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={handleOnChange}
              errorMessage={errorPassword}
            />

            
          </div>

          

          <div className={styles.submit}>
            <button
              className={styles.continue}
              type="submit"
              onClick={handleSubmit}
            >
              {" "}
              Continuar{" "}
            </button>
            <p id={styles.loginNext} className={styles.nextText}>
              {" "}
              ¿No tienes una cuenta? <Link to="/register">Registrate</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
export default LoginForm;
