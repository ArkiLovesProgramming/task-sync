import React, { useEffect } from 'react'
// CSs
import "./index.css"
//component
import DashboardBanner from '../../components/DashboardBanner'
import Workspace from '../../components/Workspace'
import { Container } from '@mui/material'
import Footer from '../../components/Footer'

export default function Main() {

    const [activeProjectId, setActiveProjectId] = React.useState("")

    useEffect(() => {
        if (activeProjectId === "") return;
        localStorage.setItem("activeProjectId", activeProjectId)
    }, [activeProjectId])

    return (
        <div className='main_page'>
            <div style={{ position: "relative", height: 56 }}>
                <div style={{ position: "fixed", width: "100%", zIndex: 1 }}>
                    <DashboardBanner setActiveProjectId={setActiveProjectId} activeProjectId={activeProjectId} />
                </div>
            </div>
            <Container sx={{ background: "" }} maxWidth="xl">
                <div style={{ marginTop: "0px" }}>
                    <Workspace activeProjectId={activeProjectId} />
                </div>
            </Container>
            <div style={{ flexGrow: 1 }}></div>
            <Footer />
        </div>
    )
}
