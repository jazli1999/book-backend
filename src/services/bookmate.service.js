import User from '../models/user.model.js';

async function match(userId) {
    // just for testing framework
    User.findById(userId);
}

export default {
    match,
};
