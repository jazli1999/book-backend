// const mongoose = require('mongoose');
// const Book = require('../models/book.model');
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
        if (Object.keys(currentJson) !== 0 && Object.prototype.hasOwnProperty.call(currentJson, 'ISBN')) {
            books.search_result.push(currentJson);
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
    input_json.intitle = input_json.title
    input_json.inauthor = input_json.author
    input_json.inpublisher = input_json.publisher

    // Delete useless parameters
    delete input_json.title
    delete input_json.author
    delete input_json.publisher
    Object.keys(input_json).forEach(key => input_json[key] === undefined || input_json[key] === null && delete input_json[key])


    // Create temp query string in googlebooks format
    var temp_query = [];
    for (var p in input_json)
        if (input_json.hasOwnProperty(p)) {
            temp_query.push(encodeURIComponent(p) + ":" + encodeURIComponent(input_json[p]));
        }
    temp_query = temp_query.join("+")

    // Send request to google books api with implemented query string
    var r = await request
        .get("https://www.googleapis.com/books/v1/volumes")
        .query( { q : temp_query, maxResults: 30} ) // For now I set max results to 30
        .then((data) => {
            // return the results
            books_json = JSON.parse(data.text)
            books_json = books_json.items

        })
    // modifies the input json so that we can access our model
    // parameters much easierPromise.resolve('Success').then( modifyInput(books_json))
    // I couldn't solve async issue without using await back to back      
    return modifyInput(books_json)
}


export default { searchGbooks };