import ReviewService from '../services/review.service.js';

async function getAllReviews(req, res) {
    ReviewService.getAllReviewsByUserId(req).then((value) => res.status(200).send(value));
}

async function getAllReviewsByOrder(req, res) {
    ReviewService.getReviewsByOrderId(req).then((value) => res.status(200).send(value));
}

async function sendReview(req, res, next) {
    ReviewService.sendReview(req.body).then((value) => (value ? res.status(200).send(value) : res.status(400).send('error occured please validate your review credentials')));
}

export default {
    getAllReviews, getAllReviewsByOrder, sendReview,
};
