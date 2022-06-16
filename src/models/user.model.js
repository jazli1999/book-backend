const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    houseNumber: String,
    street: String,
    city: String,
    state: String,
    country: String,
    postcode: String
}, { _id: false });

const premiumSchema = new mongoose.Schema({
    isPremium: Boolean,
    startDate: Date, // not sure for this
    endDate: Date
}, { _id: false });

// const nameSchema = new mongoose.Schema({
//     firstName: String,
//     lastName: String
// }, { _id: false });

// if changing schema has problems, just delete the collections&documents
const userSchema = new mongoose.Schema({
    // username: {type: String, lowercase: true, unique:true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    firstName: String,
    lastName: String,
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

// userSchema.methods.toAuthJSON = function() {
//     return {
//         username: this.username,
//         email: this.email,
//     }
// }

const User = mongoose.model('User', userSchema);

module.exports = User;