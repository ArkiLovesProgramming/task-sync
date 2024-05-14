const express = require('express');
const { getTasksByTGId, addTask, deleteTask, moveTask, reorderTask } = require('../controller/TaskController')


const router = express.Router();

router.get('/getTasksByTaskgroupId', getTasksByTGId);
router.post('/addTask', addTask);
router.get('/deleteTask', deleteTask)
router.get('/moveTask', moveTask)
router.post('/reorderTask', reorderTask)

module.exports = router