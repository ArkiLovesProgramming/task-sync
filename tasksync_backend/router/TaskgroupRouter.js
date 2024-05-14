const express = require('express');
const { addTaskGroup, getTaskGroupsByPId, updateTaskgroup } = require('../controller/TaskGroupController')


const router = express.Router();

router.get('/addTaskGroup', addTaskGroup);
router.get('/getTaskgroupByProjectId', getTaskGroupsByPId);
router.post('/updateTaskgroup', updateTaskgroup);

module.exports = router