import BookService from '../services/book.service.js';

async function searchGbooks(req, res, next) {
    BookService.searchGbooks(req.params.query).then((books) => {
        res.json(books);
    }).catch(next);
}

export default { searchGbooks };
