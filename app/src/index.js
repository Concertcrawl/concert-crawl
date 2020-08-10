import React from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import { FourOhFour } from "./pages/FourOhFour";
import { Home } from "./pages/Home";
import { NavBar } from './pages/NavBar'
import { Footer } from './pages/Footer'
import { PrivacyPage } from './pages/PrivacyPage'
import { ContactUs } from './pages/ContactUs'
import { RegisterUser } from './pages/RegisterUser'
import { SavedConcerts } from './pages/SavedConcerts'
import { FavoritedBand } from './pages/FavoriteBand'

const Routing = () => (
  <>
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/register" component={RegisterUser}/>
        <Route path="/privacy-page" component={PrivacyPage}/>
        <Route path="/contact-us" component={ContactUs}/>
        <Route path="/saved-concerts" component={SavedConcerts}/>
        <Route path="/test" component={FavoritedBand}/>
        <Route component={FourOhFour}/>
      </Switch>
      <Footer/>
    </BrowserRouter>
  </>
);
ReactDOM.render(<Routing/>, document.querySelector('#root'));