const mongoose = require('mongoose');
const { title } = require('process');

let ProjectScheme = new mongoose.Schema({
    _id: String,
    title: String,
    createdTime: Date,
    deleted: Number,
    createrId: String,
    participants: []
});

let ProjectModel=mongoose.model('project', ProjectScheme)

module.exports = ProjectModel