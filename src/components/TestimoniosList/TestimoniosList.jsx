import styles from "./TestimoniosList.module.css"
const TestimoniosList = ({testimonios}) => {

    return (
        <div className={styles.container}>

        { testimonios.length > 0 && (
            testimonios.map((testimonio) => (
                <div className={styles.testimony}>
                    <p className={styles.text}>{testimonio.testimonio}</p>
                    <p className={styles.by}>- {testimonio.nombre}, {testimonio.pais}</p>
                </div>
            ))
        )}
    </div>
    )
}

export default TestimoniosList;