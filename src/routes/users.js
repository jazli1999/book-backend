import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import Middlewares from '../middlewares.js';

// import mongoose from 'mongoose';

const router = Router();
// const User = mongoose.model('User');
// let User = require('../models/user.model');

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
router.get('/', Middlewares.checkAuthentication, UserController.getUserInfo);
router.get('/:id', Middlewares.checkAuthentication, UserController.getUserInfo);

// delete user according to id
router.delete('/:id', UserController.deleteUser);

// Book realted User API
// add to user's book list using isbn
// router.get('')

export default router;
