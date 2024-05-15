module.exports = {
    server: {
        port: 9000
    },
    db: {
        url: "mongodb+srv://arki:arki12345678@chat-cluster0.vgufh8j.mongodb.net/todo?retryWrites=true&w=majority&appName=chat-cluster0"
    },
    token: {
        secret: "todo_arki_node.js",
        validTime: 3000
    },
    cors: {
        origin: ["http://tasksync.arkilovesprogramming.com:80", "https://tasksync.arkilovesprogramming.com:443"]
    }
}