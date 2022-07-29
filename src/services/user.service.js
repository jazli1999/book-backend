// import mongoose from 'mongoose';
import User from '../models/user.model.js';
import Book from '../models/book.model.js';
import BookService from './book.service.js';

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
    const user = await User.findById(userId);
    if (user === null) return 'no such user';
    await BookService.addBooks(userId, newBookList, listName);
    if (listName === 'BC') {
        user.bookCollection = [];
        user.exchangeableCollection = [];
        user.bmTitles = [];
        user.bmAuthors = [];
        user.bmCategories = [];
        user.bcCover = [];
        user.matchString = '';
    }
    if (listName === 'WS') {
        user.wishList = [];
        user.wsCover = [];
    }
    for (const book of newBookList) {
        const foundBook = await Book.findOne({ ISBN: book.ISBN });
        if (foundBook === null) return book.ISBN;
        if (listName === 'BC') {
            if (typeof foundBook.subtitle !== 'undefined') {
                user.bmTitles.push(`${foundBook.title} ${foundBook.subtitle}`);
                user.matchString = `${user.matchString} ${foundBook.title} ${foundBook.subtitle},`;
            }
            else {
                user.bmTitles.push(foundBook.title);
                user.matchString = `${user.matchString} ${foundBook.title},`;
            }
            user.bmAuthors = user.bmAuthors.concat(foundBook.authors);
            user.bmCategories = user.bmCategories.concat(foundBook.categories);

            user.bookCollection.push(foundBook._id);
            user.bcCover.push(foundBook.image);
            user.exchangeableCollection.push(book.exchangeable);
            
            user.bmAuthors = user.bmAuthors.concat(foundBook.authors);
            user.bmCategories = user.bmCategories.concat(foundBook.categories);
        }
        if (listName === 'WS') {
            user.wishList.push(foundBook._id);
            user.wsCover.push(foundBook.image);
        }
    }
    await user.save();
    return 'user list update success';
}

async function readBookList(userId, listName) {
    const user = await User.findById(userId);
    if (user === null) return 'no such user';
    // Changed it to model.find() to get object info
    if (listName === 'BC') return { list: await Book.find({ _id: { $in: user.bookCollection } }), exchangeable: user.exchangeableCollection };
    if (listName === 'WS') return { list: await Book.find({ _id: { $in: user.WishList } }), exchangeable: [] };
}

async function get(userId) {
    return User.findById(userId).populate('wishList').populate('bookCollection');
}

async function deleteUser(userId) {
    return User.findByIdAndDelete(userId);
}

export default {
    update, get, deleteUser, updateBookList, readBookList,
};
