// import mongoose from 'mongoose';
import User from '../models/user.model.js';
import Book from '../models/book.model.js';

async function create(userToCreate) {
    const user = new User(); // contructor always be sync
    user.firstName = userToCreate.user.firstName;
    user.lastName = userToCreate.user.lastName;
    user.email = userToCreate.user.email;
    // for now
    user.password = userToCreate.user.password;
    return user.save(); // .save is asyn will return a promise
}

async function update(userId, userInfo) {
    return User.findById(userId).then((user) => {
        // need test
        if (user === null) return 'no such user';
        if (typeof userInfo.user.firstName !== 'undefined') {
            user.firstName = userInfo.user.firstName;
        }
        if (typeof userInfo.user.lastName !== 'undefined') {
            user.lastName = userInfo.user.lastName;
        }
        if (typeof userInfo.user.gender !== 'undefined') {
            user.gender = userInfo.user.gender;
        }
        if (typeof userInfo.user.bio !== 'undefined') {
            user.bio = userInfo.user.bio;
        }
        if (typeof userInfo.user.birthday !== 'undefined') {
            user.birthday = userInfo.user.birthday;
        }
        if (typeof userInfo.user.address !== 'undefined') {
            user.address = {};
            if (typeof userInfo.user.address.houseNumber !== 'undefined') {
                user.address.houseNumber = userInfo.user.address.houseNumber;
            }
            if (typeof userInfo.user.address.street !== 'undefined') {
                user.address.street = userInfo.user.address.street;
            }
            if (typeof userInfo.user.address.city !== 'undefined') {
                user.address.city = userInfo.user.address.city;
            }
            if (typeof userInfo.user.address.state !== 'undefined') {
                user.address.state = userInfo.user.address.state;
            }
            if (typeof userInfo.user.address.country !== 'undefined') {
                user.address.country = userInfo.user.address.country;
            }
            if (typeof userInfo.user.address.postcode !== 'undefined') {
                user.address.postcode = userInfo.user.address.postcode;
            }
        }
        return user.save().then(() => 'update success');
    });
}

async function updateBookList(userId, newBookList, listName) {
    return User.findById(userId).then((user) => {
        if (user === null) return 'no such user';
        
        for (const book of newBookList) {
            Book.findOne({ISBN: book.ISBN}).then((foundBook) => {
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
                newBook.save();
                // return 'no such book';
                // add new book part
            });
        }
        return 'all books update success';
    });
}

async function get(userId) {
    return User.findById(userId);
}

async function deleteUser(userId) {
    return User.findByIdAndDelete(userId);
}

export default {
    create, update, get, deleteUser, updateBookList
};
