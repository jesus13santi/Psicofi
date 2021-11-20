import React from 'react'
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
            <a href="https://www.facebook.com/psicofi.therapy">
              <img src={logoFacebook} alt="" />
            </a>
            <img src={logoInstagram} alt="" />
            <img src={logoMail} alt="" />
            <img src={logoWhat} alt="" />
            <img src={logoTwitter} alt="" />
          </div>
        </footer>
    )
}

export default Footer
