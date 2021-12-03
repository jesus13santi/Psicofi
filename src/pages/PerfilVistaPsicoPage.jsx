import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { db } from "../utils/firebaseConfig";
import { UserContext } from "../context/UserContext";
import PerfilVistaPsico from "../components/PerfilVistaPsico/PerfilVistaPsico";
const PerfilVistaPsicoPage = () => {
    const params = useParams();
    const { user } = useContext(UserContext);
    const [paciente, setPaciente] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const fetchPsico = async () => {
      const listaPaciente = db
        .collection("users")
        .doc(params.uid)
        .get()
        .then((user) => {
          const datos = user.data();
          setPaciente(datos);
        });
    };

    useEffect(() => {
    //   fetchPsico();
    }, []);
  
  return <PerfilVistaPsico/> ;
};

export default PerfilVistaPsicoPage;
