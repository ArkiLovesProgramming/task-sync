const ProjectService = require('../service/ProjectService')
const UserService = require('../service/UserService')
const TaskGroupService = require('../service/TaskGroupService')
const JWTService = require('../service/JWTService')
const { nanoid } = require('nanoid')

// 需要 title
async function addProject(req, res) {
    try {
        const { token } = req.cookies
        const decodedToken = await JWTService.verifyToken(token)
        const userInfo = decodedToken._doc
        const { title, isCollected } = req.body
        const project = {
            _id: "project-" + nanoid(),
            title,
            createdTime: new Date(),
            deleted: 0,
            createrId: userInfo._id,
            participants: [userInfo._id]
        }
        const taskgroup = {
            _id: `taskgroup-${nanoid()}`,
            title: "Planning",
            createdTime: new Date(),
            deleted: 0,
            createrId: userInfo._id,
            projectId: project._id
        }
        const taskgroup2 = {
            _id: `taskgroup-${nanoid()}`,
            title: "In progress",
            createdTime: new Date(),
            deleted: 0,
            createrId: userInfo._id,
            projectId: project._id
        }
        const taskgroup3 = {
            _id: `taskgroup-${nanoid()}`,
            title: "Done",
            createdTime: new Date(),
            deleted: 0,
            createrId: userInfo._id,
            projectId: project._id
        }
        const rst = await ProjectService.addProject(project)
        await TaskGroupService.addTaskGroup(taskgroup)
        await TaskGroupService.addTaskGroup(taskgroup2)
        await TaskGroupService.addTaskGroup(taskgroup3)
        let user;
        let rst2;
        if (isCollected){
            user = await UserService.getUserById(userInfo._id)
            rst2 =  UserService.updateUserByUserId({_id: userInfo._id, collectedProjectIds: [...user.collectedProjectIds, project._id]})
        }
        res.json({
            data: [rst, rst2]
        })
    } catch (error) {
        console.log(error)
        res.json({
            code: 1000,
            msg: "Fail to preceed"
        })
    }
}

// 根据 participants 和 createId 匹配
async function getProjectByUserId(req, res) {
    try {
        const { token } = req.cookies
        console.log("The received cookies is ", req.cookies)
        const decodedToken = await JWTService.verifyToken(token)
        const userInfo = decodedToken._doc
        const projects = await ProjectService.getProjectByUserId(userInfo._id)
        res.json({
            data: projects
        })
    } catch (error) {
        res.json({
            msg: error,
            code: 1000
        })
    }
}

async function getProjectById(req, res) {
    try {
        const { projectId } = req.query
        const project = await ProjectService.getProjectById(projectId)
        res.json({
            data: project
        })
    } catch (error) {

    }
}

async function addUsersIntoProject(req, res) {
    try {
        const { userIds, projectId } = req.body
        const rst = await ProjectService.addUsersIntoProject(userIds, projectId)
        res.json({
            data: rst
        })
    } catch (error) {
        
    }
}

module.exports = {
    addProject,
    getProjectByUserId,
    getProjectById,
    addUsersIntoProject
}