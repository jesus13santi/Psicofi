import { useState, useEffect,useContext,createContext } from "react";
import PsicoList from "../components/PsicoList/PsicoList";
import { db } from "../utils/firebaseConfig";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Loading/Loading";


const PsicologosPage = ({children}) => {
  const [psicologos, setPsicologos] = useState([]);
  const [areas, setAreas]=useState([])
  
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
    const snapshot = await userReference.where("role", "==", "Psicologo").get();
    if (!snapshot.size) return null;
    const listaPsico = getElementArrayCollection(snapshot);
    setPsicologos(listaPsico);
    
  };
  const fetchEspecialidades = async () => {
    const userReference = db.collection("especialidades");
    const snapshot = await userReference.get();
    if (!snapshot.size) return null;
    const listaAreas = getElementArrayCollection(snapshot);
    setAreas(listaAreas);
  };

  useEffect(() => {
    fetchPsico();
    fetchEspecialidades();
    setLoading(false);
  }, []);
 
  return (
    <div>
      {isLoading ? <Loading /> :
       <PsicoList psicologos={psicologos} areas={areas} />}
    </div>
  );
};

export default PsicologosPage;

