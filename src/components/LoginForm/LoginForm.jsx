import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { auth, googleProvider, facebookProvider, twitterProvider } from "../../utils/firebaseConfig";
import { Link, useHistory } from "react-router-dom";
import styles from "./LoginForm.module.css";
import Loading from "../Loading/Loading";



function LoginForm() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading]= useState(false)
  
  const [error, setError] = useState("");
  
  

  const [role, setRole] = useState("");
  const cambioRole = (a) => {
    setRole(a.target.value);
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
    
    
  });

  const handleGoogleLogin = async () => {
    try{
      await auth.signInWithPopup(googleProvider);

    }catch(e){
      setError("Tiempo de espera agotado, vuelva a intentarlo.")
    }
    
    // history.push("/deck");
    
    
    
  };

  const handleFacebookLogin = async () =>{
    try{
      await auth.signInWithPopup(twitterProvider);

    }catch(e){
      setError("Tiempo de espera agotado, vuelva a intentarlo.")
    }
    
  };

  const handleTwitterLogin = async () =>{
    try{
      await auth.signInWithPopup(googleProvider);

    }catch(e){
      setError("Tiempo de espera agotado, vuelva a intentarlo.")
    }
    
  };

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    // console.log({ inputName, value });
    setValues({ ...values, [inputName]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try{
      await auth.signInWithEmailAndPassword(values.email, values.password);
      setLoading(false);
      console.log("LOGIN_PASSWOROD");
      

    }catch(e){
      console.log(e.code)
      setError("Usuario o Contraseña invalido, por favor verifique e intente de nuevo.")
      setLoading(false);
    }
    
  };
  

  return (
    <section className={styles.registerSecc}>
      {Loading===true ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.tittle}> Bienvenido de vuelta </h2>
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
                onClick={handleTwitterLogin}
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
                placeholder="Correo electrónico"
                value={values.email}
                onChange={handleOnChange}
              />

              <input
                className={styles.formRegis}
                name="password"
                id={styles.password}
                type="password"
                placeholder="Contraseña"
                value={values.password}
                onChange={handleOnChange}
              />
              {!!error ? (
                <div className={styles.error}>{error}</div>
              ) : (
                <span></span>
              )}
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
              <p className={styles.nextText}>
                {" "}
                ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
              </p>

              {!!user && (
                <>
                  {user.role === "" &&(
                     history.push("/election")
                  )}
                  {user.role === "Admin" &&(
                     history.push("/admin")
                  )}
                  {user.role === "Rechazado" &&(
                     history.push("/rechazado")
                  )}
                  {user.role === "Pendiente" &&(
                     history.push("/pendiente")
                  )}
                  {user.role === "Psicologo" &&(
                     history.push("/deck")
                  )}
                  {user.role === "Paciente" &&(
                     history.push("/deck")
                  )}
                  
                </>
              )}
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
export default LoginForm;
