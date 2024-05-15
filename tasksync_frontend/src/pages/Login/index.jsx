import React from 'react'
import './index.css'
import { Outlet } from "react-router-dom";

export default function Login() {
  return (
    <div className='login_page'>
        <div className='Login_page_box'>
            <Outlet/>
            {/* <LoginBox/> */}
            {/* <SignupBox/> */}
        </div>
        <div className='login_page_ill'>
            <img src="/static/img/1.svg" alt="" />
            <img src="/static/img/2.svg" alt="" />
            <img src="/static/img/3.svg" alt="" />
            <img src="/static/img/4.svg" alt="" />
            <img src="/static/img/5.svg" alt="" />
            <img src="/static/img/6.svg" alt="" />
            <img src="/static/img/1.svg" alt="" />
            <img src="/static/img/2.svg" alt="" />
            <img src="/static/img/3.svg" alt="" />
            <img src="/static/img/4.svg" alt="" />
            <img src="/static/img/5.svg" alt="" />
            <img src="/static/img/6.svg" alt="" />
        </div>
    </div>
  )
}
