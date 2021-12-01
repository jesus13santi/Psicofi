import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Testimonios.module.css";
import { db } from "../../utils/firebaseConfig";
import TestimoniosList from "../TestimoniosList/TestimoniosList";

const Testimonios = () => {

    const history = useHistory()
    const handleLogin = () => {
      history.push("/login");
    };

    const [ testimonios, setTestimonios ] = useState([]);
    const [ loading, setLoading ] = useState(true);

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

    const getTestimonios = async () => {
        const userReference = db.collection("testimonios");
        const snapshot = await userReference.get();
        
        if (!snapshot.size) return null;
        const testimoniosList = getElementArrayCollection(snapshot);
        setTestimonios(testimoniosList);
        
      };

    
  useEffect(() => {
      getTestimonios();
      setLoading(false);
    }, []);
    

    return (
        
        <div className={styles.container}>
            <div className={styles.boxTestimonios}>
                <h2>Testimonios</h2>
                <div>
                    { loading ? <h1>Cargando</h1> :
                        <TestimoniosList testimonios={testimonios} />
                        }
                </div>

                <button
                type="button"
                className={styles.button}
                onClick={handleLogin}
                >
                Comenzar
                </button>
            </div>
            
        </div>
    );    
};  

export default Testimonios;
