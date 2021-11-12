import { useState, useEffect,useContext,createContext } from "react";
import PsicoList from "../components/PsicoList/PsicoList";
import { db } from "../utils/firebaseConfig";


const PsicologosPage = ({children}) => {
  const [psicologos, setPsicologos] = useState([]);
  
  
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

  const fetchPsico = async () => {
    const userReference = db.collection("users");
    const snapshot = await userReference.where("role", "==", "doctor").get();
    
    if (!snapshot.size) return null;
    const listaPsico = getElementArrayCollection(snapshot);
    setPsicologos(listaPsico);
    
  };

  useEffect(() => {
    fetchPsico();
    setLoading(false);
  }, []);

  return (
    <div>
      {isLoading ? <h1>Cargando...</h1> :
       <PsicoList psicologos={psicologos} />}
    </div>
  );
};

export default PsicologosPage;

