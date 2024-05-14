const mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
    _id: String,
    email: String,
    username: String,
    password: String,
    profileUrl: String,
    deleted: Number,
    collectedProjectIds: []
});

let UserModel=mongoose.model('user', UserSchema)

module.exports = UserModel