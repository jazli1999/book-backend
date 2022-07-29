import { Router } from 'express';
// import mongoose from 'mongoose';
import BookController from '../controllers/book.controller.js';
import Middlewares from '../middlewares.js';

const router = Router();

router.get('/gbooks/details/:isbn', Middlewares.checkAuthentication, BookController.getBookDetails);

// get data from google
router.get('/gbooks/:query', BookController.searchGbooks);

router.get('/gbooks/owners/:isbn', BookController.getBookOwners);

// frontend send the books list to backend to store, only add new books
router.post('/bcadd', Middlewares.checkAuthentication, BookController.addBCBooks);
router.post('/wsadd', Middlewares.checkAuthentication, BookController.addWSBooks);

// no delete for our books database
export default router;
