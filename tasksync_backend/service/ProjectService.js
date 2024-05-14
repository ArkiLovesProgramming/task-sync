const ProjectModel = require('../model/ProjectModel')

async function addProject(project) {
    try {
        const data = await ProjectModel.create({
            ...project
        })
        console.log(`Project ${project} has been inserted successfully`)
        return project
    } catch (error) {
        console.log(error)
    }
}

// 根据 participants 和 createId 匹配
async function getProjectByUserId(userId) {
    try {
        const projects = await ProjectModel.find({
            $or: [{
                createrId: userId,
            }, {
                participants: { $in : [userId] }
            }],
            deleted: 0
        })
        return projects
    } catch (error) {
        console.log(error)
        return;
    }
}

async function getProjectById(projectId){
    try {
        const project = ProjectModel.findOne({
            _id: projectId,
            deleted: 0
        })
        return project
    } catch (error) {
        console.log(error)
        return;
    }
}

 async function addUsersIntoProject(userIds, projectId){
    const project = await ProjectModel.findById(projectId)
    let new_participants = project.participants
    userIds.forEach(userId=>{
        if (project.participants.indexOf(userId) === -1){
            new_participants = [...new_participants, userId]
        }
    })
    const rst = await ProjectModel.updateMany({
        _id: projectId
    }, {
        participants: new_participants
    })
    return rst
 }

module.exports = {
    addProject,
    getProjectByUserId,
    getProjectById,
    addUsersIntoProject
}