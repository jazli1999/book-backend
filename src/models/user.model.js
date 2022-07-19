import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const addressSchema = new Schema({
    houseNumber: String,
    street: String,
    city: String,
    state: String,
    country: String,
    postcode: String,
}, { _id: false });

const premiumSchema = new Schema({
    isPremium: Boolean,
    startDate: Date, // not sure for this
    endDate: Date,
}, { _id: false });

// if changing schema has problems, just delete the collections&documents
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password: String, // just for now
    gender: String,
    bio: String,
    image: String, // user avatar
    address: addressSchema,
    premium: premiumSchema,
    birthday: String,
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    bookCollection: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    bmTitles: [String],
    bmAuthors: [String],
    bmCategories: [String],
    matchString: String,
    exchangeableCollection: [{ type: Boolean, default: true }],
    bcCover: [{ type: String }],
    wishList: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    wsCover: [{ type: String }],
    bookmates: [{ type: Schema.Types.ObjectId, ref: 'User' }], // store the bookmates result, force unique here
    bmSent: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    bmReceived: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

// https://stackoverflow.com/questions/24714166/full-text-search-with-weight-in-mongoose
// userSchema.index({bmTitles: 'text', bmAuthors: 'text', bmCategories: 'text'}, {name: 'Bookmates matching index', weights: {bmTitles: 20, bmAuthors: 5, bmCategories: 1}});
// Disable in production
// userSchema.set('autoIndex', false);

export default model('User', userSchema);
