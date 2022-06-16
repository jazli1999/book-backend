import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bookSchema = new Schema({
    // we only consider the ISBN 13 now, if the book only have isbn 10, then convert to 13
    ISBN: { type: String, unique: true },
    title: { type: String, index: true },
    subtitle: { type: String, index: true },
    authors: [String],
    categories: [String],
    image: String,
    description: { type: String, index: true },
    ownedByUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    wantedByUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

export default model('Book', bookSchema);
