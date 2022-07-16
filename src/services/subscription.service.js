// import mongoose from 'mongoose';
import User from '../models/user.model.js';

async function create(userId, subsModel) {
    const user = await User.findById(userId);
    // need test
    if (user === null) return 'no such user';
    if (user.premium === undefined || !user.premimum.isPremium) {
        user.premimum = {};
        const start = new Date();
        const end = new Date(start);
        if( subsModel !== undefined){
            if( subsModel !== 'free'){
                if(subsModel === 'monthly'){
                    end.setMonth(end.getMonth() + 1)
                }
                else if(subsModel === 'yearly'){
                    end.setFullYear(end.getFullYear() + 1)
                }
                user.premium = { "isPremium": true, "startDate" : start, "endDate" : end };
            }
            else {
                user.premium = { "isPremium": false, "startDate" : start, "endDate" : end };
            }
        }
        
    }
    user.save();
    return user.premium;
}


async function update(userId, subsModel) {
    return User.findById(userId).then((user) => {
        // need test
        if (user === null) return 'no such user';
        if (user.premium !== undefined || !user.premimum.isPremium ) {
            user.premium.endDate = new Date();
            if( subsModel != undefined){
                if(subsModel === 'monthly'){
                    user.premium.endDate.setMonth(user.premium.endDate.getMonth() + 1)
                }
                else if(subsModel === 'yearly'){
                    user.premium.endDate.setFullYear(user.premium.endDate.getFullYear() + 1)
                }
            }
            user.save();
            return user.premium;
        }
        else{
            return 'must be a member first';
        }
    });
}


async function getDetails(userId) {
    const user = await User.findById(userId);
    if (user === null) return 'no such user';
    if (user.premium !== undefined || !user.premimum.isPremium) {
        today = new Date();
        if (today >  user.premium.stopDate){
            await cancel(userId);
        }
        return user.premium;
    }
    return {"Status" : "Free Member"}
}

async function get(userID) {
    const user = await User.findById(userId);
    if (user === null) return 'no such user';
    if (user.premium !== undefined) {
        today = new Date();
        if (today >  user.premium.stopDate){
            await cancel(userID);
        }
    }
    else{
        create(userID, 'free');
    }
    return user.premium.isPremium;
}

async function cancel(userId) {
    const user = await User.findById(userId);
    user.premium.isPremium = false;
    user.premium.startDate = null;
    user.premium.stopDate = null;
    user.save();
    return 'subscription cancelled';
}

export default {
    create, update, get, getDetails, cancel
};
