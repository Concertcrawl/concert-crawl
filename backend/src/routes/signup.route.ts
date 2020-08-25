import { Router } from 'express';

import {param} from "express-validator";
import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {signupValidator} from "../validators/signup.validator";
import {signupUserController} from "../controllers/sign-up.controller";
import {activationController} from "../controllers/activation.controller";

const {checkSchema} = require('express-validator')


const router = Router();


router.route('/')
    .post(asyncValidatorController(checkSchema(signupValidator)), signupUserController);
router.route('/activation/:activation').get(asyncValidatorController([param("activation", "invalid activation link").isHexadecimal().notEmpty()]), activationController)


export default router;

