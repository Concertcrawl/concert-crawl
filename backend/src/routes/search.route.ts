import { Router } from 'express';
import { searchControl } from "../controllers/search.controller";

const router = Router();

router.route('/')
    .post(searchControl)

export default router;