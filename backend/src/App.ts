import express, { Application } from 'express'
import morgan from 'morgan'
// Routes
import { indexRoutes } from './routes/index.route'
import SearchRoute from './routes/search.route'
import SignUpRoute from './routes/signup.route'
import SettingsRoute from "./routes/settings.route"
import {SignInRouter} from "./routes/sign-in.route";
import {passportMiddleware} from "./lib/auth.controller";
import {SignOutRoute} from "./routes/sign-out.route";
import {SaveConcertRouter} from "./routes/save-concert.route"
import {FavoriteBandRouter} from "./routes/favorite-bands.route"
import {ShowFavoritedBandRouter, ShowConcertsByBandRouter} from "./routes/favorite-bands.route";
import {ShowSavedConcertRouter} from "./routes/save-concert.route";

const session = require("express-session");
import passport = require('passport');
const MemoryStore = require('memorystore')(session);



// The following class creates the app and instantiates the server
export class App {
  app: Application;

  constructor (
    private port?: number | string
  ) {
    passportMiddleware; // eslint-disable-line
    this.app = express()
    this.settings()
    this.middlewares()
    this.routes()
  }

  // private method that sets the port for the sever, to one from index.route.ts, and external .env file or defaults to 3000
  public settings () {
    this.app.set('port', this.port || process.env.PORT || 3000)
  }

  // private method to setting up the middleware to handle json responses, one for dev and one for prod
  private middlewares () {

    const sessionConfig  =  {
      store: new MemoryStore({
        checkPeriod: 10800
      }),
      secret:"secret",
      saveUninitialized: true,
      resave: true,
      maxAge: "3h"
    };

    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(session(sessionConfig));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  // private method for setting up routes in their basic sense (ie. any route that performs an action on profiles starts with /profiles)
  private routes () {
    this.app.use('/apis/search', SearchRoute)
    this.app.use('/apis', indexRoutes)
    this.app.use('/apis/sign-up', SignUpRoute)
    this.app.use('/apis/sign-in', SignInRouter)
    this.app.use('/apis/sign-out', SignOutRoute)
    this.app.use('/apis/save-concert', SaveConcertRouter)
    this.app.use('/apis/favorite-band', FavoriteBandRouter)
    this.app.use('/apis/settings', SettingsRoute)
    this.app.use('/apis/user-bands', ShowFavoritedBandRouter)
    this.app.use('/apis/user-concerts', ShowSavedConcertRouter)
    this.app.use('/apis/concert-bands', ShowConcertsByBandRouter)
  }

  // starts the server and tells the terminal to post a message that the server is running and on what port
  public async listen (): Promise<void> {
    await this.app.listen(this.app.get('port'))
    console.log('Express application built successfully')
  }
}
