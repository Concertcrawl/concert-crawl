import React from 'react';
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';
import reducer from "./store"
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
import { UserFavorites } from './pages/UserFavorites'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

const store = configureStore({reducer})

const Routing = (store) => (
  <>
    <Provider store={store}>
      <BrowserRouter>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/register" component={RegisterUser}/>
          <Route path="/privacy-page" component={PrivacyPage}/>
          <Route path="/contact-us" component={ContactUs}/>
          <Route path="/saved-concerts" component={SavedConcerts}/>
          <Route path="/user-favorites" component={UserFavorites}/>
          <Route component={FourOhFour}/>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </Provider>
  </>
);
ReactDOM.render(Routing(store), document.querySelector('#root'));