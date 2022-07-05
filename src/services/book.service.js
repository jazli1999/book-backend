import User from '../models/user.model.js';
import Book from '../models/book.model.js';
import request from 'superagent'

async function modifyInput(json) {
    const books = { search_result: [] };
    for (const x in json) {
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
        if (Object.keys(currentJson) !== 0){
            if(Object.prototype.hasOwnProperty.call(currentJson, 'image') && Object.prototype.hasOwnProperty.call(currentJson, 'ISBN')) {
                books.search_result.push(currentJson);
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
    var books_json;
    var input_json = JSON.parse(query)


    // Rename Parameters
    if (Object.prototype.hasOwnProperty.call(input_json, 'author')) {
        input_json.inauthor = input_json.author
        delete input_json.author
    }
    if (Object.prototype.hasOwnProperty.call(input_json, 'title')) {
        input_json.intitle = input_json.title
        delete input_json.title
    }
    if (Object.prototype.hasOwnProperty.call(input_json, 'publisher')) {
        input_json.inpublisher = input_json.publisher
        delete input_json.publisher
    }
    
    Object.keys(input_json).forEach(key => input_json[key] === undefined || input_json[key] === null && delete input_json[key])


    // Create temp query string in googlebooks format
    var temp_query = [];
    for (var p in input_json)
        if (input_json.hasOwnProperty(p)) {
            temp_query.push(encodeURIComponent(p) + ":" + encodeURIComponent(input_json[p]));
        }
    temp_query = temp_query.join("+")
    // console.log(temp_query)

    // Send request to google books api with implemented query string
    var r = await request
        .get("https://www.googleapis.com/books/v1/volumes?q="+temp_query)
         // For now I set max results to 30
        .then((data) => {
            // return the results
            // console.log(data)
            books_json = JSON.parse(data.text)
            books_json = books_json.items

        })
    // modifies the input json so that we can access our model
    // parameters much easierPromise.resolve('Success').then( modifyInput(books_json))
    // I couldn't solve async issue without using await back to back      
    
    return modifyInput(books_json)
}

async function addBooks(userId, newBookList, listName) {
    const user = await User.findById(userId);
    if (user === null) return 'no such user';
    for (const book of newBookList) {
        const foundBook = await Book.findOne({ISBN: book.ISBN});
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
