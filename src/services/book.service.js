import request from 'superagent';
import User from '../models/user.model.js';
import Book from '../models/book.model.js';

async function modifyInput(json) {
    const books = { searchResult: [] };
    if (json === null || json === [] || json === undefined) {
        return books;
    }
    for (const x of json) {
        const currentJson = {};  
        
        // GET Parameters
        // In Google Books API the properties of our model
        // are stored in Volume Info 
        if (Object.prototype.hasOwnProperty.call(x, 'volumeInfo')) {
            // ISBN
            if (Object.prototype.hasOwnProperty.call(x.volumeInfo, 'industryIdentifiers')) {
                for (const y of x.volumeInfo.industryIdentifiers) {
                    if (y.type === 'ISBN_13') {
                        currentJson.ISBN = y.identifier;
                    }
                }
            }
            // Title
            if (Object.prototype.hasOwnProperty.call(x.volumeInfo, 'title')) {
                currentJson.title = x.volumeInfo.title;
            }
            // Subtitle
            if (Object.prototype.hasOwnProperty.call(x.volumeInfo, 'subtitle')) {
                currentJson.subtitle = x.volumeInfo.subtitle;
            }
            // Authors
            if (Object.prototype.hasOwnProperty.call(x.volumeInfo, 'authors')) {
                currentJson.authors = x.volumeInfo.authors;
            }
            // Categories
            if (Object.prototype.hasOwnProperty.call(x.volumeInfo, 'categories')) {
                currentJson.categories = x.volumeInfo.categories;
            }
            // Image URL
            if (Object.prototype.hasOwnProperty.call(x.volumeInfo, 'imageLinks')) {
                if (Object.prototype.hasOwnProperty.call(x.volumeInfo.imageLinks, 'thumbnail')) {
                    currentJson.image = x.volumeInfo.imageLinks.thumbnail;
                }
            }
            // Description
            if (Object.prototype.hasOwnProperty.call(x.volumeInfo, 'description')) {
                currentJson.description = x.volumeInfo.description;
            }
        }
        // Adds the current book json to result array
        if (Object.keys(currentJson) !== 0) {
            if (Object.prototype.hasOwnProperty.call(currentJson, 'image') && Object.prototype.hasOwnProperty.call(currentJson, 'ISBN')) {
                books.searchResult.push(currentJson);
            }
        }
    }
    const bookList = books;
    return bookList;
}

// fix size of 20 or 50
async function searchGbooks(query) {
    // google books api
    let booksJson;
    const inputJson = JSON.parse(query);

    // Rename Parameters
    if (Object.prototype.hasOwnProperty.call(inputJson, 'author')) {
        inputJson.inauthor = inputJson.author;
        delete inputJson.author;
    }
    if (Object.prototype.hasOwnProperty.call(inputJson, 'title')) {
        inputJson.intitle = inputJson.title;
        delete inputJson.title;
    }
    if (Object.prototype.hasOwnProperty.call(inputJson, 'publisher')) {
        inputJson.inpublisher = inputJson.publisher;
        delete inputJson.publisher;
    }
    
    Object.keys(inputJson).forEach((key) => ((inputJson[key] === '' || inputJson[key] === undefined || inputJson[key] === null) && (delete inputJson[key])));

    // Create temp query string in googlebooks format
    let tempQuery = [];
    for (const p in inputJson) {
        if (Object.prototype.hasOwnProperty.call(inputJson, p)) {
            tempQuery.push(`${encodeURIComponent(p)}:${encodeURIComponent(inputJson[p])}`);
        }
    }
    tempQuery = tempQuery.join('+');

    // Send request to google books api with implemented query string
    const r = await request
        .get(`https://www.googleapis.com/books/v1/volumes?q=${tempQuery}`)
    // For now I set max results to 30
        .then((data) => {
            // return the results
            // (data)
            booksJson = JSON.parse(data.text);
            booksJson = booksJson.items;
        });
    // modifies the input json so that we can access our model
    // parameters much easierPromise.resolve('Success').then( modifyInput(books_json))
    
    return modifyInput(booksJson);
}

async function getBookDetails(isbn) {
    let bookDetails;
    await request
        .get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
        .then((data) => {
            bookDetails = JSON.parse(data.text);
            bookDetails = bookDetails.items;
        });
    const results = modifyInput(bookDetails);

    return (await results).searchResult[0];
}

async function addBooks(userId, newBookList, listName) {
    const user = await User.findById(userId);
    if (user === null) return 'no such user';
    for (const book of newBookList) {
        const foundBook = await Book.findOne({ ISBN: book.ISBN });
        if (foundBook === null) { 
            const newBook = new Book(); // every loop need a newBook
            newBook.ISBN = book.ISBN;
            newBook.title = book.title;
            newBook.subtitle = book.subtitle;
            // List object
            newBook.authors = book.authors;
            newBook.categories = book.categories;
            newBook.image = book.image;
            newBook.description = book.description;
            // accourding to listName update to different lists
            if (listName === 'BC') {
            // mark exchangeable problem
                newBook.ownedByUsers.push(userId);
            }
            if (listName === 'WS') {
                newBook.wantedByUsers.push(userId);
            }
            await newBook.save();
        }
    }
    return 'book list update success';
}

async function getBookFromDatabase(isbn) {
    const foundBook = await Book.findOne({ ISBN: isbn });
    if (foundBook === null) {
        return null;
    } 
    return foundBook;
}

// returns the list of users(id and name) which owns specified book and want to exchange it 
async function getBookOwners(isbn) {
    const foundBook = await getBookFromDatabase(isbn);
    if (foundBook === null) { // if book isn't in database then it's not in any book collection
        return [];
    }

    let bookIndex;
    const exchangeableBookOwners = [];
    const users = await User.find({ bookcollection: foundBook._id });
    for (const user of users) {
        bookIndex = user.bookCollection.indexOf(foundBook._id);

        if (user.exchangeableCollection[bookIndex] === true) {
            exchangeableBookOwners.push({
                userId: user._id, firstName: user.firstName ? user.firstName : null, lastName: user.lastName ? user.lastName : null, imageUrl: user.image ? user.image : null, 
            });
        }
    }
    return exchangeableBookOwners;
}

export default {
    searchGbooks, addBooks, getBookDetails, getBookOwners, 
};
