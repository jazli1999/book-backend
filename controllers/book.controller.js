const bookService = require('../services/book.service');

async function searchGbooks (req, res, next) {
    bookService.searchGbooks(req.params.query).then( books => {
        res.json(books);
    }).catch(next);
}

module.exports = { searchGbooks }