import {connect} from "../database";
import {isLoggedIn} from "../controllers/isLoggedIn.controller";
import {toggleFavoritedBands} from "../controllers/toggleFavoritedBands";
import {Router} from "express";

export const FavoriteBandRouter = Router();
FavoriteBandRouter.route('/')
  .post(isLoggedIn, toggleFavoritedBands)