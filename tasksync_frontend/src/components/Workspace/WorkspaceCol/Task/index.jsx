import React, { useEffect } from 'react'
import './index.css'
import { Avatar, IconButton, Chip } from '@mui/material'
// import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { stringToColor, tagProps } from "../../../../common/common"
import formatDate from '../../../../common/time';
import api from '../../../../common/api';

export default function Task(props) {

    const [creater, setCreater] = React.useState({ username: "loading" })

    useEffect(() => {
        api.userApi.getUsersByIds([props.task.createrId]).then(
            res => {
                if (res.data.data !== null) {
                    setCreater(res.data.data[0])
                }
            }
        )
    }, [props.task.createrId])

    function handleTagDelete() {

    }

    function severityColor(value) {
        if (value === "Urgent") {
            return "#ff5722"
        } else if (value === "Normal") {
            return "#9e9e9e"
        } else if (value === "Easy") {
            return "#8bc34a"
        }
    }

    return (
        <div style={{padding: "5px 0px"}}>
            <div className={`task  ${props.className}`}>
                <div style={{ backgroundColor: severityColor(props.task.severity) }} className='task_severity_circle'></div>
                <div className='task_title'>
                    <div>{props.task.title}</div>
                    <div style={{ flexGrow: 1 }}></div>
                    <IconButton aria-label="more">
                        <MoreHorizIcon />
                    </IconButton>
                </div>
                {
                    props.task.mediaUrl !== "" ? (
                        <div className='task_img'>
                            <img src={props.mediaUrl} alt="" />
                        </div>
                    ) : (
                        ""
                    )
                }
                <div className='task_content'>
                    {props.task.content}
                </div>
                <div className='task_tag_box'>
                    {
                        props.task.tags.map(item => {
                            return <Chip key={item.tagId} sx={{ ...tagProps, backgroundColor: stringToColor(item.tagname) }} label={item.tagname} onDelete={handleTagDelete} />
                        })
                    }
                </div>
                <div className='task_bottom'>
                    <div>{formatDate(new Date(props.task.createdTime))}</div>
                    <div style={{ flexGrow: 1 }}></div>
                    <Avatar sx={{ bgcolor: stringToColor(creater.username), width: 22, height: 22, fontSize: 13, margin: "0px 5px" }} children={creater.username[0]} />
                    <div style={{ width: "30%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{creater.username}</div>
                </div>
            </div>
        </div>
    )
}
