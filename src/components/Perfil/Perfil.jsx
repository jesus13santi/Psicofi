import { useContext } from "react"
//import { Redirect } from "react-router";
import { useEffect } from "react/cjs/react.development"
import { UserContext } from "../../context/UserContext"
import PerfilEspecialista from "../PerfilEspecialista/PerfilEspecialista";
import PerfilPaciente from "../PerfilPaciente/PerfilPaciente";

const Perfil = () => {

    const { user, setUser ,createUser,getUserByEmail } = useContext(UserContext);
    /*
    useEffect(() => {        
        console.log(user)
    })*/
    return (
        <>
        {!!user ?(
        <div>
        {user.role == 'Psicologo' && (
            <PerfilEspecialista />)}

        {user.role == 'Paciente' && (
            <PerfilPaciente />)}
        </div>
        ):(
            <div><h1>Loading...</h1></div>
        )}

            </>
    );
};
export default Perfil