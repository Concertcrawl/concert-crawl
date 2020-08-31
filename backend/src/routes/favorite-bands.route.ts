import {connect} from "../database";
import {isLoggedIn} from "../controllers/isLoggedIn.controller";
import {toggleFavoritedBands} from "../controllers/toggleFavoritedBands";
import {Router} from "express";
import {selectUserFavorites} from "../controllers/favorite.controller";
import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {check} from "express-validator";


export const FavoriteBandRouter = Router();
FavoriteBandRouter.route('/')
  .post(isLoggedIn, asyncValidatorController([check("userFavoritesBandId", "Not a valid UUID.").isUUID()]), toggleFavoritedBands)

export const ShowFavoritedBandRouter = Router();
ShowFavoritedBandRouter.route('/')
.get(isLoggedIn, selectUserFavorites)