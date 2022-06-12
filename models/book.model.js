const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    ISBN: {type: String, unique: true}, // we only consider the ISBN 13 now, if the book only have isbn 10, then convert to 13
    title: {type: String, index: true},
    subtitle: {type: String, index: true},
    authors: [String],
    categories: [String],
    image: String,
    description: {type: String, index: true},
    ownedByUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    wantedByUsers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true});


mongoose.model('Book', bookSchema);