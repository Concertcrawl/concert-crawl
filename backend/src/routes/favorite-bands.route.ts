import {connect} from "../database";
import {isLoggedIn} from "../controllers/isLoggedIn.controller";
import {toggleFavoritedBands} from "../controllers/toggleFavoritedBands";
import Router from "express";

const router = Router();
router.route('/')
  .post(isLoggedIn, toggleFavoritedBands)

export default router