import React from 'react'
import './index.css'
import { Container } from '@mui/material'
import ProfileInfo from '../../components/ProfileInfo'

export default function Profile() {
    return (
        <div className='profile_page'>
            <Container sx={{ background: "" }} maxWidth="xl">
                <div style={{width: "fit-content"}}>
                    <ProfileInfo />
                </div>
            </Container>
        </div>
    )
}
