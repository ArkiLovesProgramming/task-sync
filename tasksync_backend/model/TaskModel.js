const mongoose = require('mongoose')

let TaskScheme = new mongoose.Schema({
    _id: String,
    title: String,
    mediaUrl: String,
    content: String,
    tags: [],
    severity: String,
    createdTime: Date,
    deleted: Number,
    createrId: String,
    taskGroupId: String,
    order: Number
});

let TaskModel=mongoose.model('task', TaskScheme)

module.exports = TaskModel