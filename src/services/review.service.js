import Review from '../models/review.model.js';
import User from '../models/user.model.js';
import Order from '../models/order.model.js';

// returns review object of given review id
async function getReviewsByOrderId(req) {
    const { orderId } = req.params;
    const result = await Review.find({ order: orderId });
    return result;
}

// returns all reviews that user received
async function getAllReviewsByUserId(req) {
    const { userId } = req.params;
    const result = await Review.find({ receiver: userId });
    return result;
}

async function sendReview(params) {
    const order = await Order.findById(params.order);
    if (order === null) {
        return null;
    }

    // I added this part in order service since it fits it more.
    let author;
    let receiver;
    if (params.author === order.requester.userId.toString() && !order.requester.isReviewed) {
        author = await User.findById(params.author);
        receiver = await User.findById(order.responder.userId);
        order.requester.isReviewed = true;
    }
    else if (params.author === order.responder.userId.toString() && !order.responder.isReviewed) {
        author = await User.findById(params.author);
        receiver = await User.findById(order.requester.userId);
        order.responder.isReviewed = true;
    }
    else {
        return null;
    }

    const review = new Review();
    review.author = author;
    review.receiver = receiver;
    review.content = params.content;
    review.timestamp = new Date();
    await review.save();

    await order.save();

    return 'Your review is succesfully sent';
}

export default {
    getReviewsByOrderId, sendReview, getAllReviewsByUserId,
};
