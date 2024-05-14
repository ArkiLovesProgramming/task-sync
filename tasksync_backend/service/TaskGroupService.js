const TaskGroupModel = require('../model/TaskGroupModel')

async function addTaskGroup(taskgroup) {
    try {
        const data = await TaskGroupModel.create({
            ...taskgroup
        })
        console.log(`Taskgroup ${taskgroup} has been inserted successfully`)
        return data
    } catch (error) {
        console.log(error)
    }
}

// 按照 order排序
async function getTaskgroupsByPId(projectId) {
    try {
        const taskgroups = await TaskGroupModel.find({
            projectId: projectId,
            deleted: 0
        })
        return taskgroups
    } catch (error) {
        console.log(error)
        return;
    }
}

async function updateTaskgroup(requestBody){
    try {
        const taskroupId = requestBody._id
        delete requestBody['_id']
        const data = await TaskGroupModel.updateOne({
            _id: taskroupId
        }, {
            ...requestBody
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addTaskGroup,
    getTaskgroupsByPId,
    updateTaskgroup
}