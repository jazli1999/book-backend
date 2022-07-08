import BookmateService from '../services/bookmate.service.js';

async function matchBookmates(req, res, next) {
    console.log('matchbookmates');
    const queryId = req.params.id ? req.params.id : req.userId;
    BookmateService.match(queryId).then((bookmates) => {
        res.json(bookmates);
    }).catch(next);
}

export default {
    matchBookmates,
};
