import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Testimonios.module.css";
import { db } from "../../utils/firebaseConfig";
import TestimoniosList from "../TestimoniosList/TestimoniosList";
import PulseLoader from "react-spinners/PulseLoader";

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
        setLoading(false);
        
        if (!snapshot.size) return null;
        const testimoniosList = getElementArrayCollection(snapshot);
        setTestimonios(testimoniosList);
        
      };

    
  useEffect(() => {
      getTestimonios();
    }, []);
    

    return (
        
        <div className={styles.container}>
            <div className={styles.boxTestimonios}>
                <h2>Testimonios</h2>
                <div>
                    { loading ? (
                      <div className={styles.pulse}>
                        <PulseLoader color={"#763D80"} loading={true} size={20} css={styles.loading} />
                      </div>
                      ) :
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
