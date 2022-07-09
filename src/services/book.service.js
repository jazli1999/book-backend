import request from 'superagent';
import User from '../models/user.model.js';
import Book from '../models/book.model.js';

async function modifyInput(json) {
    const books = { searchResult: [] };
    for (const x of json) {
        const currentJson = {};  
        
        // GET Parameters
        // In Google Books API the properties of our model
        // are stored in Volume Info 
        if (Object.prototype.hasOwnProperty.call(json[x], 'volumeInfo')) {
            const { volumeInfo } = json[x];
            // ISBN
            if (Object.prototype.hasOwnProperty.call(volumeInfo, 'industryIdentifiers')) {
                for (const y in volumeInfo.industryIdentifiers) {
                    if (volumeInfo.industryIdentifiers[y].type === 'ISBN_13') {
                        currentJson.ISBN = volumeInfo.industryIdentifiers[y].identifier;
                    }
                }
            }
            // Title
            if (Object.prototype.hasOwnProperty.call(volumeInfo, 'title')) {
                currentJson.title = json[x].volumeInfo.title;
            }
            // Subtitle
            if (Object.prototype.hasOwnProperty.call(volumeInfo, 'subtitle')) {
                currentJson.subtitle = json[x].volumeInfo.subtitle;
            }
            // Authors
            if (Object.prototype.hasOwnProperty.call(volumeInfo, 'authors')) {
                currentJson.authors = json[x].volumeInfo.authors;
            }
            // Categories
            if (Object.prototype.hasOwnProperty.call(volumeInfo, 'categories')) {
                currentJson.categories = json[x].volumeInfo.categories;
            }
            // Image URL
            if (Object.prototype.hasOwnProperty.call(volumeInfo, 'imageLinks')) {
                if (Object.prototype.hasOwnProperty.call(volumeInfo.imageLinks, 'thumbnail')) {
                    currentJson.image = json[x].volumeInfo.imageLinks.thumbnail;
                }
            }
            // Description
            if (Object.prototype.hasOwnProperty.call(volumeInfo, 'description')) {
                currentJson.description = json[x].volumeInfo.description;
            }                   
        }
        // Adds the current book json to result array
        if (Object.keys(currentJson) !== 0) {
            if (Object.prototype.hasOwnProperty.call(currentJson, 'image') && Object.prototype.hasOwnProperty.call(currentJson, 'ISBN')) {
                books.searchResult.push(currentJson);
            }
        }
    }
    // console.log(books)
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
    
    Object.keys(inputJson).forEach((key) => {
        return (inputJson[key] === undefined) || ((inputJson[key] === null) && (delete inputJson[key]));
    });

    // Create temp query string in googlebooks format
    let tempQuery = [];
    for (const p in inputJson) {
        if (Object.prototype.hasOwnProperty.call(inputJson, p)) {
            tempQuery.push(`${encodeURIComponent(p)}:${encodeURIComponent(inputJson[p])}`);
        }
    }
    tempQuery = tempQuery.join('+');
    // console.log(temp_query)

    // Send request to google books api with implemented query string
    const r = await request
        .get(`https://www.googleapis.com/books/v1/volumes?q=${tempQuery}`)
    // For now I set max results to 30
        .then((data) => {
            // return the results
            // console.log(data)
            booksJson = JSON.parse(data.text);
            booksJson = booksJson.items;
        });
    // modifies the input json so that we can access our model
    // parameters much easierPromise.resolve('Success').then( modifyInput(books_json))
    // I couldn't solve async issue without using await back to back      
    
    return modifyInput(booksJson);
}

async function addBooks(userId, newBookList, listName) {
    const user = await User.findById(userId);
    if (user === null) return 'no such user';
    for (const book of newBookList) {
        const foundBook = await Book.findOne({ ISBN: book.ISBN });
        if (foundBook !== null) return 'book already exists';
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
    return 'book list update success';
}

export default { searchGbooks, addBooks };
