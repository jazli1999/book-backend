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

// const nameSchema = new mongoose.Schema({
//     firstName: String,
//     lastName: String
// }, { _id: false });

// if changing schema has problems, just delete the collections&documents
const userSchema = new Schema({
    // username: {
    //     type: String,
    //     lowercase: true,
    //     unique: true,
    //     required: [true, "can't be blank"],
    //     match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    //     index: true,
    // },
    firstName: String,
    lastName: String,
    email: {
        type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true,
    },
    password: String, // just for now
    gender: String,
    bio: String,
    image: String, // user avatar
    address: addressSchema,
    premium: premiumSchema,
    birthday: String,
    bookCollection: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    wishList: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    bookmates: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

// userSchema.methods.toAuthJSON = function() {
//     return {
//         username: this.username,
//         email: this.email,
//     }
// }

export default model('User', userSchema);
