const express = require('express')
const UserRouter = require('./router/UserRouter')
const cors = require('cors');
const ProjectRouter = require('./router/ProjectRouter')
const TaskgroupRouter = require('./router/TaskgroupRouter')
const TaskRouter = require('./router/TaskRouter')
const FileRouter = require('./router/FileRouter')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MongoServer = require('./db/MongoServer')
// const config = require('./config/Config')

const app = express()
const jsonParser = bodyParser.json()

MongoServer.connect()

// 解析 post 的 body
app.use(jsonParser)

// cookie
app.use(cookieParser())

// 全局配置跨域
app.use(cors({
	origin: ["http://tasksync.arkilovesprogramming.com", "https://tasksync.arkilovesprogramming.com", "http://localhost:3000", "https://tasksync.arkilovesprogramming.com:443", "http://tasksync.arkilovesprogramming.com:80"],
	credentials: true,
	allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "token"],
	methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use('/api/user', UserRouter)
app.use('/api/project', ProjectRouter)
app.use('/api/taskgroup', TaskgroupRouter)
app.use('/api/task', TaskRouter)
app.use('/api/file', FileRouter)
// app.use('/api', DashboardRouter)

module.exports = app