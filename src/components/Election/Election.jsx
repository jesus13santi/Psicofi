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
    const [gender, setGender] = useState("")
    const [values, setValues] = useState({
        number: "",
        pais: "",
        birthday: "",
    })
    const [errorNumber, setErrorNumber] = useState("")
    const [errorRole, setErrorRole] = useState("")
    const [errorPais, setErrorPais] = useState("")
    const [errorBirthday, setErrorBirthday] = useState("")
    const [errorGender, setErrorGender] = useState("")

    const validateData = () =>{

        setErrorNumber("")
        setErrorRole("")
        setErrorPais("")
        setErrorBirthday("")
        setErrorGender("")

        let isValid = true;

        if(size(values.number) < 1) {
            setErrorNumber("Debe ingresar un numero valido")
            isValid = false
        }

        if(role == "") {
            setErrorRole("Debe seleccionar un rol")
            isValid = false
        }

        if(size(values.pais) < 1) {
            setErrorPais("Debe ingresar una dirección valida")
            isValid = false
        }

        if(values.birthday == "") {
            setErrorBirthday("Debe seleccionar un fecha de nacimiento")
            isValid = false
        }

        if(gender == "") {
            setErrorGender("Debe seleccionar un genero")
            isValid = false
        }

        return isValid
    }

    const handleOnChange = (event) => {
        const {value, name: inputName} = event.target;
        //console.log({inputName, value });
        setValues({...values,[inputName]: value})

    };

    const cambioRole = async(a) =>{

        const d = await getUserByEmail(user.email)
        //console.log(d.id)

        setRole(a.target.value)
        const usersReference = db.collection("users");
        await usersReference.doc(d.id).update({
            role:(a.target.value),
            number:(values.number),
            pais:(values.pais),
            birthday:(values.birthday)
        });
        const updateUser = await getUserByEmail(user.email);
        //console.log({updateUser})
        setUser(updateUser);
    }

    const cambioGender = async(c) =>{

        const u = await getUserByEmail(user.email)
        //console.log(u.id)

        setGender(c.target.value)
        const usersReference = db.collection("users");
        await usersReference.doc(u.id).update({
            gender:(c.target.value),
            number:(values.number),
            pais:(values.pais),
            birthday:(values.birthday)
        });
        const updateUser = await getUserByEmail(user.email);
        //console.log({updateUser})
        setUser(updateUser);
    }

    const setNewData = async(b) =>{

        //console.log(user)
        
        if (!validateData()){
            
        } else {
            b.preventDefault();
            const e = await getUserByEmail(user.email)
            /* //console.log(e.id) */

            setValues(values.number)
            setValues(values.pais)
            setValues(values.birthday)

            const usersReference = db.collection("users");
            await usersReference.doc(e.id).update({
                number:(values.number),
                pais:(values.pais),
                birthday:(values.birthday)
                
            });
            const updateUser = await getUserByEmail(user.email);
            //console.log({updateUser})
            setUser(updateUser);
           
            if(user.role == "Pendiente"){
                history.push("/upload")
            }
            
            if(user.role == "Paciente"){
                history.push("/deck") 
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
                        value="Pendiente" 
                        id="Role2" 
                        checked={role == "Pendiente" ? true:false}
                        onChange={cambioRole}>                    
                        </input>
                        <label class={styles.labelRol} for="Role2">Psicologo</label>

                    </form>            
                </div>

                <h1 className={styles.alert} id={styles.errorR}> {errorRole} </h1>

                <div className={styles.data}> 

                    <div className={styles.input}>
                        <input className={styles.formRegis}
                        name="number"
                        type="text"
                        onChange={handleOnChange}
                        placeholder="Teléfono"
                        /> 
                    </div>

                    <h1 className={styles.alert}> {errorNumber} </h1>

                    <div class={styles.input}>
                        <input className={styles.formRegis}
                        name="pais"
                        type="text"
                        onChange={handleOnChange}
                        placeholder="País de residencia"
                        />           
                    </div>

                    <h2 className={styles.alert}> {errorPais} </h2>

                    <div class={styles.input}>
                        <input className={styles.formRegis}
                        name="birthday"
                        type="date"
                        onChange={handleOnChange}
                        />           
                    </div>

                    <h3 className={styles.alert}> {errorBirthday} </h3>

                </div>

                <div className={styles.genderElection}>

                    <form class={styles.formPersonal2}>
                                                
                        <input class={styles.boxGender} 
                        type="radio" 
                        value="Mujer" 
                        id="gender1" 
                        checked={gender == "Mujer" ? true:false}
                        onChange={cambioGender}>
                        </input>
                        
                        <label class={styles.labelGender} for="gender1">Mujer</label>
                        
                        <input class={styles.boxGender} 
                        type="radio" 
                        value="Hombre" 
                        id="gender2" 
                        checked={gender == "Hombre" ? true:false}
                        onChange={cambioGender}>                    
                        </input>
                        <label class={styles.labelGender} for="gender2">Hombre</label>

                        <input class={styles.boxGender} 
                        type="radio" 
                        value="Otro" 
                        id="gender3" 
                        checked={gender == "Otro" ? true:false}
                        onChange={cambioGender}>                    
                        </input>
                        <label class={styles.labelGender} for="gender3">Otro</label>

                        <h1 className={styles.alert} id={styles.errorG}> {errorGender} </h1>

                    </form>  
                </div>

                

                <div className={styles.input}>
                    <button className={styles.continue} type="submit" onClick={setNewData}> Continuar </button>
                </div>    

            </div>
        </section>
    )


}
export default Election;