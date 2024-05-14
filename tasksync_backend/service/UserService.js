const UserModel = require('../model/UserModel')
const JWTService = require('../service/JWTService')

async function addUser(user) {
    const data = await UserModel.create({
        ...user
    })
}

async function login(accountNumber, password) {
    //根据 id 查询数据
    try {
        const user = await UserModel.findOne({
            $and: [{ $or: [{ email: accountNumber }, { username: accountNumber }] }, { password }],
            deleted: 0
        });
        if (user != null) {
            return JWTService.getToken(user)
        } else {
            return;
        }
    } catch (error) {
        console.log(error)
        return;
    }
}

async function getUserById(userId) {
    const data = await UserModel.findOne({
        _id: userId,
        deleted: 0
    })
    return data
}

async function getUsersByUserIds(userIds) {
    try {
        const users = await UserModel.find({
            _id: { $in: userIds },
            deleted: 0
        })
        return users;
    } catch (error) {
        return;
    }
}

async function updateUserByUserId(requestBody) {
    try {
        const userId = requestBody._id
        delete requestBody['_id']
        const data = await UserModel.updateOne({
            _id: userId
        }, {
            ...requestBody
        })
        return data
    } catch (error) {
        console.log(error)
    }
}

async function getUsersByKeyword(keyword) {
    const regex = new RegExp(keyword, 'i');
    const users = await UserModel.find({ username: regex, deleted: 0 });
    return users
}

module.exports = {
    addUser,
    login,
    getUserById,
    getUsersByUserIds,
    updateUserByUserId,
    getUsersByKeyword
}