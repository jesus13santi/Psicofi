import styles from "./Election.module.css"
import { useState, useContext } from "react"
import { UserContext } from "../../context/UserContext";
import { db } from "../../utils/firebaseConfig"
import { size } from "lodash"
import { useHistory } from "react-router-dom";


function Election(){
    
    const {getUserByEmail} = useContext(UserContext)
    const history = useHistory();
    const [role, setRole] = useState("")
    const [values, setValues] = useState("")
    const [errorNumber, setErrorNumber] = useState("")

    const validateData = () =>{
        setErrorNumber("")
        let isValid = true;

        if(size(values.number) < 1) {
            setErrorNumber("Debe ingresar un numero valido")
            isValid = false
        }

        return isValid
    }

    const handleOnChange = (event) => {
        const {value, name: inputName} = event.target;
        /* console.log({inputName, value }); */
        setValues({...values,[inputName]: value})

    };

    const cambioRole = async(a) =>{

        const d = await getUserByEmail(user.email)
        /* console.log(d.id) */

        setRole(a.target.value)
        const usersReference = db.collection("users");
        await usersReference.doc(d.id).update({
            role:(a.target.value)
        });
        const updateUser = await getUserByEmail(user.email);
        /* console.log({updateUser}) */
        setUser(updateUser);
    }

    const setPhone = async(b) =>{
        
        if (!validateData()){
            
        } else {
            b.preventDefault();
            const e = await getUserByEmail(user.email)
            /* console.log(e.id) */

            setValues(values.number)
            const usersReference = db.collection("users");
            await usersReference.doc(e.id).update({
                number:(values.number)
            });
            const updateUser = await getUserByEmail(user.email);
            /* console.log({updateUser}) */
            setUser(updateUser);
           
            if(user.role == "Psicologo"){
                history.push("/upload")
            }
            
            if(user.role == "Paciente"){
                /* history.push("/perfil") */
            } 
        }
        b.preventDefault();
              
    }

    const { user, setUser} = useContext(UserContext);

    return(
        <section className={styles.registerSecc}>
            <div className={styles.container}>
                <div div className={styles.header}>
                    <h1 className={styles.tittle}> Elige tu rol </h1>
                </div>
                
                <div class={styles.header}>
                    <form class={styles.formPersonal}>
                                                
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
                </div>
  
                <div className={styles.input}>
                    <input className={styles.formRegis}
                    name="number"
                    type="text"
                    onChange={handleOnChange}
                    placeholder="Enter your phone"
                    />
                </div>

                <h1 className={styles.alert}> {errorNumber} </h1>

                <div className={styles.input}>
                    <button className={styles.continue} type="submit" onClick={setPhone}> Continuar </button>
                </div>    

            </div>
        </section>
    )


}
export default Election;