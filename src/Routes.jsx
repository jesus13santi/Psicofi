import React from 'react'
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
function Routes(){
    return (
      <Switch>
        <Route exact path="/register" component={RegisterPage}></Route>
        <Route exact path="/login" component={LoginPage}></Route>
        <Route exact path="/" component={HomePage}></Route>
      </Switch>
    );
}

export default Routes;