import {connect} from "../database";
import {isLoggedIn} from "../controllers/isLoggedIn.controller";
import {toggleFavoriteBands} from "../controllers/toggleFavoriteBands.controller";
import Router from "express";

const router = Router();
router.route('/')
  .post(isLoggedIn, toggleFavoriteBands)

export default router