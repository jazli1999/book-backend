import SubscriptionService from '../services/subscription.service.js';

async function createSubscription(req, res, next) {
    SubscriptionService.create(req.userId, req.params.subscriptionModel).then(() => {
        res.send('saved subscription details');
    }).catch(next);
}


async function updateSubscription(req, res) {
    SubscriptionService.update(req.userId, req.params.subscriptionModel).then((value) => res.status(200).send(value));
}

async function getSubscription(req, res, next) {
    SubscriptionService.get(req.userId).then((value) => {
        res.status(200).send((value));
    }).catch(next);
}

async function cancelSubscription(req, res, next) {
    SubscriptionService.cancel(req.userId).then(() => {
        res.send('delete success');
    }).catch(next);
}


export default {
    createSubscription, 
    cancelSubscription, 
    getSubscription, 
    updateSubscription, 
};
