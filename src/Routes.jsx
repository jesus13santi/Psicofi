import React from 'react'
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import PsicologosPage from './pages/PsicologosPage';
function Routes(){
    return (
      <Switch>
        <Route exact path="/psicologos" component={PsicologosPage}></Route>
        <Route exact path="/register" component={RegisterPage}></Route>
        <Route exact path="/login" component={LoginPage}></Route>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="*">
          <h1>"404: Page not found"</h1>
        </Route>
      </Switch>
    );
}

export default Routes;