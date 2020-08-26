import {connect} from "../database";
import {isLoggedIn} from "../controllers/isLoggedIn.controller";
import {toggleFavoritedBands} from "../controllers/toggleFavoritedBands";
import {Router} from "express";
import {selectUserFavorites} from "../controllers/favorite.controller";


export const FavoriteBandRouter = Router();
FavoriteBandRouter.route('/')
  .post(isLoggedIn, toggleFavoritedBands)

export const ShowFavoritedBandRouter = Router();
ShowFavoritedBandRouter.route('/')
.post(isLoggedIn, selectUserFavorites)