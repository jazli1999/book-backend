import { Router } from 'express';
// import mongoose from 'mongoose';
import BookController from '../controllers/book.controller.js';

const router = Router();

router.get('/gbooks', (req, res) => {
    console.log(req.body);
    res.send(200);
});
// get data from google
router.get('/gbooks/:query', BookController.searchGbooks);

export default router;
