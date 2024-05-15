import { Navigate, useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthRouter } from "./AuthRouter"
import Profile from "../pages/Profile";
// 使用路由懒加载（lazy）
const Main = lazy(() => import("../pages/Main"));
const Login = lazy(() => import("../pages/Login"));
const Notfound = lazy(() => import("../pages/Notfound"));
const LoginBox = lazy(() => import("../components/LoginBox"));
const SignupBox = lazy(() => import("../components/SignupBox"));


const router = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/dashboard",
    element: <AuthRouter><Main /></AuthRouter>,
  },
  // {
  //   path: "/dashboard/newproject",
  //   element:<AuthRouter><NewProject /></AuthRouter>
  // },
  {
    path: "/home",
    element: <Login />,
    children: [
        {
            path: "login",
            element: <LoginBox />
        },
        {
            path: "signup",
            element: <SignupBox />
        },
        {
            path: "",
            element: <Navigate to="login" />
        },
    ]
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "*",
    element: <Notfound />
  }
];

const Router = () => (
  <Suspense fallback={<div>loading</div>}>{useRoutes(router)}</Suspense>
);

export default Router;
