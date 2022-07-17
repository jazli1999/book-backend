import SubscriptionService from '../services/subscription.service.js';

async function createSubscription(req, res, next) {
    SubscriptionService.create(req.body.userId, req.body.subscriptionModel).then(() => {
        res.status(200).send('saved subscription details');
    }).catch(next);
}


async function updateSubscription(req, res) {
    SubscriptionService.update(req.body.userId, req.body.subscriptionModel).then((value) => res.status(200).send(value));
}

async function getSubscription(req, res, next) {
    SubscriptionService.get(req.userId).then((value) => {
        res.status(200).send(({"isPremium":value}));
    }).catch(next);
}

async function cancelSubscription(req, res, next) {
    SubscriptionService.cancel(req.userId).then(() => {
        res.status(200).send('delete success');
    }).catch(next);
}


export default {
    createSubscription, 
    cancelSubscription, 
    getSubscription, 
    updateSubscription, 
};
