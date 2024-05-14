// 路由守卫
// 判断token是否存在（如果存在跳转主页，如果不存在跳转登录页面）
import { Navigate } from "react-router-dom"
import cookie from "js-cookie"
 
// 获取token方法
const getToken = () => {
    const token = cookie.get("token")
    return token
}
 
 
 
// 创建一个高阶组件，高阶组件就是 把一个组件当做另一个组件的参数传入 然后通过判断 返回新的组件
// 下面的 AuthRouter 就是一个高阶组件
 
function AuthRouter( {children} ) {
    // 获取token
    const token = getToken()
    // 判断token是否存在 存在直接渲染主页面
    if (token) {
        return <>{children}</>
    } else {
        return <Navigate to={'/home/login'}></Navigate>  //没有token跳转登录页面
    }
}
export { AuthRouter }