//导入 jsonwebtokan
const jwt = require('jsonwebtoken');
const config = require('../config/Config')

function getToken(user) {
    // jwt.sign(数据, 加密字符串, 配置对象)
    const token = jwt.sign({
        ...user
    }, config.token.secret, {
        expiresIn: config.token.validTime //单位是 秒
    });
    return token
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.token.secret, (err, data) => {
            if (err) {
                console.log(`Failed to verify token (${token})`);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = {
    getToken,
    verifyToken
}