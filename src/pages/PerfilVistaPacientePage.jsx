import React from "react";
import PerfilVistaPaciente from "../components/PerfilVistaPaciente/PerfilVistaPaciente";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { db } from "../utils/firebaseConfig";
import { UserContext } from "../context/UserContext";
const PerfilVistaPacientePage = () => {
  const params = useParams();
  const {user}= useContext(UserContext)
  const [psicologo, setPsicologo] = useState(null);
  const [isLoading, setLoading] = useState(true);
  
 

  const fetchPsico = async () => {
    const listaPsico= db.collection("users")
      .doc(params.uid)
      .get()
      .then((user) => {
        const datos = user.data();
        setPsicologo(datos)
      });
  };
  

  useEffect(() => {
    fetchPsico()
      
  }, []);
  
  return (
    <>
      {!!psicologo ? (
          <PerfilVistaPaciente
            id={params.uid}
            name={psicologo.name}
            birthday={psicologo.birthday}
            pais={psicologo.pais}
            description={psicologo.description}
            photo={psicologo.photo}
          />
      ) : (
        <h1>Is Loading...</h1>
      )}
    </>
  );
};

export default PerfilVistaPacientePage;
