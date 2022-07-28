import User from '../models/user.model.js';
import Book from '../models/book.model.js';
import SubscriptionService from './subscription.service.js';
import SubscriptionController from '../controllers/subscription.controller.js';

async function match(userId) {
    const user = await User.findById(userId);
    if (user === null) return 'no such user';
    if (typeof user.matchString === 'undefined') return []; // if the bookcollection is empty

    const isPremium = await SubscriptionService.get(userId);

    let users;

    if (isPremium) {
        users = await User.aggregate([        
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
                $limit: 51,
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
        ]);
    }

    if (!isPremium) {
        users = await User.aggregate([{ $sample: { size: 10 } }]);
    }

    // const books = await Book.find(
    //     { $text : { $search : "Book" } }, 
    //     { score : { $meta: "textScore" } }
    // )
    // .limit(10)
    // .sort({ score : { $meta : 'textScore' } });

    // calculate the intersection here
    // recalculate the score here
    let userIndex;
    for (const [deleteIndex, bmUser] of users.entries()) {
        if (bmUser._id.toString() === userId) {
            userIndex = deleteIndex;
            continue;
        }
        bmUser.bcMark = [];
        bmUser.bcNull = [];
        bmUser.wsMark = [];
        bmUser.wsNull = [];
        for (const bookId of bmUser.bookCollection) {
            const index = user.wishList.indexOf(bookId);
            if (index !== -1) { // if current user's wish list have this books
                bmUser.bcMark.push('isFavorite');
            }
            else {
                bmUser.bcNull.push(null);
            }
        }
        bmUser.bcMark = bmUser.bcMark.concat(bmUser.bcNull);

        for (const wsBookId of bmUser.wishList) {
            const wsIndex = user.bookCollection.indexOf(wsBookId);
            // console.log(wsBookId);
            if (wsIndex !== -1) {
                bmUser.wsMark.push('isAvailable');
            }
            else {
                bmUser.wsNull.push(null);
            }
        }
        bmUser.wsMark = bmUser.wsMark.concat(bmUser.wsNull);
    }
    users.splice(userIndex, 1);

    return users;
}

async function currentBookmates(userId) {
    const user = await User.findById(userId).populate('bookmates').populate('bmReceived');
    const rawBookmates = user.bookmates;
    const recBookmates = user.bmReceived;
    const curResponse = [];
    const recResponse = [];
    for (const rBookmate of rawBookmates) {
        const bookmate = JSON.parse(JSON.stringify(rBookmate));
        delete bookmate.password;
        if (bookmate.address) {
            delete bookmate.address.street;
            delete bookmate.address.houseNumber;
            delete bookmate.address.postcode;
        }
        if (bookmate.premium) {
            delete bookmate.premium.startDate;
            delete bookmate.premium.endDate;
        }
        delete bookmate.birthday;
        delete bookmate.email;
        delete bookmate.orders;
        delete bookmate.bookmates;
        curResponse.push(bookmate);
    }

    for (const recBookmate of recBookmates) {
        const rcBookmate = JSON.parse(JSON.stringify(recBookmate));
        delete rcBookmate.password;
        if (rcBookmate.address) {
            delete rcBookmate.address.street;
            delete rcBookmate.address.houseNumber;
            delete rcBookmate.address.postcode;
        }
        if (rcBookmate.premium) {
            delete rcBookmate.premium.startDate;
            delete rcBookmate.premium.endDate;
        }
        delete rcBookmate.birthday;
        delete rcBookmate.email;
        delete rcBookmate.orders;
        delete rcBookmate.bookmates;
        recResponse.push(rcBookmate);
    }

    const response = {
        Bookmates: curResponse,
        bmReceived: recResponse,
    };

    // console.log(response);

    return response;
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
        await receivingUser.save();
    }
    else {
        return 'you did not receive this user\'s request';
    }

    if (sendingUser.bmSent.length === 0) return 'this user did not send request to you';
    const sendIndex = sendingUser.bmSent.indexOf(userId);
    if (sendIndex !== -1) {
        sendingUser.bmSent.splice(sendIndex, 1); // delete the user in bmSent
        sendingUser.bookmates.push(userId);
        await sendingUser.save();
    }
    else {
        return 'this user did not send request to you';
    }
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
        await receivingUser.save();
    }
    else {
        return 'you did not receive this user\'s request';
    }

    if (sendingUser.bmSent.length === 0) return 'this user did not send request to you';
    const sendIndex = sendingUser.bmSent.indexOf(userId);
    if (sendIndex !== -1) {
        sendingUser.bmSent.splice(sendIndex, 1); // delete the user in bmSent
        await sendingUser.save();
    }
    else {
        return 'this user did not send request to you';
    }
    return 'decline bookmate request success';
}

async function updateBookmates() {
    // ME.find({ pictures: { $exists: true, $ne: [] } })
    // update bookmates&bmreceived&bmsent feilds
    const users = await User.find();
    for (const user of users) {
        user.bookmates = [];
        user.bmSent = [];
        user.bmReceived = [];
        await user.save();
    }
    return 'bookmates&bmreceived&bmsent update success!';

    // update matching fields
    // const users = await User.find({ bookCollection: { $exists: true, $ne: [] } }).select({ bookCollection: 1 }).populate('bookCollection');
    // for (const user of users) {
    //     user.bmTitles = [];
    //     user.bmAuthors = [];
    //     user.bmCategories = [];
    //     user.bcCover = [];
    //     user.wsCover = [];
    //     user.matchString = '';
    //     for (const book of user.bookCollection) {
    //         if (typeof book.subtitle !== 'undefined') {
    //             user.bmTitles.push(`${book.title} ${book.subtitle}`);
    //             user.matchString = `${user.matchString} ${book.title} ${book.subtitle}^`;
    //         }
    //         else {
    //             user.bmTitles.push(book.title);
    //             user.matchString = `${user.matchString} ${book.title}^`;
    //         }
    //         user.bmAuthors = user.bmAuthors.concat(book.authors);
    //         user.bmCategories = user.bmCategories.concat(book.categories);
    //         user.bcCover.push(book.image);
    //     }
    //     user.save();
    // }

    // const wsUsers = await User.find({ wishList: { $exists: true, $ne: [] } }).select({ wishList: 1 }).populate('wishList');
    // for (const wsUser of wsUsers) {
    //     wsUser.wsCover = [];
    //     for (const book of wsUser.wishList) {
    //         wsUser.wsCover.push(book.image);
    //     }
    //     wsUser.save();
    // }

    // return 'bookmates matching field update success';
}

export default {
    match, currentBookmates, sendRequest, acceptRequest, declineRequest, updateBookmates,
};
