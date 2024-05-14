const mongoose = require('mongoose');
const { title } = require('process');

let TaskGroupScheme = new mongoose.Schema({
    _id: String,
    title: String,
    createdTime: Date,
    deleted: Number,
    createrId: String,
    projectId: String
});

let TaskGroupModel=mongoose.model('taskgroup', TaskGroupScheme)

module.exports = TaskGroupModel