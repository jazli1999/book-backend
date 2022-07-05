import { Router } from 'express';
// import mongoose from 'mongoose';
import BookController from '../controllers/book.controller.js';
import Middlewares from '../middlewares.js';


const router = Router();

//default route "/books"
// get data from google
router.get('/gbooks/:query', BookController.searchGbooks);

// frontend send the books list to backend to store
// router.put('/add', Middlewares.checkAuthentication, BookController.addBooks);


// no delete for our books database
export default router;
