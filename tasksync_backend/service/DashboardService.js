const ProjectModel = require('../model/ProjectModel')
const UserService = require('../service/UserService')
const TaskGroupService = require('../service/TaskGroupService')
const TaskModel = require('../model/TaskModel')
const UserModel = require('../model/UserModel')

async function dashboard(userId) {
    try {
        console.log(projects)
        // console.log(`Project ${project} has been inserted successfully`)
        return projects
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    dashboard
}