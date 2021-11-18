import { useContext } from "react"
import { Redirect } from "react-router";
import { useEffect } from "react/cjs/react.development"
import { UserContext } from "../../context/UserContext"
import PerfilEspecialista from "../PerfilEspecialista/PerfilEspecialista";
import PerfilPaciente from "../PerfilPaciente/PerfilPaciente";

const Perfil = () => {

    const { user, setUser ,createUser,getUserByEmail } = useContext(UserContext);
    useEffect(() => {        
        console.log(user)
    })
    
    if(user != null && user.role == 'Psicologo')
        return <PerfilEspecialista />
    else if(user != null && user.role == 'Paciente')
    return <PerfilPaciente />
    else
        return (
            <div>Hola mundo</div>
        )
}
export default Perfil