import { auth, googleProvider } from '../../utils/firebaseConfig';
import { useHistory } from 'react-router-dom';


function LoginForm () {

    const history = useHistory();

    // GOOGLE AUTH
    const handleGoogleLogin = async () => {
        console.log('Google Login Init');
        const response = await auth.signInWithPopup(googleProvider);
        console.log({response: response.user});
        history.push('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login Password');
    };

    return (
    <div>
        <h1>
            "Login with Google test"
        </h1>
    </div>
    )
}