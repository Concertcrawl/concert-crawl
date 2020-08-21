import { Router } from 'express';
import { searchControl } from "../controllers/search.controller";

const router = Router();

router.route('/').get(searchControl)

export default router;