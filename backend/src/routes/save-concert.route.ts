import {connect} from "../database";
import {isLoggedIn} from "../controllers/isLoggedIn.controller";
import {toggleSavedConcert} from "../controllers/toggleSavedConcert";
import {Router} from "express";

const router = Router();
router.route('/')
    .post(isLoggedIn, toggleSavedConcert)

export default router