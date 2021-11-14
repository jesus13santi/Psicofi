import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { UserContext } from "./context/UserContext";
import Routes from "./Routes"
import UserContextProvider from './context/UserContext';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <NavBar />
        <div className="container">
          <Routes />
        </div>
      </Router>
    </UserContextProvider>
  )
}

export default App;
