// const mongoose = require('mongoose');
// const Book = require('../models/book.model');
import request from 'superagent'

// fix size of 20 or 50
async function searchGbooks(query) {
    // google books api
    var books_json;   
    var r = await request
        .get("https://www.googleapis.com/books/v1/volumes")
        .query( { q: query, maxResults: 30} ) // For now I set max results to 30
        .then((data) => {
            // return the results
            books_json = JSON.parse(data.text)
            books_json = books_json.items

        })
    // modifies the input json so that we can access our model
    // parameters much easierPromise.resolve('Success').then( modifyInput(books_json))
    // I couldn't solve async issue without using await back to back      
    return await modifyInput(books_json)
}

async function modifyInput(json) {
    var books = {'search_result' : []}
    for( let x in json){
        var current_json = {}  
        
        // GET Parameters
        // In Google Books API the properties of our model
        // are stored in Volume Info 
        if( json[x].hasOwnProperty('volumeInfo')){
            let volumeInfo = json[x].volumeInfo
                // ISBN
                if( volumeInfo.hasOwnProperty('industryIdentifiers')){
                    for( let y in volumeInfo.industryIdentifiers ){
                        if(volumeInfo.industryIdentifiers[y].type == 'ISBN_13')
                            current_json['ISBN'] =  volumeInfo.industryIdentifiers[y].identifier
                    }
                }
                // Title
                if (volumeInfo.hasOwnProperty('title')){
                    current_json['title'] = json[x].volumeInfo.title
                }
                // Subtitle
                if (volumeInfo.hasOwnProperty('subtitle')){
                    current_json['subtitle'] = json[x].volumeInfo.subtitle
                }
                // Authors
                if (volumeInfo.hasOwnProperty('authors')){
                    current_json['authors'] = json[x].volumeInfo.authors
                }
                // Categories
                if( volumeInfo.hasOwnProperty('categories')){
                    current_json['categories'] = json[x].volumeInfo.categories
                }
                // Image URL
                if( volumeInfo.hasOwnProperty('imageLinks') ){
                    if(volumeInfo.imageLinks.hasOwnProperty('thumbnail')){
                        current_json['image'] = json[x].volumeInfo.imageLinks.thumbnail
                    }
                }
                // Description
                if( volumeInfo.hasOwnProperty('description')){
                    current_json['description'] = json[x].volumeInfo.description
                }                   
        }
        // Adds the current book json to result array
        if( Object.keys(current_json) != 0 && current_json.hasOwnProperty('ISBN')){
           books['search_result'].push(current_json)
        }     

    }
    //console.log(books)
    const book_list = books
    return book_list
}

export default { searchGbooks };
