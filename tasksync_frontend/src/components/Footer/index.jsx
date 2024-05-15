import React from 'react'
import './index.css'
import Divider from '@mui/material/Divider';
import { Container } from '@mui/material';

export default function Footer() {
    return (
        <div className='myfooter'>
            <Divider variant="middle" />
            <Container maxWidth="lg">
                <div className='myfooter_content'>
                    <div className='mc_item'><a rel="noreferrer" href='https://github.com/ArkiLovesProgramming/task-sync' target="_blank">Source code at Github</a></div>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <div className='mc_item'><a rel="noreferrer" href='https://www.linkedin.com/in/arkilovesprogramming/' target="_blank">Auther's Linkedin profile</a></div>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <div className='mc_item'><a rel="noreferrer" href='https://arkilovesprogramming.com/' target="_blank">Auther's blog</a></div>
                    <div style={{flexGrow: 1}}></div>
                    <div style={{fontWeight: "bolder", fontSize: "18px"}}>🅃🄾🄳🄾</div>
                    <div className='mc_item'>Powered by React.js, Redux, Node.js, Material UI...</div>
                </div>
            </Container>
        </div>
    )
}
