import Admin from "../components/Admin/Admin"
import { db } from "../utils/firebaseConfig";
import { useState, useEffect } from "react";


const AdminPage = () => {
    const [pendientes, setPendientes] = useState([]);
    const [rechazados, setRechazados] = useState([]);
  
  
  const [isLoading, setLoading] = useState(true);
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

  const fetchPendiente = async () => {
    const userReference = db.collection("users");
    const snapshot = await userReference.where("role", "==", "Pendiente").get();
    
    if (!snapshot.size) return null;
    const listaPendiente = getElementArrayCollection(snapshot);
    setPendientes(listaPendiente);
    
  };

  const fetchRechazado = async () => {
    const userReference = db.collection("users");
    const snapshot = await userReference.where("role", "==", "Rechazado").get();
    
    if (!snapshot.size) return null;
    const listaRechazado = getElementArrayCollection(snapshot);
    setRechazados(listaRechazado);
    
  };

  useEffect(() => {
    fetchPendiente();
    fetchRechazado();
    setLoading(false);
  }, []);

  return (
    <div>
      {isLoading ? <h1>Cargando...</h1> :
       <Admin pendientes={pendientes} Admin rechazados={rechazados} />}
    </div>
  );
}

export default AdminPage
