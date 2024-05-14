const TaskModel = require('../model/TaskModel')

async function addTask(task) {
    const data = await TaskModel.create({
        ...task
    })
    return task
}

async function getTasksByTGId(taskgroupId) {
    try {
        const tasks = TaskModel.find({
            taskGroupId: taskgroupId,
            deleted: 0
        }).sort({ order: 1 })
        return tasks
    } catch (error) {
        console.log(err)
        return;
    }
}

async function deleteTask(taskId){
    try {
        const rst = await TaskModel.updateOne({
            _id: taskId
        }, {
            deleted: 1
        })
        return rst
    } catch (error) {
        return error
    }
}

async function moveTask(taskId, targetTaskgroupId){
    try {
        const rst = await TaskModel.updateOne({
            _id: taskId,
            deleted: 0
        }, {
            taskGroupId: targetTaskgroupId
        })
        return rst
    } catch (error) {
        return error
    }
}

async function reorderTask(tasks){
    try {
        tasks.forEach(async (item, index)=>{
            console.log("~")
            await TaskModel.updateOne({
                _id: item._id
            }, {
                order: index
            })
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addTask,
    getTasksByTGId,
    deleteTask,
    moveTask,
    reorderTask
}