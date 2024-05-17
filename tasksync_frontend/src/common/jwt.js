//导入 jsonwebtokan
import { jwtDecode } from "jwt-decode";

function verifyToken(token) {
    try {
        console.log("token", token)
        const decodedToken = jwtDecode(token)
        return decodedToken
    } catch (error) {
        console.log(error)
        return ;
    }
}

let jwt = {
    verifyToken
}

export default jwt