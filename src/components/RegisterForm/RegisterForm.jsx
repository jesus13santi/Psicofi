import { useState, useContext } from "react"
import { UserContext } from "../../context/UserContext";
import { auth, googleProvider, facebookProvider, twitterProvider } from "../../utils/firebaseConfig"
import { useHistory, Link } from "react-router-dom";
import styles from "./RegisterForm.module.css"
import {validateEmail} from "../../utils/helpers.js"
import { size } from "lodash"
import Footer from "../Footer/Footer";


function RegisterForm() {

    const history = useHistory();
    const {createUser} = useContext(UserContext)

    const [errorName, setErrorName] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorPasswordB, setErrorPasswordB] = useState("")

    const { user, setUser} = useContext(UserContext);
      
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        passwordB: "",
    });

    const handleGoogleLogin = async () =>{
        await auth.signInWithPopup(googleProvider);
        console.log(user)
        await history.push("/election");
        
    };

    const handleFacebookLogin = async () =>{
      await auth.signInWithPopup(facebookProvider);
      console.log(user)
      await history.push("/election");
      
    };

    const handleTwitterLogin = async () =>{
      await auth.signInWithPopup(twitterProvider);
      console.log(user)
      await history.push("/election");
      
    };

    const handleOnChange = (event) => {
        const {value, name: inputName} = event.target;
        console.log({inputName, value });
        setValues({...values,[inputName]: value})

    };

    const validateData = () => {
        setErrorName("")
        setErrorPasswordB("")
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true

        if(size(values.name) < 3) {
            setErrorName("Debes ingresar un nombre de al menos tres carácteres.")
            isValid = false
        }

        if(!validateEmail(values.email)) {
            setErrorEmail("Debes de ingresar un email válido.")
            isValid = false
        }

        if(size(values.password) < 8) {
            setErrorPassword("Debes ingresar una contraseña de al menos ocho carácteres.")
            isValid = false
        }

        if(size(values.passwordB) < 8) {
            setErrorPasswordB("Debes ingresar una confirmación de contraseña de al menos ocho carácteres.")
            isValid = false
        }

        if(values.password !== values.passwordB) {
            setErrorPassword("Asegure que la contraseñas coincidan.")
            setErrorPasswordB("Asegure que la contraseñas coincidan.")
            isValid = false
        }

        return isValid
    }
    
    const handleSubmit = async (e) => {

        if (!validateData()){

        } else{
          e.preventDefault();

          const response = await auth.createUserWithEmailAndPassword(
              values.email, 
              values.password,
          );

          await createUser(
              {
              name: values.name,
              email: values.email,
              password: values.password,
              number: "",
              role: "",
              pais: "",
              photo: 'https://us.123rf.com/450wm/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de-ilu.jpg?ver=6',
              description: "",
              gender: "",
              birthday: "",
              problemas: [],
              appointments: [],
              incidencias: [],
              pdf: "",
              ratings: []
              },
              response.user.uid)
              console.log(response.user.uid)
              history.push("/election")     
                  
        }
        e.preventDefault()
    };

    return (
      
    <section className={styles.registerSecc}>
        <div className={styles.container}>
          <div className={styles.header}>

            <h2 className={styles.tittle}> Bienvenido </h2>
            <p className={styles.nextText}> Continua con... </p>
            <div className={styles.socialButtons}> 

            <button className={styles.img1} type="button" onClick={handleGoogleLogin}> </button>

            <button className={styles.img2} type="button" onClick={handleFacebookLogin}> </button>

            <button className={styles.img3} type="button" onClick={handleTwitterLogin}> </button>
                        
            </div>
            <p className={styles.nextText}> o correo electronico: </p>
            
          </div>
          
          <form onSubmit={handleSubmit}>

            <div className={styles.input2}>

              <input className={styles.formRegis}
                  name="name"
                  id={styles.name}
                  type="text"
                  placeholder="Nombre completo"
                  value={values.name}
                  onChange={handleOnChange}
                />  

              <h1 className={styles.alert} id={styles.alert}> {errorName} </h1> 

              <input className={styles.formRegis}
                  name="email"
                  id={styles.email}
                  type="email"
                  placeholder="Correo electrónico"
                  value={values.email}
                  onChange={handleOnChange}
                />

                <h1 className={styles.alert} id={styles.alert}> {errorEmail} </h1>

                <input className={styles.formRegis}
                  name="password"
                  id={styles.password}
                  type="password"
                  placeholder="Contraseña"
                  value={values.password}
                  onChange={handleOnChange}
                />

                <h1 className={styles.alert} id={styles.alert}> {errorPassword} </h1>

                <input className={styles.formRegis}
                  name="passwordB"
                  id={styles.passwordB}
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={values.passwordB}
                  onChange={handleOnChange}
                />

                <h1 className={styles.alert} id={styles.alert}> {errorPasswordB} </h1>

            </div>
           
            <div className={styles.submit}>
              <button className={styles.continue} type="submit" onClick={handleSubmit} > Continuar </button>
              <p id={styles.loginNext} className={styles.nextText}> 
              ¿Ya tiene una cuenta? <Link to="/login"><u>Iniciar sesión</u></Link>
              </p>
            </div>           
          </form> 
        </div>
        
      </section>
    ); 
      
   
};

export default RegisterForm;