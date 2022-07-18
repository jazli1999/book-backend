import BookService from '../services/book.service.js';

async function searchGbooks(req, res, next) {
    BookService.searchGbooks(req.params.query).then((books) => {
        res.json(books);
    }).catch(next);
}

const getBookDetails = (req, res) => {
    BookService.getBookDetails(req.params.isbn).then((book) => {
        if (book) {
            const response = JSON.parse(JSON.stringify(book));
            res.status(200).json(response);
        }
        else {
            res.status(404).send('Book not found');
        }
    });
};

const getBookOwners = (req, res) => {
    BookService.getBookOwners(req.params.isbn).then((userList) => {   
        res.status(200).json(userList);
    });
};

async function addBCBooks(req, res, next) {
    BookService.addBooks(req.userId, req.body, 'BC').then((value) => res.status(200).send(value));
}

async function addWSBooks(req, res, next) {
    BookService.addBooks(req.userId, req.body, 'WS').then((value) => res.status(200).send(value));
}

export default {
    searchGbooks, addBCBooks, addWSBooks, getBookDetails, getBookOwners, 
};
