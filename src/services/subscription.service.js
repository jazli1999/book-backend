// import mongoose from 'mongoose';
import User from '../models/user.model.js';
import MailService from './mail.service.js';

async function update(userId, subsModel) {
    return User.findById(userId).then((user) => {
        // need test
        if (user === null) return 'no such user';
        if (user.premium !== undefined || !user.premimum.isPremium) {
            let newEndDate = new Date();
            if (newEndDate < user.premium.endDate) {
                newEndDate = user.premium.endDate;
            }
            if (subsModel !== undefined) {
                if (subsModel === 'monthly') {
                    newEndDate.setMonth(user.premium.endDate.getMonth() + 1);
                }
                else if (subsModel === 'yearly') {
                    newEndDate.setFullYear(user.premium.endDate.getFullYear() + 1);
                }
            }
            user.premium.endDate = newEndDate;
            user.save();
            return user.premium;
        }
        
        return 'must be a member first';
    });
}

async function cancel(userId) {
    const user = await User.findById(userId);
    user.premium.isPremium = false;
    user.premium.startDate = null;
    user.premium.endDate = null;
    user.save();

    return 'subscription cancelled';
}

async function create(userId, subsModel) {
    const user = await User.findById(userId);
    // need test
    if (user === null) return 'no such user';
    if (user.premium === undefined || !user.premium.isPremium) {
        user.premium = {};
        const start = new Date();
        const end = new Date(start);
        if (subsModel !== undefined) {
            if (subsModel !== 'free') {
                if (subsModel === 'monthly') {
                    end.setMonth(end.getMonth() + 1);
                }
                else if (subsModel === 'yearly') {
                    end.setFullYear(end.getFullYear() + 1);
                }
                user.premium = { isPremium: true, startDate: start, endDate: end };
            }
            else {
                user.premium = { isPremium: false, startDate: start, endDate: end };
            }
        }
    }
    else if (user.premium.isPremium) {
        await update(userId, subsModel);
    }
    user.save();
    MailService.sendSubscriptionMail(true, user.email);
    return user.premium;
}

async function getDetails(userId) {
    const user = await User.findById(userId);
    if (user === null) return 'no such user';
    if (user.premium !== undefined) {
        const today = new Date();
        if (today > user.premium.endDate) {
            await cancel(userId);
        }
        return user.premium;
    }
    
    create(userId, 'free');
    
    return user.premium;
}

async function get(userId) {
    let user = await User.findById(userId);
    if (user === null) return 'no such user';
    if (user.premium !== undefined) {
        const today = new Date();
        if (today > user.premium.endDate) {
            await cancel(userId);
            return false; // or you will have problem, the user.premium.isPremium is still true
        }
    }
    else {
        user = await create(userId, 'free');
        return false;
    }
    return user.premium.isPremium;
}

export default {
    create, update, get, getDetails, cancel,
};
