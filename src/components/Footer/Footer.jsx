import logoInstagram from "../../img/icons_instagram.png";
import logoFacebook from "../../img/icons_facebook.png";
import logoTwitter from "../../img/icons_twitter.png";
import logoMail from "../../img/icons_mail.png";
import logoWhat from "../../img/icons_whatsapp.png";
import styles from "./Footer.module.css"

const Footer = () => {
    return (
        <footer className={styles.footer}>
          <p>
            Aviso de privacidad | Términos y Condiciones © 2021 PsicoFi. Todos
            los derechos reservados.
          </p>
          <div className={styles.logoSocialNetwork}>
            <a href="https://www.facebook.com/psicofi.therapy" target="_blank">
              <img src={logoFacebook} alt="" />
            </a>
            <a href="https://instagram.com/psicofi?utm_medium=copy_link" target="_blank">
              <img src={logoInstagram} alt="" />
            </a>
            <a href="mailto:psicofi.therapy@gmail.com" target="_blank">
              <img src={logoMail} alt="" />
            </a>
            <a href="sms:+58412-825-7833" target="_blank">
              <img src={logoWhat} alt="" />
            </a>
            <a href="https://twitter.com/psico_fi?s=21" target="_blank">
              <img src={logoTwitter} alt="" />
            </a>
          </div>
        </footer>
    )
}

export default Footer
