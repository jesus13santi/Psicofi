import { useState, useEffect, useContext, createContext } from "react";
import PatientList from "../components/PatientList/PatientList";
import { db } from "../utils/firebaseConfig";
import Loading from "../components/Loading/Loading";

const PatientsHistoryPage = ({children}) => {

    const [patients, setPatients] = useState([]);
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
  
    const fetchPatients = async () => {
      const userReference = db.collection("users");
      const snapshot = await userReference.where("role", "==", "Paciente").get();
      setLoading(false);
      
      if (!snapshot.size) return null;
      const listPatients = getElementArrayCollection(snapshot);
      setPatients(listPatients);
    };
  
    useEffect(() => {
      fetchPatients();
    }, []);
  
    return (
      <div>
        {isLoading ? <Loading /> :
         <PatientList patients={patients} />}
      </div>
    );
  };
  
  export default PatientsHistoryPage;
  
  