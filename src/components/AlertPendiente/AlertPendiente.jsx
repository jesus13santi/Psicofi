import styles from "./AlertPendiente.module.css"

function AlertPendiente(){
    return(
        <section className={styles.body}>
            <div className={styles.container}>
                <div className={styles.header}>

                    <h1 className={styles.text}>
                    Le informamos que la verificación de su cuenta a esta actualmente en proceso de revision. </h1>
                
                    <h1 className={styles.text}> Nuestros sistemas no son perfectos y, si la verificación de su cuenta ha tardo mas de lo usual, comuníquese con soporte.</h1>
                    <h1 className={styles.text}>  Agradecemos su comprensión.</h1>
                    <h1 className={styles.text}> Saludos</h1>
                    <h1 className={styles.text}> Equipo de PsicoFi</h1>
                    
                </div>
            </div>
        </section>
    )
}
export default AlertPendiente