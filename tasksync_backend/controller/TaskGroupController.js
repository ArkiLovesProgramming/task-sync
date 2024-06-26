const { nanoid } = require('nanoid')
const TaskGroupService = require('../service/TaskGroupService')

async function addTaskGroup(req, res) {
    try {
        let token;
        if (req.cookies.token !== undefined){
            token = req.cookies.token
        } else if(req.headers.token !== undefined){
            token = req.headers.token
        } else{
            res.json({
                code: 1000,
                msg: "Token is undefined"
            })
        }
        const decodedToken = JWTService.verifyToken(token)
        const { title, projectId } = req.query
        const taskGroup = {
            _id: "taskgroup-" + nanoid(),
            title,
            createdTime: new Date(),
            deleted: 0,
            createrId: decodedToken._id,
            projectId,
            order: 0    // 默认不排序，后续可以自己排序
        }
        const data = await TaskGroupService.addTaskGroup(taskGroup)
        res.json({
            data: data
        })
    } catch (error) {
        res.json({
            msg: error,
            code: 1000
        })
    }
}

async function getTaskGroupsByPId(req, res) {
    const { projectId } = req.query
    const taskgroups = await TaskGroupService.getTaskgroupsByPId(projectId)
    res.json({
        data: taskgroups
    })
}

async function updateTaskgroup(req, res){
    const requestBody = req.body.taskgroup
    const rst = await TaskGroupService.updateTaskgroup(requestBody)
    res.json({
        data: rst
    })
}

module.exports = {
    addTaskGroup,
    getTaskGroupsByPId,
    updateTaskgroup
}