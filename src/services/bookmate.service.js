import User from '../models/user.model.js';
import Book from '../models/book.model.js';

async function match(userId) {
    // just for testing framework
    // for the match, the current user should have a search string
    // const matchString = '';
    const user = await User.findById(userId);
    if (user === null) return 'no such user';

    // const books = await Book.find(
    //     { $text : { $search : "Book" } }, 
    //     { score : { $meta: "textScore" } }
    // )
    // .limit(10)
    // .sort({ score : { $meta : 'textScore' } });

    const users = await User.aggregate([        
        {
            $search: {
                index: 'bm_index',
                text: {
                    query: user.matchString,
                    path: {
                        wildcard: '*',
                    },
                },
            },
        },
        {
            $project: {
                // will have _id field by default
                firstName: 1,
                lastName: 1,
                bio: 1,
                bookCollection: 1,
                bmTitles: 1,
                wishList: 1,
                exchangeableCollection: 1,
                bcCover: 1,
                wsCover: 1,
                score: { $meta: 'searchScore' },
            },
        },
    ]).limit(5);

    // to do list: deleting the current user from recommendation

    // calculate the intersection here
    for (const bmUser of users) {
        bmUser.bcMark = [];
        bmUser.wsMark = [];
        for (const bookId of bmUser.bookCollection) {
            const index = user.wishList.indexOf(bookId);
            if (index !== -1) { // if current user's wish list have this books
                bmUser.bcMark.push('isFavorite');
            }
            else {
                bmUser.bcMark.push(null);
            }
        }

        for (const wsBookId of bmUser.wishList) {
            const wsIndex = user.bookCollection.indexOf(wsBookId);
            // console.log(wsBookId);
            if (wsIndex !== -1) {
                bmUser.wsMark.push('isAvailable');
            }
            else {
                bmUser.wsMark.push(null);
            }
        }
    }

    return users; // restrict the first one is not enough   
}

async function currentBookmates(userId) {
    return User.findById(userId).populate('bookmates');
}

// don't consider the unique problem for now
async function sendRequest(userId, targetId) { // how to make the array unique
    const sendingUser = await User.findById(userId);
    const receivingUser = await User.findById(targetId); // the sendingUser should not be in the bookmates already
    if (receivingUser === null) return 'no such user';
    receivingUser.bmReceived.push(sendingUser._id);
    sendingUser.bmSent.push(receivingUser._id);
    await sendingUser.save();
    await receivingUser.save();
    return 'bookmates request sent successful';
}

async function acceptRequest(userId, targetId) { // receivingUser accept sendingUser's request
    const receivingUser = await User.findById(userId); // user could accept the request from bmReceived
    const sendingUser = await User.findById(targetId);
    if (sendingUser === null) return 'no such user';
    // just get the list out
    if (receivingUser.bmReceived.length === 0) return 'you did not receive this user\'s request';
    const index = receivingUser.bmReceived.indexOf(targetId);
    if (index !== -1) {
        receivingUser.bmReceived.splice(index, 1);
        receivingUser.bookmates.push(targetId);
    }
    else {
        return 'you did not receive this user\'s request';
    }

    if (sendingUser.bmSent.length === 0) return 'this user did not send request to you';
    const sendIndex = sendingUser.bmSent.indexOf(userId);
    if (sendIndex !== -1) {
        sendingUser.bmSent.splice(index, 1); // delete the user in bmSent
        sendingUser.bookmates.push(userId);
    }
    else {
        return 'this user did not send request to you';
    }

    await sendingUser.save();
    await receivingUser.save();
    return 'accept bookmate request success';
}

async function declineRequest(userId, targetId) {
    const receivingUser = await User.findById(userId); // user could accept the request from bmReceived
    const sendingUser = await User.findById(targetId);
    if (sendingUser === null) return 'no such user';
    // just get the list out
    if (receivingUser.bmReceived.length === 0) return 'you did not receive this user\'s request';
    const index = receivingUser.bmReceived.indexOf(targetId);
    if (index !== -1) {
        receivingUser.bmReceived.splice(index, 1);
    }
    else {
        return 'you did not receive this user\'s request';
    }

    if (sendingUser.bmSent.length === 0) return 'this user did not send request to you';
    const sendIndex = sendingUser.bmSent.indexOf(userId);
    if (sendIndex !== -1) {
        sendingUser.bmSent.splice(index, 1); // delete the user in bmSent
    }
    else {
        return 'this user did not send request to you';
    }

    await sendingUser.save();
    await receivingUser.save();
    return 'decline bookmate request success';
}

async function updateBookmates() {
    // ME.find({ pictures: { $exists: true, $ne: [] } })
    const users = await User.find({ bookCollection: { $exists: true, $ne: [] } }).select({ bookCollection: 1 }).populate('bookCollection');
    for (const user of users) {
        user.bmTitles = [];
        user.bmAuthors = [];
        user.bmCategories = [];
        user.bcCover = [];
        user.wsCover = [];
        user.matchString = '';
        for (const book of user.bookCollection) {
            if (typeof book.subtitle !== 'undefined') {
                user.bmTitles.push(`${book.title} ${book.subtitle}`);
                user.matchString = `${user.matchString} ${book.title} ${book.subtitle}^`;
            }
            else {
                user.bmTitles.push(book.title);
                user.matchString = `${user.matchString} ${book.title}^`;
            }
            user.bmAuthors = user.bmAuthors.concat(book.authors);
            user.bmCategories = user.bmCategories.concat(book.categories);
            user.bcCover.push(book.image);
        }
        user.save();
    }

    const wsUsers = await User.find({ wishList: { $exists: true, $ne: [] } }).select({ wishList: 1 }).populate('wishList');
    for (const wsUser of wsUsers) {
        wsUser.wsCover = [];
        for (const book of wsUser.wishList) {
            wsUser.wsCover.push(book.image);
        }
        wsUser.save();
    }

    return 'bookmates matching field update success';
}

export default {
    match, currentBookmates, sendRequest, acceptRequest, declineRequest, updateBookmates,
};
