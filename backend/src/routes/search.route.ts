import { Router } from 'express';
import { searchControl } from "../controllers/search.controller";
import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {searchValidator} from "../validators/search.validator";

const {checkSchema} = require("express-validator")

const router = Router();

router.route('/page=:page&name=:name?&genre=:genre?&lat=:lat?&long=:long?&sDate=:sDate?&eDate=:eDate?')
    .get(asyncValidatorController(checkSchema(searchValidator)),searchControl)

export default router;