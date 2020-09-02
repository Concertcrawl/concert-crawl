import {connect} from "../database";
import {isLoggedIn} from "../controllers/isLoggedIn.controller";
import {toggleFavoritedBands} from "../controllers/toggleFavoritedBands";
import {Router} from "express";
import {selectConcertsByBand, selectUserFavorites} from "../controllers/favorite.controller";
import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {check} from "express-validator";


export const FavoriteBandRouter = Router();
FavoriteBandRouter.route('/')
  .post(isLoggedIn, asyncValidatorController([check("userFavoritesBandId", "Not a valid UUID.").isUUID()]), toggleFavoritedBands)

export const ShowFavoritedBandRouter = Router();
ShowFavoritedBandRouter.route('/')
.get(isLoggedIn, asyncValidatorController([check("userFavoritesBandId", "Not a valid UUID.").isUUID()]), selectUserFavorites)

export const ShowConcertsByBandRouter = Router();
ShowConcertsByBandRouter.route('/')
    .get(asyncValidatorController([check("bandId", "Not a valid UUID.").isUUID()]), selectConcertsByBand)