import ReservarCita from "../components/ReservarCita/ReservarCita";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../utils/firebaseConfig";

const ReservarCitaPage = () => {
  const params = useParams();
  const [psicologo, setPsicologo] = useState(null);
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
