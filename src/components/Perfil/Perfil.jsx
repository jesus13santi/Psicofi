import { useContext } from "react"
import { Redirect } from "react-router";
import { useEffect } from "react/cjs/react.development"
import { UserContext } from "../../context/UserContext"

const Perfil = () => {

    const { user, setUser ,createUser,getUserByEmail } = useContext(UserContext);
    useEffect(() => {        
        console.log(user)
    })
    
    if(user != null && user.role == 'Psicologo')
        return (<Redirect to = "/perfilEspecialista"></Redirect>)
    else if(user != null && user.role == 'Paciente')
    return (<Redirect to = "/perfilPaciente"></Redirect>)
    else
        return (
            <div>Hola mundo</div>
        )
}
export default Perfil