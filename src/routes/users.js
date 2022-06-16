import { Router } from 'express';
import {
    createUser, loginUser, updateUser, getUserInfo, deleteUser,
} from '../controllers/user.controller.js';

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
router.post('/', createUser);

// user login use email, return id to the frontend
router.post('/login', loginUser);

// update user information
router.put('/:id', updateUser);

// get user information
router.get('/:id', getUserInfo);

// delete user according to id
router.delete('/:id', deleteUser);

// Book realted User API
// add to user's book list using isbn
// router.get('')

export default router;
