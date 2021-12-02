import { useContext } from "react"
//import { Redirect } from "react-router";
import { db } from "../../utils/firebaseConfig";
import { useEffect, useState } from "react/cjs/react.development";
import { UserContext } from "../../context/UserContext"
import PerfilEspecialista from "../PerfilEspecialista/PerfilEspecialista";
import PerfilPaciente from "../PerfilPaciente/PerfilPaciente";
import Loading from "../Loading/Loading";

const Perfil = () => {
    const [areas, setAreas]=useState(null)
    const { user, setUser ,createUser,getUserByEmail } = useContext(UserContext);
    /*
    useEffect(() => {        
        console.log(user)
    })*/
    const getArrayCollection = (snapshot) => {
      const collection = [];
      snapshot.forEach((element) => {
        collection.push({
          id: element.id,
          ...element.data(),
        });
      });
      return collection;
    };
    const getElementArrayCollection = (snapshot) => {
      const collection = getArrayCollection(snapshot);
      return collection;
    };

   
    const fetchEspecialidades = async () => {
      const userReference = db.collection("especialidades");
      const snapshot = await userReference.get();
      if (!snapshot.size) return null;
      const listaAreas = getElementArrayCollection(snapshot);
      setAreas(listaAreas);
    };

    useEffect(() => {
      
      fetchEspecialidades();
      
    }, []);
    console.log(areas)
 
    return (
      <>
        {!!user ? (
          <div>
            {user.role == "Psicologo" && <PerfilEspecialista areas={areas} />}

            {user.role == "Paciente" && <PerfilPaciente areas={areas} />}
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