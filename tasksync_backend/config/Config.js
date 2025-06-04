module.exports = {
    server: {
        port: process.env.TASKSYNC_BACKEND_PORT || 3000
    },
    db: {
        url: process.env.MONGO_DB_URL || "mongodb+srv://arki:arki12345678@chat-cluster0.vgufh8j.mongodb.net/todo?retryWrites=true&w=majority&appName=chat-cluster0"
    },
    token: {
        secret: "todo_arki_node.js",
        validTime: 3000
    },
    cors: {
        origin: ["http://tasksync.arkilovesprogramming.com", "https://tasksync.arkilovesprogramming.com", "tasksync.arkilovesprogramming.com", "http://localhost:3000"],
    }
}