//导入 jsonwebtokan
import { jwtDecode } from "jwt-decode";
import { config } from '../common/config';

function verifyToken(token) {
    try {
        const decodedToken = jwtDecode(token)
        return decodedToken
    } catch (error) {
        console.log(error)
        return ;
    }
}

export default {
    verifyToken
}