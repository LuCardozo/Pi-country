import './App.css';
import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
//importamos nuestro componentes
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CountryDetail from './components/CountryDetail';
import CreateActivity from './components/CreateActivity';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/:id"  component={CountryDetail} />
      <Route exact path="/create" component={CreateActivity} />
    </BrowserRouter>
  );
}

export default App;
