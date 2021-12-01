import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./PsicoRating.module.css";
import { UserContext } from "../../context/UserContext";
import { Rating } from 'react-simple-star-rating';
import { db } from "../../utils/firebaseConfig";

const PsicoRating = () => {

    const [ ratingValue, setRatingValue ] = useState(0);
    const [ ratings, setRatings ] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const [ psico, setPsico ] = useState();
    const [ canRate, setCanRate ] = useState(true);
    const params = useParams();
    const id = params.chatId;

    const getPsy = (psy) => {
        console.log('docs!')
        db.collection("users").doc(psy).update((doc)=> {
                const data = doc.data()
                setRatings(data.rating)
            })
        }

    const handleRating = (rate) => {
        setRatingValue(rate/20);
        console.log(ratingValue);
      }

    const submitRating = async () => {

        const cita = user.appointments.find(
            (element) => element.id == id
        );
        const psy = cita.uid; // ID del psicologo
        if (ratingValue > 0 && canRate) {
            const newRating = ratingValue;
            const temp = await db.collection("users").doc(psy).get();
            const p = temp.data();
            const q = p.rating;
            const aux = [...q];
            console.log(aux);
            aux.push(newRating);
            console.log(aux);
            await db.collection("users").doc(psy).update(
                {
                    rating: aux
                }
            )
            closeRating();
        }
    }

    const closeRating = () => {
        setCanRate(false);
    }

    return (
        <>
            {canRate ? (
                <div className={styles.container}>
                    <h3>Califica a tu Psicólogo</h3>
                    <p>Cuéntanos qué tal tu cita:</p>
                    <div>
                        <Rating
                        transition
                        onClick={handleRating}
                        ratingValue={ratingValue}
                        fillColor={"522B59"}
                        className={styles.rting}
                        />
                    </div>
                    <button
                    className={styles.button}
                    onClick={submitRating}
                    type="button">
                    Calificar
                    </button>
                    <button type="button" className={styles.close} onClick={closeRating}>
                    </button>
                </div>
            ) : (
                <>
                </>
            )}
        </>
    )
}

export default PsicoRating;
