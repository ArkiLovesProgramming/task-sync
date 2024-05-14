const express = require('express');
const { addUser, login, getUsersByUserIds, updateUserByUserId, getUsersByKeyword } = require('../controller/UserController')


const router = express.Router();

router.post('/addUser', addUser);
router.get('/login', login)
router.post('/getUsersByUserIds', getUsersByUserIds)
router.post('/updateUserByUserId', updateUserByUserId)
router.get('/getUsersByKeyword', getUsersByKeyword)

module.exports = router