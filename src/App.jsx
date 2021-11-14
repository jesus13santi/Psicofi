import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import UserContextProvider from "./context/UserContex";
import Routes from "./Routes";
function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes />
      </div>
    </Router>
  );
}

export default App;
