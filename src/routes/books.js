import { Router } from 'express';
// import mongoose from 'mongoose';
import { searchGbooks } from '../controllers/book.controller.js';

const router = Router();

// get data from google
router.get('/gbooks/:query', searchGbooks);

export default router;
