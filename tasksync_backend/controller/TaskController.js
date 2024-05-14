const TaskService = require('../service/TaskService')
const JWTService = require('../service/JWTService')
const { nanoid } = require('nanoid')

async function getTasksByTGId(req, res) {
    const { taskgroupId } = req.query
    const tasks = await TaskService.getTasksByTGId(taskgroupId)
    res.json({
        data: tasks
    })
}

async function addTask(req, res) {
    try {
        const { token } = req.cookies
        const decodedToken = await JWTService.verifyToken(token)
        const userInfo = decodedToken._doc
        const { title, severity, content, tags, taskgroupId } = req.body
        const task = {
            _id: "task-" + nanoid(),
            title,
            mediaUrl: "",
            content,
            tags,
            severity,
            createdTime: new Date(),
            deleted: 0,
            createrId: userInfo._id,
            taskGroupId: taskgroupId,
        }
        res.json({
            data: await TaskService.addTask(task)
        })
    } catch (error) {
        res.json({
            msg: error,
            code: 1000
        })
    }
}

async function deleteTask(req, res){
    const {taskId} = req.query
    const rst = await TaskService.deleteTask(taskId)
    res.json({
        data: rst
    })
}

async function moveTask(req, res){
    const {taskId, targetTaskgroupId} = req.query
    const rst = await TaskService.moveTask(taskId, targetTaskgroupId)
    res.json({
        data: rst
    })
}

async function reorderTask(req, res){
    // console.log("~~~~~~~~~~")
    const { tasks } = req.body
    // console.log(tasks)
    const rst = await TaskService.reorderTask(tasks)
    res.json({
        data: rst
    })
}

module.exports = {
    getTasksByTGId,
    addTask,
    moveTask,
    deleteTask,
    reorderTask
}