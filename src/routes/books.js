import { Router } from 'express';
// import mongoose from 'mongoose';
import BookController from '../controllers/book.controller.js';
import Middlewares from '../middlewares.js';


const router = Router();

// router.get('/gbooks', (req, res) => {
//     console.log(req.body);
//     res.send(200);
// });

//default route "/books"

// get data from google
router.get('/gbooks/:query', BookController.searchGbooks);

// frontend send the books list to backend to store
// router.put('/add', Middlewares.checkAuthentication, BookController.addBooks);


// no delete for our books database

export default router;
