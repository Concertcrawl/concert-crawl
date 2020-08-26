import {connect} from "../database";
import {isLoggedIn} from "../controllers/isLoggedIn.controller";
import {toggleSavedConcert} from "../controllers/toggleSavedConcert";
import {Router} from "express";
import {viewUserSavedConcerts} from "../controllers/saved-concerts.controller";

export const SaveConcertRouter = Router();
SaveConcertRouter.route('/')
    .post(isLoggedIn, toggleSavedConcert)

export const ShowSavedConcertRouter = Router ();
ShowSavedConcertRouter.route('/')
    .post(isLoggedIn, viewUserSavedConcerts)

