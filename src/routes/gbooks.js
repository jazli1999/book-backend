// This file is no use for the project, just is a "syntax reference for me"
// Will be delete in the future

import { Router } from 'express';
import { createHash } from 'crypto';

const router = Router();

/* GET home page. */
router.get('/:title/:greeting', (req, res) => {
    // get('/')
    // gbooks?title=free
    // const title = req.query.title; // "title" is from the index.jade
    // res.render('index', { title });

    // get('/:title/:greeting')
    const { title } = req.params;
    const { greeting } = req.params;
    res.render('index', { title, greeting });
});

// return json file
router.get('/time', (req, res) => {
    res.json({
        time: new Date().toISOString(),
    });
});

// post use talend in chorme extension to test, remember to use http instead of https
router.post('/hash', (req, res) => {
    const { plainText } = req.body;
    const hash = createHash('md5').update(plainText).digest('hex');
    res.json({
        plainText,
        hash,
    });
});

export default router;
