import BookService from '../services/book.service.js';

async function searchGbooks(req, res, next) {
    BookService.searchGbooks(req.params.query).then((books) => {
        res.json(books);
    }).catch(next);
}

async function addBCBooks(req, res, next) {
    BookService.addBooks(req.userId, req.body, 'BC').then((value) => res.status(200).send(value));
}

async function addWSBooks(req, res, next) {
    BookService.addBooks(req.userId, req.body, 'WS').then((value) => res.status(200).send(value));
}


export default { searchGbooks, addBCBooks, addWSBooks };
