import { Router } from 'express';

import {param} from "express-validator";

const {checkSchema} = require('express-validator')


const router = Router();


router.route('/')
    .post()

export default router;

