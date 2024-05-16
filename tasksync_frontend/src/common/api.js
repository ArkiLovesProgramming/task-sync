import axios from "axios"

// const base_url = "https://letschat.api.arkilovesprogramming.com:443/api"
const base_url = "http://localhost:9000/api"
// const base_url = "https://weiblog.arkilovesprogramming.com:444/api"

// 修改 Axios 的默认配置
axios.defaults.withCredentials = true;

const userApi = {

    adduser(email, password){
        let data = {email, password}
        return axios.post(`${base_url}/user/addUser`, data)
    },
    login(email, password){
        return axios.get(`${base_url}/user/login?email=${email}&password=${password}`)
    },
    getUsersByIds(ids){
        let data = {userIds: ids}
        return axios.post(`${base_url}/user/getUsersByUserIds`, data)
    },
    updateUserByUserId(user){
        let data = {user,}
        return axios.post(`${base_url}/user/updateUserByUserId`, data)
    },
    getUsersByKeyword(keyword){
        return axios.get(`${base_url}/user/getUsersByKeyword?keyword=${keyword}`)
    }
}

const projectApi = {

    getProjects(){
        return axios.get(`${base_url}/project/getProjects`)
    },

    getProjectById(projectId){
        return axios.get(`${base_url}/project/getProjectById?projectId=${projectId}`)
    },

    addProject(title, isCollected){
        let data = {title, isCollected}
        return axios.post(`${base_url}/project/addProject`, data)
    },

    addUsersIntoProject(userIds, projectId){
        let data = {userIds, projectId}
        return axios.post(`${base_url}/project/addUsersIntoProject`, data)
    }
    
}

const taskgroupApi = {

    getTaskgroupByProjectId(projectId){
        return axios.get(`${base_url}/taskgroup/getTaskgroupByProjectId?projectId=${projectId}`)
    },

    updateTaskgroup(taskgroup){
        let data = {taskgroup,}
        return axios.post(`${base_url}/taskgroup/updateTaskgroup`, data)
    }
    
}

const taskApi = {

    getTaskByTaskgroupId(taskgroupId){
        return axios.get(`${base_url}/task/getTasksByTaskgroupId?taskgroupId=${taskgroupId}`)
    },

    // const { title, severity, content, tags, taskgroupId } = req.body
    addTask(title, severity, content, tags, taskgroupId){
        console.log("hello+" + taskgroupId)
        let data = {
            title,
            severity,
            content,
            tags,
            taskgroupId,
        }
        return axios.post(`${base_url}/task/addTask`, data)
    },

    deleteTask(taskId){
        return axios.get(`${base_url}/task/deleteTask?taskId=${taskId}`)
    },

    moveTask(taskId, targetTaskgroupId){
        return axios.get(`${base_url}/task/moveTask?taskId=${taskId}&targetTaskgroupId=${targetTaskgroupId}`)
    },

    reorderTask(tasks){
        let data = {
            tasks
        }
        return axios.post(`${base_url}/task/reorderTask`, data)
    }
    
}

const fileApi = {
    upload(formData){
        // let data = {
        //     file: file
        // }

        let config = {
            headers: {
                'Content-Type': "multipart/form-data"
            }
        }
        return axios.post(`${base_url}/file/upload`,formData, config)
    }
}

let api = { userApi, projectApi, taskgroupApi, taskApi, fileApi }
export default api
