import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Routes from "./Routes"
import UserContextProvider from './context/UserContext';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <NavBar />
        <div className="App">
          <Routes />
        </div>
      </Router>
    </UserContextProvider>
  )
}

export default App;
