import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './LoginForm.module.css';

import { auth, googleProvider } from '../../utils/firebaseConfig';
import { UserContext } from '../../context/UserContext';
import { useState } from 'react';

function LoginForm() {
  //const { setUser } = useContext(UserContext);
  const history = useHistory();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleOnChange = (event) => {
    const { value, name: inputName } = event.target;
    console.log({ inputName, value });
    setValues({ ...values, [inputName]: value });
  };
  
  const handleGoogleLogin = async () => {
    await auth.signInWithPopup(googleProvider);
    history.push('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth.signInWithEmailAndPassword(values.email, values.password);
    history.push('/');
  };

  return (
      <>

        <div className={styles.container}>
            
        </div>

        <div className={styles.container}>
          <form onSubmit={handleSubmit}>

            <div>
            <h1>Bienvenido de vuelta</h1>
            </div>
            <div>
            <span>Inicia sesión con...</span>
            </div>

            <div className={styles.image}>
            <img
            src="GoogleIcon.png"
            alt="Google Login"
            width="57" height="58"
            onClick={handleGoogleLogin}
            />

            <img
            src="FacebookIcon.png"
            alt="Facebook Login"
            width="66" height="66"
            onClick={handleGoogleLogin}
            />

            <img
            src="TwitterIcon.png"
            alt="Twitter Login"
            width="63" height="51"
            onClick={handleGoogleLogin}
            />
            </div>

            <div>
            <span>O utiliza tu correo electrónico:</span>
            </div>

            <div className={styles.inputGroup}>
              <input
                name="email"
                id="email"
                type="email"
                placeholder="Nombre de usuario o correo electrónico"
                value={values.email}
                onChange={handleOnChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="Contraseña"
                value={values.password}
                onChange={handleOnChange}
              />
            </div>

            <button type="submit" onClick={handleSubmit}>
              Iniciar Sesión
            </button>
          </form>
          
        </div>
    </>
  );
}

export default LoginForm;