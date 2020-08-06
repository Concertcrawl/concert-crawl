import React from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import {FourOhFour} from "./pages/FourOhFour";
import {Home} from "./pages/Home";
import { NavBar } from './pages/NavBar'
import { Footer } from './pages/Footer'
import { PrivacyPage } from './pages/PrivacyPage'
import { ContactUs } from './pages/ContactUs'
import { RegisterUser } from './pages/RegisterUser'
import { SavedResults } from './pages/SavedResults'
import { ConcertInfoModal} from './pages/ConcertInfoModal'

const Routing = () => (
  <>
    <BrowserRouter>
      <NavBar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/register" component={RegisterUser}/>
        <Route path="/privacy-page" component={PrivacyPage}/>
        <Route path="/contact-us" component={ContactUs}/>
        <Route path="/SavedResults" component={SavedResults}/>
        <Route path="/ConcertInfoModal" component={ConcertInfoModal}/>
        <Route component={FourOhFour}/>
      </Switch>
      <Footer/>
    </BrowserRouter>
  </>
);
ReactDOM.render(<Routing/>, document.querySelector('#root'));