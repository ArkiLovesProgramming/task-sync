const UserService = require('../service/UserService')
const ProjectService = require('../service/ProjectService')
const TaskGroupService = require('../service/TaskGroupService')
const config = require('../config/Config')
const { nanoid } = require('nanoid')

async function addUser(req, res) {
    const { email, password } = req.body
    const user = {
        _id: "user-" + nanoid(),
        username: email,
        email,
        password,
        profileUrl: "",
        deleted: 0,
        collectedProjectIds: []
    }
    const project = {
        _id: "project-" + nanoid(),
        title: "Personal",
        createdTime: new Date(),
        deleted: 0,
        createrId: user._id,
        participants: [user._id],
    }
    user.collectedProjectIds = [project._id]
    const taskgroup = {
        _id: `taskgroup-${nanoid()}`,
        title: "Planning",
        createdTime: new Date(),
        deleted: 0,
        createrId: user._id,
        projectId: project._id
    }
    const taskgroup2 = {
        _id: `taskgroup-${nanoid()}`,
        title: "In progress",
        createdTime: new Date(),
        deleted: 0,
        createrId: user._id,
        projectId: project._id
    }
    const taskgroup3 = {
        _id: `taskgroup-${nanoid()}`,
        title: "Done",
        createdTime: new Date(),
        deleted: 0,
        createrId: user._id,
        projectId: project._id
    }
    try {
        await UserService.addUser(user)
        await ProjectService.addProject(project)
        await TaskGroupService.addTaskGroup(taskgroup)
        await TaskGroupService.addTaskGroup(taskgroup2)
        await TaskGroupService.addTaskGroup(taskgroup3)
        res.json({
            msg: "Added successfully"
        })
    } catch (error) {
        res.json({
            msg: error
        })
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.query
        const token = await UserService.login(email, password)
        if (!token){
            res.json({
                code: 2000,
                msg: "failture happened"
            })
        }
        res.cookie('token', token, { maxAge: config.token.validTime * 1000 })
        res.json({
            code: 1000,
            data: token
        })
    } catch (error) {

    }
}

async function getUsersByUserIds(req, res){
    const { userIds } = req.body
    try {
        const users = await UserService.getUsersByUserIds(userIds)
        res.json({
            data: users
        })
    } catch (error) {
        
    }
}

async function updateUserByUserId(req, res){
    const requestBody = req.body.user
    console.log(requestBody)
    try {
        const data = await UserService.updateUserByUserId(requestBody)
        res.json({
            data: data
        })
    } catch (error) {
        
    }
}

async function getUsersByKeyword(req, res){
    const { keyword } = req.query
    console.log(keyword)
    try {
        const users = await UserService.getUsersByKeyword(keyword)
        res.json({
            data: users
        })
    } catch (error) {
        
    }
}

module.exports = {
    addUser,
    login,
    getUsersByUserIds,
    updateUserByUserId,
    getUsersByKeyword
}