import { Router } from 'express';

import {updateFirstName} from "../controllers/userSettings.controller";
import {isLoggedIn} from "../controllers/isLoggedIn.controller";
import {asyncValidatorController} from "../controllers/asyncValidator.controller";
import {firstNameValidator} from "../validators/settings.validator";

const {checkSchema} = require('express-validator')


const router = Router();


router.route('/updateName')
    .post(asyncValidatorController(checkSchema(firstNameValidator)), isLoggedIn, updateFirstName);

export default router;