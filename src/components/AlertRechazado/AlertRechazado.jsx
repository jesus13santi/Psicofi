import styles from "./AlertRechazado.module.css"

function AlertRechazado(){


    return(
        <section className={styles.body}>
            <div className={styles.container}>
                <div className={styles.header}>

                    <h1 className={styles.text}>
                    Lamentamos informarle que la verificación de su cuenta a dado negativa. A veces nos
                    vemos obligados a tomar decisiones difíciles en la medida que disponemos de nueva información. </h1>
                
                    <h1 className={styles.text}> Nuestros sistemas no son perfectos y, si cree que hemos cometido un error, comuníquese con soporte.</h1>
                    <h1 className={styles.text}>  Agradecemos su comprensión.</h1>
                    <h1 className={styles.text}> Saludos</h1>
                    <h1 className={styles.text}> Equipo de PsicoFi</h1>
                    <a href="mailto:psicofi.therapy@gmail.com" target="_blank" className={styles.link}>
                  Click aquí para contactarte con nosotros
                    </a>
                    
                </div>
            </div>
        </section>
    )
}
export default AlertRechazado