import React from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import {FourOhFour} from "./pages/FourOhFour";
import {Home} from "./pages/Home";
import { NavBar } from './pages/NavBar'
import { Footer } from './pages/Footer'
import { PersonalSettings } from './pages/PersonalSettings'


const Routing = () => (
  <>
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/personalsettings" component={PersonalSettings}/>
        <Route component={FourOhFour}/>
      </Switch>
    </BrowserRouter>
    <Footer/>
  </>
);
ReactDOM.render(<Routing/>, document.querySelector('#root'));