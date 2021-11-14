import { useState, useContext } from "react"
import { UserContext } from "../../context/UserContext";
import { auth, googleProvider } from "../../utils/firebaseConfig"
import { useHistory } from "react-router-dom";
import styles from "./RegisterForm.module.css"
import {validateEmail} from "../../utils/helpers.js"
import { size } from "lodash"


function RegisterForm() {

    const history = useHistory;
    const {createUser} = useContext(UserContext)

    const [errorName, setErrorName] = useState("")
    const [errorLastName, setErrorLastName] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorPasswordB, setErrorPasswordB] = useState("")
    const [errorNumber, setErrorNumber] = useState("")

    const [role, setRole] = useState("")
    const cambioRole = a =>{
      setRole(a.target.value)
    }
      
    const [values, setValues] = useState({
        name: "",
        lastname: "",
        email: "",
        password: "",
        passwordB: "",
        number: "",
    });

    const handleGoogleLogin = async () =>{
        await auth.signInWithPopup(googleProvider);
    };

    const handleOnChange = (event) => {
        const {value, name: inputName} = event.target;
        console.log({inputName, value });
        setValues({...values,[inputName]: value})

    };

    const validateData = () => {
        setErrorName("")
        setErrorLastName("")
        setErrorPasswordB("")
        setErrorEmail("")
        setErrorPassword("")
        setErrorNumber("")
        let isValid = true

        if(size(values.name) < 3) {
            setErrorName("Debes ingresar un nombre de al menos tres carácteres.")
            isValid = false
        }

        if(size(values.lastname) < 3) {
            setErrorLastName("Debes ingresar una contraseña de al menos tres carácteres.")
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
            console.log("no ta iguales")
        }
        
        if(size(values.number) < 1) {
            setErrorName("Ingrese un numero de telefono valido")
            isValid = false
        }

        return isValid
    }
    
    const handleSubmit = async (e) => {

        if (!validateData()){
            return
        }

        e.preventDefault();

        const response = await auth.createUserWithEmailAndPassword(
            values.email, 
            values.password,
        );

        await createUser(
            {
            name: values.name,
            lastname: values.lastname,
            email: values.email,
            password: values.password,
            number: values.number,
            role: {role},

            },
            response.user.uid
        );
           //history.push("/perfil");//
    };
   

    return (

    <section className={styles.registerSecc}>
        <div className={styles.container}>
          <div className={styles.header}>

            <h2 className={styles.tittle}> Que bueno tenerte </h2>
            <p className={styles.nextText}> Continua con... </p>
            <div className={styles.socialButtons}> 

            <button className={styles.img1} type="button" onClick={handleGoogleLogin}> </button>

            <button className={styles.img2} type="button" onClick={handleGoogleLogin}> </button>

            <button className={styles.img3} type="button" onClick={handleGoogleLogin}> </button>
                        
            </div>
            <p className={styles.nextText}> o correo electronico: </p>
            
          </div>
          
          <form onSubmit={handleSubmit}>

            <div className={styles.input1}>

              <input className={styles.formRegis}
                name="name"
                id={styles.name}
                type="text"
                placeholder="Enter your name"
                value={values.name}
                onChange={handleOnChange}
              />

              <input className={styles.formRegis}
                name="lastname"
                id={styles.lastname}
                type="lastname"
                placeholder="Enter your lastname"
                value={values.lastname}
                onChange={handleOnChange}
              />

            </div>

            <div className={styles.input2}>

              <input className={styles.formRegis}
                  name="email"
                  id={styles.email}
                  type="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleOnChange}
                  errorMessage={errorEmail}
                />

                <input className={styles.formRegis}
                  name="password"
                  id={styles.password}
                  type="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleOnChange}
                  errorMessage={errorPassword}
                />

                <input className={styles.formRegis}
                  name="passwordB"
                  id={styles.passwordB}
                  type="password"
                  placeholder="Confirm your password"
                  value={values.passwordB}
                  onChange={handleOnChange}
                  errorMessage={errorPasswordB}
                />

            </div>
            
            <div className={styles.input3}>

              <input className={styles.formRegis}
                name="number"
                id={styles.number}
                type="text"
                placeholder="Enter your phone"
                value={values.number}
                onChange={handleOnChange}
              />

            </div>
           
            <div className={styles.submit}>
              <button className={styles.continue} type="submit" onClick={handleSubmit}> Continuar </button>
              <p id={styles.loginNext} className={styles.nextText}> ¿Ya tiene una cuenta? <u>Iniciar sesion</u></p>
            </div>           
          </form> 
        </div>

        <div class="infoPersonal">
            <form class={styles.formPersonal}>
                <span class={styles.textForm}>Indique rol de registro:</span>
                
                <input class={styles.boxRol} 
                  type="radio" 
                  value="Paciente" 
                  id="Role1" 
                  checked={role == "Paciente" ? true:false}
                  onChange={cambioRole}>
                </input>
                  
                <label class={styles.labelRol} for="Role1">Paciente</label>
                
                <input class={styles.boxRol} 
                  type="radio" 
                  value="Psicologo" 
                  id="Role2" 
                  checked={role == "Psicologo" ? true:false}
                  onChange={cambioRole}>                    
                  </input>
                <label class={styles.labelRol} for="Role2">Psicologo</label>
       
            </form>
            <p>El radio button es: <b>{role}</b></p>
        </div>

      </section>
       
    );    
   
};

export default RegisterForm;