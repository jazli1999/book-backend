import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import Middlewares from '../middlewares.js';

const router = Router();

router.put('/', Middlewares.checkAuthentication, UserController.updateUser);
router.get('/', Middlewares.checkAuthentication, UserController.getUserInfo); 
router.get('/:id', Middlewares.checkAuthentication, UserController.getUserInfo); 
router.delete('/:id', UserController.deleteUser);

// update booklist collection and wishlist collection
router.put('/bclist', Middlewares.checkAuthentication, UserController.updateBCList);
router.put('/wslist', Middlewares.checkAuthentication, UserController.updateWSList);

router.get('/readlist/bc', Middlewares.checkAuthentication, UserController.readBCList);
router.get('/readlist/ws', Middlewares.checkAuthentication, UserController.readWSList);

export default router;
