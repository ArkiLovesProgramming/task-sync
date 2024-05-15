import React from 'react'
// CSs
// import "./index.css"
//component
import { Container } from '@mui/material'
import { IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function NewProject() {

    const [ projectNameValue, setProjectNameValue ] = React.useState("")

    return (
        <div className='main_page'>
            <div style={{ position: "relative", height: 40 }}>
                <div className='newproject_banner' style={{ position: "fixed", width: "100%", zIndex: 1 }}>

                    <Container sx={{ background: "" }} maxWidth="lg">
                        <IconButton size='' aria-label="delete" sx={{}}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Container>
                </div>
            </div>
            <Container sx={{ background: "" }} maxWidth="lg">
                <div className='newproject_body' style={{ marginTop: "0px" }}>
                    <div className='newproject_component'>
                        <div style={{fontSize: 20, fontWeight: "bolder", marginBottom: 40}}>New project</div>
                        <div className='newproject_input_outter_box'>
                            <div className='newproject_input_box'>
                                <label className="newproject_input_label" htmlFor="project_name">
                                    Project_name
                                </label>
                                <input value={projectNameValue} onChange={(e) => { setProjectNameValue(e.target.value) }} placeholder='' id='project_name' type="text" />
                                <div style={{width: 10}}></div>
                            </div>
                            <div className='newproject_input_box' style={{marginTop: 40}}>
                                <label className="newproject_input_label" htmlFor="Taskgroup">
                                    Taskgroup
                                </label>
                                <input placeholder='' id='Taskgroup' type="text" />
                                <div style={{width: 10}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
