import React, { useEffect } from 'react'
import '../Workspace/WorkspaceCol/Task/index.css'
import './index.css'
import { Avatar, Button, Chip, IconButton } from '@mui/material'
// import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { tagProps, stringToColor } from '../../common/common';
import { nanoid } from 'nanoid'
import CheckIcon from '@mui/icons-material/Check';
import api from '../../common/api';
import cookie from 'js-cookie';
import jwt from '../../common/jwt';
import formatDate from '../../common/time';

export default function AddTask(props) {

    const [ titleValue, setTitleValue ] = React.useState("")
    const [ severityValue, setSeverityValue ] = React.useState("")
    const [ contentValue, setContentValue ] = React.useState("")
    const [ tags, setTags ] = React.useState([])
    const [ creater, setCreater ] = React.useState({username: "loading"})

    const { toggleAddingTask } = props

    useEffect(()=>{
        const decodedToken = jwt.verifyToken(cookie.get("token"))
        setCreater(decodedToken._doc)
    }, [])

    function handleTagDelete(tagId){
        return ()=>{
            let newTags = tags.filter(item=>{
                if (item.tagId !== tagId){
                    return true
                } 
                return false
            })
            setTags(newTags)
        }
    }

    function addTag(e){
        if (e.keyCode == 13){
            console.log([{tagId: nanoid(), tagname: e.target.value}, ...tags])
            setTags([{tagId: nanoid(), tagname: e.target.value}, ...tags])
            e.target.value = ""
        }
    }

    function confirm(){
        if (titleValue === "" || contentValue === "") return;
        console.log("props.taskgroupId" + props.taskgroupId)
        api.taskApi.addTask(titleValue, severityValue, contentValue, tags, props.taskgroupId).then(
            res=>{
                console.log(res.data.data)
                props.addOneTask(props.taskgroupId, res.data.data)
                toggleAddingTask()
            }
        )
    }

    return (
        <div className='task'>
            <div className='task_title' style={{marginBottom: 15, marginTop: 2}}>
                <div>Set a task</div>
                <div style={{ flexGrow: 1 }}></div>
            </div>
            <div className='WorkSpaceCol_add_btn'>
                <Button onClick={toggleAddingTask} sx={{ color: "#ff5722" }} variant="outlined" endIcon={<CloseIcon />}>Cancel</Button>
            </div>
            <div className='task_title'>
                <div style={{width: "100%"}}>
                    <input onChange={(e)=>{setTitleValue(e.target.value)}} value={titleValue} className='add_task_input' type="text" placeholder='Title' />
                </div>
            </div>
            <div className='task_severity_circle'  style={{marginTop: 10}}></div>
            <RadioGroup
                row
                aria-labelledby="demo-form-control-label-placement"
                name="position"
                defaultValue="top"
                sx={{marginBottom: "10px"}}
                value={severityValue}
                onChange={(e)=>{ setSeverityValue(e.target.value)}}
            >
                <FormControlLabel
                    value="Urgent"
                    control={<Radio />}
                    label="Urgent"
                    labelPlacement="bottom"
                    size={"small"}
                />
                <FormControlLabel
                    value="Normal"
                    control={<Radio />}
                    label="Normal"
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    value="Easy"
                    control={<Radio />}
                    label="Easy"
                    labelPlacement="bottom"
                />
            </RadioGroup>
            {/* <div className='task_img'>
                <img src="https://css-tricks.com/wp-content/uploads/2018/10/02-items.svg" alt="" />
            </div> */}
            <div className='WorkSpaceCol_add_btn' style={{marginTop: "10px"}}>
                <Button sx={{ color: "" }} variant="outlined" endIcon={<FileUploadIcon />}>Upload</Button>
            </div>
            <div className='task_content' style={{padding: "5px 0px"}}>
                <input value={contentValue} onChange={(e)=>{setContentValue(e.target.value)}} placeholder='Content' type="text" className='add_task_input' />
            </div>
            <div className='task_tag_box'>
                {
                    tags.map(item=>{
                        return <Chip key={item.tagId} sx={{...tagProps, backgroundColor: stringToColor(item.tagname)}} label={item.tagname} onDelete={handleTagDelete(item.tagId)} />
                    })
                }
                {/* <div className='task_tag_item'>
                <AddIcon sx={{width: 10, height: 10}} />
            </div> */}
            </div>
            <div className='task_content' style={{padding: "5px 0px"}}>
                <input onKeyUp={addTag} placeholder='Add tag' type="text" className='add_task_input' />
            </div>
            <div className='WorkSpaceCol_add_btn'>
                <Button onClick={confirm} sx={{ color: "#8bc34a" }} variant="outlined" endIcon={<CheckIcon />}>Comfirm</Button>
            </div>
            <div className='task_bottom'>
                <div>{formatDate(new Date())}</div>
                <div style={{ flexGrow: 1 }}></div>
                <Avatar sx={{ bgcolor: stringToColor(creater.username), width: 22, height: 22, fontSize: 13, margin: "0px 5px" }} children={creater.username[0]}/>
                <div style={{width: "30%", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{creater.username}</div>
            </div>
        </div>
    )
}
