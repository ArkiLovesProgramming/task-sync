const monogoose = require('mongoose')
const config = require('../config/Config')

monogoose.connection.on('open', ()=>{
    console.log("Mongodb connected")
})

function connect(){
    // 重点：nodejs 的模块都是单例的，这样解释了为什么 springboot 要采用 bean 的单例模式，这是有设计思想的。
    monogoose.connect(config.db.url)
}

module.exports = {
    connect
}