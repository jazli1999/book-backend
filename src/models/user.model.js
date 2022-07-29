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
    startDate: Date,
    endDate: Date,
}, { _id: false });

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    password: String,
    gender: String,
    bio: String,
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

export default model('User', userSchema);
