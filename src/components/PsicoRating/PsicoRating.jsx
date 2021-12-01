import { useState } from "react";
import styles from "./PsicoRating.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Rating } from 'react-simple-star-rating';
import { db } from "../../utils/firebaseConfig";

const PsicoRating = () => {

    const [ ratingValue, setRatingValue ] = useState(0);
    const { user, setUser } = useContext(UserContext);
    const [ canRate, setCanRate ] = useState(true);

    const handleRating = (rate) => {
        setRatingValue(rate);
      }

    const submitRating = () => {
        if (ratingValue > 0 && canRate) {
            alert(user.ratings)
            user.ratings ++
            alert(user.ratings)
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
