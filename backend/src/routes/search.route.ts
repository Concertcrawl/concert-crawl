import { Router } from 'express';
import { searchControl } from "../controllers/search.controller";
import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {searchValidator} from "../validators/search.validator";

const {checkSchema} = require("express-validator")

const router = Router();

router.route('/')
    .post(asyncValidatorController(checkSchema(searchValidator)),searchControl)

export default router;