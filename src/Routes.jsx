import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PsicologosPage from "./pages/PsicologosPage";
import PreciosPage from "./pages/PreciosPage";
import TableroPage from './pages/TableroPage';
import PerfilPaciente from './components/PerfilPaciente/PerfilPaciente'
import PerfilEspecialista from './components/PerfilEspecialista/PerfilEspecialista'
import ElectionPage from "./pages/ElectionPage";
import UploadPage from "./pages/UploadPage";
import PerfilPage from "./pages/PerfilPage";
import PerfilVistaPacientePage from "./pages/PerfilVistaPacientePage";
import PerfilVistaPsicoPage from "./pages/PerfilVistaPsicoPage";
import HistoriaPage from "./pages/HistoriaPage";
import PatientsHistoryPage from "./pages/PatientsHistoryPage";
import IndividualPatientPage from "./pages/IndividualPatientPage";
import PageNotFound from "./pages/PageNotFound";

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
      <Route exact path="/profile/:uid" component={PerfilVistaPacientePage}></Route>
      <Route exact path="/profilePsico/:uid" component={PerfilVistaPsicoPage}></Route>
      <Route exact path="/perfil" component={PerfilPage}></Route>
      <Route exact path="/deck" component={TableroPage}></Route>
      <Route exact path="/upload" component={UploadPage}></Route>
      <Route exact path="/history" component={HistoriaPage}></Route>
      <Route exact path="/historiaPacientes" component={PatientsHistoryPage}></Route>
      <Route exact path="/historiaPacienteIndividual/:uid" component={IndividualPatientPage}></Route>
      <Route exact path="/" component={HomePage}></Route>
      <Route exact path="*" component={PageNotFound}></Route>
    </Switch>
  );
}

export default Routes;
