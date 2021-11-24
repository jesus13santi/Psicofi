import React from "react";
import ReservarCita from "../components/ReservarCita/ReservarCita";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { db } from "../utils/firebaseConfig";

const ReservarCitaPage = () => {
  const params = useParams();
//   const { user } = useContext(UserContext);
  const [psicologo, setPsicologo] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const fetchPsico = async () => {
    const listaPsico = db
      .collection("users")
      .doc(params.uid)
      .get()
      .then((user) => {
        const datos = user.data();
        setPsicologo(datos);
      });
  };

  useEffect(() => {
    fetchPsico();
  }, []);
  
  return <ReservarCita psicologo={psicologo}  />;
};

export default ReservarCitaPage;
