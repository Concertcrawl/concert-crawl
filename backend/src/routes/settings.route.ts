import { Router } from 'express';

import {updateFirstName, updatePassword} from "../controllers/userSettings.controller";
import {isLoggedIn} from "../controllers/isLoggedIn.controller";
import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {firstNameValidator, passwordValidator} from "../validators/settings.validator";

const {checkSchema} = require('express-validator')


const router = Router();


router.route('/updateName')
    .post(asyncValidatorController(checkSchema(firstNameValidator)), isLoggedIn, updateFirstName);

router.route('/updatePassword')
    .post(asyncValidatorController(checkSchema(passwordValidator)), isLoggedIn, updatePassword)

export default router;