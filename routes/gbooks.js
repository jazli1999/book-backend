const express = require('express');
const router = express.Router();
const crypto = require('crypto');

/* GET home page. */
router.get('/:title/:greeting', function(req, res, next) {
    // get('/')
    // gbooks?title=free
    // const title = req.query.title; // "title" is from the index.jade
    // res.render('index', { title });

    // get('/:title/:greeting')
    const title = req.params.title;
    const greeting = req.params.greeting;
    res.render('index', {title, greeting});
});

// return json file
router.get('/time', (req, res, next) => {
    res.json({
        time: new Date().toISOString()
    });
});

// post use talend in chorme extension to test, remember to use http instead of https
router.post('/hash', (req, res, next) => {
    const plainText = req.body.plainText;
    const hash = crypto.createHash('md5').update(plainText).digest('hex');
    res.json({
        plainText,
        hash,
    });
});

module.exports = router;