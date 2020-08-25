import {connect} from "../database";
import {isLoggedIn} from "../controllers/isLoggedIn.controller";
import {Router} from "express";

const router = Router();
router.route('/')
.post(isLoggedIn, toggleSavedConcerts)
export default router