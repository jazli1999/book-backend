import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import Middlewares from '../middlewares.js';

const router = Router();
// default start with /users

// function func() {
//     // ...
// }

// const func = () => {

// }

// Simple User Information:
// create new user
// the router.post is a promise, if the promise resolved, go to .then, if rejected, go to .catch
router.post('/', UserController.createUser);

// user login use email, return id to the frontend
router.post('/login', UserController.loginUser);

// update user information
router.put('/', Middlewares.checkAuthentication, UserController.updateUser);

// get user information
router.get('/', Middlewares.checkAuthentication, UserController.getUserInfo); //get current user info
router.get('/:id', Middlewares.checkAuthentication, UserController.getUserInfo); //get user info according to id

// delete user according to id (need to be modified in the future, security issue)
router.delete('/:id', UserController.deleteUser);

// update booklist collection and wishlist collection
// router.put('/bclist', Middlewares.checkAuthentication, UserController.updateBCList);
router.put('/bclist', Middlewares.checkAuthentication, UserController.updateBCList);
router.put('/wslist', Middlewares.checkAuthentication, UserController.updateWSList);

// Book realted User API
// add to user's book list using isbn
// router.get('')

export default router;
