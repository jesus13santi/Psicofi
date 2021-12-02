import { useState, useEffect,useContext,createContext } from "react";
import PsicoList from "../components/PsicoList/PsicoList";
import { db } from "../utils/firebaseConfig";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Loading/Loading";


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
    const snapshot = await userReference.where("role", "==", "Psicologo").get();
    setLoading(false);
    
    if (!snapshot.size) return null;
    const listaPsico = getElementArrayCollection(snapshot);
    setPsicologos(listaPsico);
    
  };

  useEffect(() => {
    fetchPsico();
  }, []);

  return (
    <div>
      {isLoading ? <Loading /> :
      <div> 
        <PsicoList psicologos={psicologos}/>
      </div>
      }
    </div>
  );
};

export default PsicologosPage;

