import {connect} from "../database";
import {isLoggedIn} from "../controllers/isLoggedIn.controller";
import {toggleSavedConcert} from "../controllers/toggleSavedConcert";
import {Router} from "express";
import {viewUserSavedConcerts} from "../controllers/savedConcerts.controller"
import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {check} from "express-validator";

export const SaveConcertRouter = Router();
SaveConcertRouter.route('/')
    .post(isLoggedIn, asyncValidatorController([check("userConcertsConcertId", "Not a valid UUID.").isUUID()]), toggleSavedConcert)

export const ShowSavedConcertRouter = Router ();
ShowSavedConcertRouter.route('/')
    .get(isLoggedIn, viewUserSavedConcerts)

