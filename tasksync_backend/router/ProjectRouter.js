const express = require('express');
const { addProject, getProjectByUserId, getProjectById, addUsersIntoProject } = require('../controller/ProjectController')


const router = express.Router();

router.post('/addProject', addProject);
router.get('/getProjects', getProjectByUserId)
router.get('/getProjectById', getProjectById)
router.post('/addUsersIntoProject', addUsersIntoProject)

module.exports = router