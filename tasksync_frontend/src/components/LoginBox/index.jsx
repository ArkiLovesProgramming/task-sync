import React, { useEffect } from 'react';
import './index.css'
import { Button, IconButton } from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router-dom'
import { isEmail } from '../../common/common';
import api from '../../common/api';
import PubSub from 'pubsub-js' 


export default function LoginBox() {

    const [emailValue, setEmailValue] = React.useState('')
    const [passwordValue, setPasswordValue] = React.useState('')

    const passwordInputRef = React.useRef()

    const navigate = useNavigate()

    useEffect(() => {
        // 这里的代码会在组件挂载后和每次更新后执行，类似于 componentDidUpdate

    }, []);

    function toSignup(e) {
        e.preventDefault()
        navigate('/home/signup')
    }

    function Login() {
        if (!isEmail(emailValue)) {
            console.log("email 错误")
            return;
        }
        if (passwordValue === "") {
            console.log("password empty")
            return;
        }
        api.userApi.login(emailValue, passwordValue).then(
            res => {
                console.log("I am here")
                if (res.data.code === 2000) {
                    console.log("找不到")
                } else if (res.data.code === 1000) {
                    localStorage.setItem("token", res.data.data)
                    PubSub.publish("setIsLogin", true)
                    navigate("/dashboard")
                }
            }
        )
    }

    return (
        <div className='login_box'>
            <div className='login_box_title'>
                🅃🄾🄳🄾
            </div>
            <div className='login_box_title_info'>
                <div>Login in!</div>
                <div>Login in to boost your daily efficiency!</div>
            </div>
            <div className='login_box_input_box'>
                <div className='username_input_box'>
                    <label className="login_box_lable" htmlFor="email">
                        Email
                    </label>
                    <input value={emailValue} onChange={(e) => { setEmailValue(e.target.value) }} placeholder='' id='email' type="text" />
                    <IconButton size='small' aria-label="delete" sx={{ marginRight: "2px" }}>
                        <MailOutlineIcon />
                    </IconButton>
                </div>
                <div className='username_input_box'>
                    <label className="login_box_lable" htmlFor="password">
                        Passowrd
                    </label>
                    <input ref={passwordInputRef} value={passwordValue} onChange={(e) => { setPasswordValue(e.target.value) }} id='password' placeholder='' type="password" />
                    <IconButton onClick={() => { passwordInputRef.current.type = passwordInputRef.current.type === "password" ? "text" : "password"; }} size='small' aria-label="delete" sx={{ marginRight: "2px" }}>
                        <VisibilityOutlinedIcon />
                    </IconButton>
                </div>
                <div className='forgetyourpassword'>
                    <div style={{ textAlign: "right", fontSize: "" }}>
                        <a href='$#'>
                            Forget your password?
                        </a>
                    </div>
                </div>
                <div className='submit_input_box'>
                    <Button onClick={Login} variant="contained">Login in</Button>
                </div>
            </div>
            <div className='login_box_bottom'>
                <div>New user?<a href='http://arkilovesprogramming.com' onClick={toSignup}>Switch to sign up!</a></div>
            </div>
        </div>
    )
}
