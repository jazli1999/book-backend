import User from '../models/user.model.js';
import SubscriptionService from './subscription.service.js';
import MailService from './mail.service.js';

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
        users = await User.aggregate([
            {
                $match: {
                    bookCollection: { $exists: true, $ne: [] },
                    firstName: { $exists: true },
                }, 
            },
            { $sample: { size: 10 } },
        ]);
    }

    let userIndex;
    for (const [deleteIndex, bmUser] of users.entries()) {
        if (bmUser._id.toString() === userId) {
            userIndex = deleteIndex;
            continue;
        }
        bmUser.bcMark = []; // newly added
        bmUser.wsMark = [];

        // list need modification:
        // bookCollection, bmTitles, wishList, exchangeableCollection, bcCover, wsCover
        const bookCollectionMark = [];
        const bmTitlesMark = []; // related to book collection
        const exchangeableCollectionMark = [];
        const bcCoverMark = [];

        const bookCollectionNull = [];
        const bmTitlesNull = []; // related to book collection
        const exchangeableCollectionNull = [];
        const bcCoverNull = [];
        
        const wsNull = [];
        const bcNull = [];

        for (const [markIndex, bookId] of bmUser.bookCollection.entries()) {
            const index = user.wishList.indexOf(bookId);
            if (index !== -1) { // if current user's wish list have this books
                bmUser.bcMark.push('isFavorite');
                bookCollectionMark.push(bmUser.bookCollection[markIndex]);
                bmTitlesMark.push(bmUser.bmTitles[markIndex]);
                exchangeableCollectionMark.push(bmUser.exchangeableCollection[markIndex]);
                bcCoverMark.push(bmUser.bcCover[markIndex]);
            }
            else {
                bcNull.push(null);
                bookCollectionNull.push(bmUser.bookCollection[markIndex]);
                bmTitlesNull.push(bmUser.bmTitles[markIndex]);
                exchangeableCollectionNull.push(bmUser.exchangeableCollection[markIndex]);
                bcCoverNull.push(bmUser.bcCover[markIndex]);
            }
        }

        bmUser.bookCollection = bookCollectionMark.concat(bookCollectionNull);
        bmUser.bmTitles = bmTitlesMark.concat(bmTitlesNull);
        bmUser.exchangeableCollection = exchangeableCollectionMark.concat(exchangeableCollectionNull);
        bmUser.bcCover = bcCoverMark.concat(bcCoverNull);
        bmUser.bcMark = bmUser.bcMark.concat(bcNull);

        const wsCoverMark = [];
        const wishListMark = [];
        const wsCoverNull = [];
        const wishListNull = [];

        for (const [wsMarkIndex, wsBookId] of bmUser.wishList.entries()) {
            const wsIndex = user.bookCollection.indexOf(wsBookId);
            if (wsIndex !== -1) {
                bmUser.wsMark.push('isAvailable');
                wsCoverMark.push(bmUser.wsCover[wsMarkIndex]);
                wishListMark.push(bmUser.wishList[wsMarkIndex]);
            }
            else {
                wsNull.push(null);
                wsCoverNull.push(bmUser.wsCover[wsMarkIndex]);
                wishListNull.push(bmUser.wishList[wsMarkIndex]);
            }
        }

        bmUser.wsCover = wsCoverMark.concat(wsCoverNull);
        bmUser.wishList = wishListMark.concat(wishListNull);
        bmUser.wsMark = bmUser.wsMark.concat(wsNull);
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

    return response;
}

async function sendRequest(userId, targetId) {
    const sendingUser = await User.findById(userId);
    const receivingUser = await User.findById(targetId); // the sendingUser should not be in the bookmates already
    if (receivingUser === null) return 'no such user';
    receivingUser.bmReceived.push(sendingUser._id);
    sendingUser.bmSent.push(receivingUser._id);
    await sendingUser.save();
    await receivingUser.save();
    MailService.sendBookmateRequestMail(sendingUser.firstName, sendingUser.lastName, 'Received', receivingUser.email);
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
        MailService.sendBookmateRequestMail(receivingUser.firstName, receivingUser.lastName, 'Accepted', sendingUser.email);
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
        MailService.sendBookmateRequestMail(receivingUser.firstName, receivingUser.lastName, 'Declined', sendingUser.email);
    }
    else {
        return 'this user did not send request to you';
    }
    return 'decline bookmate request success';
}

export default {
    match, currentBookmates, sendRequest, acceptRequest, declineRequest, 
};
