import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.send('<h1>Book Exchange Index</h1>');
});

export default router;
