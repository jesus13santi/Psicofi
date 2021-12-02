import { useContext } from "react"
//import { Redirect } from "react-router";
import { db } from "../../utils/firebaseConfig";
import { useEffect, useState } from "react/cjs/react.development";
import { UserContext } from "../../context/UserContext"
import PerfilEspecialista from "../PerfilEspecialista/PerfilEspecialista";
import PerfilPaciente from "../PerfilPaciente/PerfilPaciente";
import Loading from "../Loading/Loading";

const Perfil = () => {
    
    //console.log(areas)
    const { user, setUser, getUserByEmail } = useContext(UserContext);
    return (
      <>
        {!!user ? (

          <div>
            {user.role == "Psicologo" && <PerfilEspecialista />}

            {user.role == "Paciente" && <PerfilPaciente />}
          </div>
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </>
    );
};
export default Perfil