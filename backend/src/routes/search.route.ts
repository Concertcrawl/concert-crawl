import { Router } from 'express';
import { searchControl } from "../controllers/search.controller";

const router = Router();

router.route('/s=name=:name?&genre=:genre?&location=:location?&sDate=:sDate?&eDate=:eDate?').get(searchControl)

export default router;