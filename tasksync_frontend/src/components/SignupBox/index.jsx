import React from 'react'
import './index.css'
import { Button, IconButton } from '@mui/material'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router-dom';
import { isEmail } from '../../common/common';
import api from '../../common/api';

export default function SignupBox() {

    const [ emailValue, setEmailValue ] = React.useState('')
    const [ passwordValue, setPasswordValue ] = React.useState('')
    const [ rePasswordValue, setRePasswordValue ] = React.useState('')

    const passwordInputRef = React.useRef()
    const rePasswordInputRef = React.useRef()

    const navigate = useNavigate()

    function toLogin(e){
        e.preventDefault()
        navigate('/home/login')
    }

    function signup(){
        if (!isEmail(emailValue)){
            console.log("email wrong")
        }
        if (passwordValue === ""){
            console.log("password empty")
        }
        if (passwordValue !== rePasswordValue){
            console.log("verify fails")
        }
        api.userApi.adduser(emailValue, passwordValue).then(
            res=>{
                console.log(res)
                navigate('/home/login')
            }
        )
    }

    return (
        <div className='login_box'>
            <div className='login_box_title'>
                🅃🄾🄳🄾
            </div>
            <div className='login_box_title_info'>
                <div>Sign up!</div>
                <div>Todo is to boost your daily efficiency</div>
            </div>
            <div className='login_box_input_box'>
                <div className='username_input_box'>
                    <label className="login_box_lable" htmlFor="email">
                        Email
                    </label>
                    <input value={emailValue} onChange={(e)=>{setEmailValue(e.target.value)}} placeholder='' id='email' type="text" />
                    <IconButton size='small' aria-label="delete" sx={{marginRight: "2px"}}>
                        <MailOutlineIcon />
                    </IconButton>
                </div>
                <div className='username_input_box'>
                    <label className="login_box_lable" htmlFor="password">
                        Passowrd
                    </label>
                    <input ref={passwordInputRef} value={passwordValue} onChange={(e)=>{setPasswordValue(e.target.value)}} placeholder='' type="password" id='password'/>
                    <IconButton onClick={()=>{passwordInputRef.current.type = passwordInputRef.current.type === "password" ? "text" : "password";}} size='small' aria-label="delete" sx={{marginRight: "2px"}}>
                        <VisibilityOutlinedIcon />
                    </IconButton>
                </div>
                <div className='username_input_box'>
                    <label className="login_box_lable" htmlFor="repassword">
                        Repassowrd
                    </label>
                    <input ref={rePasswordInputRef} value={rePasswordValue} onChange={(e)=>{setRePasswordValue(e.target.value)}} placeholder='' type="password" id='repassword' />
                    <IconButton onClick={()=>{rePasswordInputRef.current.type = rePasswordInputRef.current.type === "password" ? "text" : "password";}} size='small' aria-label="delete" sx={{marginRight: "2px"}}>
                        <VisibilityOutlinedIcon />
                    </IconButton>
                </div>
                <div>
                    <div style={{textAlign: "right", fontSize: "13px"}}>
                        {/* <a href='$#'>
                            Forget your password?
                        </a> */}
                    </div>
                </div>
                <div className='submit_input_box'>
                    <Button onClick={signup} size='' variant="contained">Sign up</Button>
                </div>
            </div>
            <div className='login_box_bottom'>
                <div>Have account elready? <a onClick={toLogin} href='###'>Switch to login in!</a></div>
            </div>
        </div>
    )
}
