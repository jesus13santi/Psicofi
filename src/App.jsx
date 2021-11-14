import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { UserContext } from "./context/UserContext";
import Routes from "./Routes"
function App() {
  return (
    <UserContext.Provider
    value={UserContext}>
      <Router>
        <NavBar/>
        <div className="container">
          <Routes/>
        </div>
    
      </Router>
    </UserContext.Provider>
  )
}

export default App;
