const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    houseNumber: String,
    street: String,
    city: String,
    state: String,
    country: String,
    postcode: Number
});

const premiumSchema = mongoose.Schema({
    isPremium: Boolean,
    startDate: Date, // not sure for this
    endDate: Date
})

const userSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, unique:true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match:[/\S+@\S+\.\S+/, "is invalid"], index: true},
    password: String, // just for now
    gender: String,
    bio: String,
    image: String, // user avatar
    address: addressSchema,
    premium: premiumSchema,
    bookCollection: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    wishList: [{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    bookmates: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;