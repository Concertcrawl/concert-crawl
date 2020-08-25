import {connect} from "../database";
import {isLoggedIn} from "../controllers/isLoggedIn.controller";
import {toggleSavedConcert} from "../controllers/toggleSavedConcert";
import {Router} from "express";

export const SaveConcertRouter = Router();
SaveConcertRouter.route('/')
    .post(isLoggedIn, toggleSavedConcert)
