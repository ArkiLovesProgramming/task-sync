import './index.css'

import React from 'react'
import { Button } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import GradeIcon from '@mui/icons-material/Grade';
import api from '../../common/api';
import PubSub from 'pubsub-js';

export default function NewProject(props) {

    const [ projectnameValue, setProjectnameValue ] = React.useState("")
    const [ isCollected, setIsCollected ] = React.useState("false")

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    function createProject(){
        if (projectnameValue === "") return;
        api.projectApi.addProject(projectnameValue, isCollected).then(
            res=>{
                PubSub.publish("updateProjectList")
                props.setActiveProjectId(res.data.data[0]._id)
                props.setIsDialogOpening(false)
            }
        )
    }

    return (
        <div className='NewPorject'>
            <div className='newproject_title'>New project <Checkbox value={isCollected} onChange={e=>{setIsCollected(e.target.checked)}} size="small" {...label} icon={<GradeIcon />} checkedIcon={<GradeIcon sx={{ color: "#FFDE2E" }}/>} /></div>
            <div className='newproject_input_box_label'>
                <label htmlFor="projectnameValue">Porject name</label>
            </div>
            <div className='newproject_input_box'>
                <input value={projectnameValue} onChange={(e) => { setProjectnameValue(e.target.value) }} placeholder='Porject name' id='projectnameValue' type="text" />
            </div>
            <div>
            </div>
            <div style={{flexGrow: 1}}></div>
            <Button onClick={createProject} sx={{width: "100%"}} variant="contained">Create</Button>
        </div>
    )
}
