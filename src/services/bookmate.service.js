import User from '../models/user.model.js';

async function match(userId) {
    // just for testing framework
    User.findById(userId);
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

export default {
    match, currentBookmates, sendRequest, acceptRequest, declineRequest,
};
