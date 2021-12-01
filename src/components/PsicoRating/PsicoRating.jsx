import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./PsicoRating.module.css";
import { UserContext } from "../../context/UserContext";
import { Rating } from 'react-simple-star-rating';
import { db } from "../../utils/firebaseConfig";

const PsicoRating = () => {

    const [ ratingValue, setRatingValue ] = useState(0);
    const { user, setUser } = useContext(UserContext);
    const [ psico, setPsico ] = useState();
    const [ canRate, setCanRate ] = useState(true);
    const params = useParams();
    const id = params.chatId;

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
            user.ratings ++;
            await db.collection("users").doc(psy).update(
                {
                    rating: newRating,
                    ratings: 999
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
