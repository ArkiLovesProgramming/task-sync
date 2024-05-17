// React
import React, { Fragment, useEffect } from 'react'
// Css
import './index.css'
// Material
import { Avatar, Button } from '@mui/material';
// js
import { stringToColor } from "../../common/common"
import { useNavigate } from 'react-router-dom';
import jwt from '../../common/jwt';
import cookie from 'js-cookie'
import PubSub from 'pubsub-js'
import { getToken } from '../../common/common';


export default function Header() {

    const [isLogin, setIsLogin] = React.useState(false)
    const [userInfo, setUserInfo] = React.useState({ username: "loading" })

    useEffect(() => {
        if (isLogin) {
            let token = getToken(cookie)
            if (token === null) {
                setIsLogin(false)
                return;
            }
            const decodedToken = jwt.verifyToken(token)
            if (decodedToken !== undefined) {
                setUserInfo({ ...decodedToken._doc })
                PubSub.publish("isVerified", true)
            }
        }
    }, [isLogin])

    useEffect(() => {
        let token = getToken(cookie)
        if (token !== null && jwt.verifyToken(token) !== undefined) {
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
        PubSub.subscribe("setIsLogin", setIsLogin)
    }, [])

    const navigate = useNavigate()

    function toDashboard() {
        navigate('/dashboard')
    }

    return (
        <div className='header'>
            <div>
                <div className='header_box'>
                    <div className='header_item'>
                        <div className='web_icon'>
                            🅃🄾🄳🄾
                        </div>
                    </div>
                    <div style={{ flexGrow: 1 }}></div>
                    {
                        isLogin ? (
                            <Fragment>
                                <div className='header_item'>
                                    <Button onClick={toDashboard} sx={{ color: "white", height: 36, margin: "4px 10px 4px 0px" }} className='header_menu_item'>Dashboard</Button>
                                </div>
                                <div className='header_item'>
                                    <Button variant="outlined" style={{ padding: "0px", border: "none" }}>
                                        <div className='header_item_btn'>
                                            <Avatar sx={{ bgcolor: stringToColor(`${userInfo.username}`) }}>{userInfo.username[0]}</Avatar>
                                        </div>
                                    </Button>
                                </div>
                            </Fragment>
                        ) : (
                            ""
                        )
                    }
                </div>
            </div>
        </div>
    )
}
