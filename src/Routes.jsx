import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PsicologosPage from "./pages/PsicologosPage";
import PreciosPage from "./pages/PreciosPage";
import TableroPage from './pages/TableroPage';
import PerfilPaciente from './components/PerfilPaciente/PerfilPaciente'
import Perfil from './components/Perfil/Perfil'
import PerfilEspecialista from './components/PerfilEspecialista/PerfilEspecialista'
import ElectionPage from "./pages/ElectionPage";
import UploadPage from "./pages/UploadPage"
import PerfilPage from "./pages/PerfilPage";
import ReservarCita from "./components/ReservarCita/ReservarCita";

function Routes() {
  return (
    <Switch>
      <Route exact path="/psicologos" component={PsicologosPage}></Route>
      <Route exact path="/register" component={RegisterPage}></Route>
      <Route exact path="/election" component={ElectionPage}></Route>
      <Route exact path="/login" component={LoginPage}></Route>
      <Route exact path="/precio" component={PreciosPage}></Route>
      <Route exact path="/perfilPaciente" component={PerfilPaciente}></Route>
      <Route exact path="/perfilEspecialista" component={PerfilEspecialista}></Route>
      <Route exact path="/perfil" component={PerfilPage}></Route>
      <Route exact path="/deck" component={TableroPage}></Route>
      <Route exact path="/upload" component={UploadPage}></Route>
      <Route exact path="/ReservarCita" component={ReservarCita}></Route>
      <Route exact path="/" component={HomePage}></Route>
      <Route exact path="*">
        <h1>"404: Page not found"</h1>
      </Route>
    </Switch>
  );
}

export default Routes;
