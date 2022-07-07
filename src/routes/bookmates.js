import { Router } from 'express';
import BookmateController from '../controllers/bookmate.controller.js';
import Middlewares from '../middlewares.js';

const router = Router();

router.get('/', Middlewares.checkAuthentication, BookmateController.matchBookmates);

export default router;
