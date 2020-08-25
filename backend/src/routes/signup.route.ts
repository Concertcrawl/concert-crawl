import { Router } from 'express';

import {param} from "express-validator";
// import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {signupValidator} from "../validators/signup.validator";
import {signupUserController} from "../controllers/sign-up.controller";

const {checkSchema} = require('express-validator')


const router = Router();


router.route('/')
    .post(checkSchema(signupValidator), signupUserController);

export default router;

