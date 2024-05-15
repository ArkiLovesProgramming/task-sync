const JWTService = require('../service/JWTService')

async function upload(req, res){
    // const { filename } = req.body
    console.log(req.file)
}

module.exports = {
    upload
}