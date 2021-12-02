import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TestimoniosPage from "./pages/TestimoniosPage";
import PsicologosPage from "./pages/PsicologosPage";
import PreciosPage from "./pages/PreciosPage";
import TableroPage from './pages/TableroPage';
import Perfil from './components/Perfil/Perfil'
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
import ChatsPage from "./pages/ChatsPage";
import ChatPage from "./pages/ChatPage";
import ReservarCitaPage from "./pages/ReservarCitaPage";
import AlertRechazadoPage from "./pages/AlertRechazadoPage";
import AlertPendientePage from "./pages/AlertPendientePage"
import AdminPage from "./pages/AdminPage";
import PrivateRoute from "./components/protectedRoute/PrivateRoute"
import CheckoutPage from "./pages/CheckoutPage";

function Routes() {
  return (
    <Switch>
      <Route exact path="/testimonios" component={TestimoniosPage}></Route>
      <Route exact path="/psicologos" component={PsicologosPage}></Route>
      <Route exact path="/register" component={RegisterPage}></Route>
      <PrivateRoute exact path="/election" component={ElectionPage}></PrivateRoute>
      <Route exact path="/login" component={LoginPage}></Route>
      <Route exact path="/precio" component={PreciosPage}></Route>
      {/* <exact path="/perfilPaciente" component={PerfilPaciente}></exact> */}
      {/* <Route
        exact
        path="/perfilEspecialista"
        component={PerfilEspecialista}
      ></Route> */}
      <Route
        exact
        path="/profile/:uid"
        component={PerfilVistaPacientePage}
      ></Route>
      <Route
        exact
        path="/profilePsico/:uid"
        component={PerfilVistaPsicoPage}
      ></Route>
      <PrivateRoute exact path="/perfil" component={Perfil}></PrivateRoute>
      <PrivateRoute exact path="/deck" component={TableroPage}></PrivateRoute>
      <PrivateRoute exact path="/upload" component={UploadPage}></PrivateRoute>
      <PrivateRoute exact path="/history" component={HistoriaPage}></PrivateRoute>
      <PrivateRoute exact path="/historiaPacientes" component={PatientsHistoryPage}></PrivateRoute>
      <Route exact path="/historiaPacienteIndividual/:uid" component={IndividualPatientPage}></Route>
      <PrivateRoute exact path="/chats" component={ChatsPage}></PrivateRoute>
      <PrivateRoute exact path="/chat/:chatId" component={ChatPage}></PrivateRoute>
      <PrivateRoute exact path="/reservarCita/:uid" component={ReservarCitaPage}></PrivateRoute>
      <Route exact path="/" component={HomePage}></Route>
      <PrivateRoute exact path="/rechazado" component={AlertRechazadoPage}></PrivateRoute>
      <PrivateRoute exact path="/pendiente" component={AlertPendientePage}></PrivateRoute>
      <PrivateRoute exact path="/admin" component={AdminPage}></PrivateRoute>
     
      <Route exact path="/checkout" component={CheckoutPage}></Route>
      <Route exact path="*" component={PageNotFound}></Route>
    </Switch>
  );
}

export default Routes;
