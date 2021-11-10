import { useState, useEffect } from "react";
import PsicoList from "../components/PsicoList/PsicoList";
import { db } from "../utils/firebaseConfig";
const PsicologosPage = () => {
  const [psicologos, setPsicologos] = useState([]);
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

  const fetchPsico = async ()=>{
     const userReference = db.collection("users") 
     const snapshot = await userReference.where("role", "==", "doctor").get();
     console.log({snapshot})
     if (!snapshot.size) return null;
     const listaPsico = getElementArrayCollection(snapshot);
     setPsicologos(listaPsico);
     console.log(psicologos)

  }

  useEffect(()=>{
      fetchPsico();
      console.log(psicologos);
  },[])

 
  
  
  
  return (
    <div>
      <div></div>
      <PsicoList psicologos={psicologos} />
    </div>
  );
};

export default PsicologosPage;
