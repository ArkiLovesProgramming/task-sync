import React, { useEffect } from 'react'
import DialogBox from '../DialogBox';
//css
import "./index.css"
import ProjectSelector from './ProjectSelector'
//icon
import GradeIcon from '@mui/icons-material/Grade';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
//material
import { IconButton, AvatarGroup, Avatar, Button, Container } from '@mui/material';
import api from '../../common/api';
import { getToken, stringToColor } from '../../common/common';
import cookie from 'js-cookie';
import jwt from '../../common/jwt';
import NewProject from '../NewProject';
import PubSub from 'pubsub-js';
import Inviting from '../Inviting';
import {Divider} from '@mui/material';

export default function DashboardBanner(props) {

    const [projects, setProjects] = React.useState([])

    const [users, setUsers] = React.useState([])

    const [collectedThis, setCollectedThis] = React.useState(true)

    const [ isOpenningInviting, setIsOpenningInviting ] = React.useState(false)

    const [ isOpenningNewProjectInput, setIsOpenningNewProjectInput ] = React.useState(false)

    const {setActiveProjectId} = props
    useEffect(() => {
        api.projectApi.getProjects().then(
            res => {
                setProjects(res.data.data)
                if (res.data.data.length !== 0) {
                    const local_activeProjectId = localStorage.getItem("activeProjectId")
                    let isExisting = false;
                    res.data.data.forEach(item=>{
                        if (item._id === local_activeProjectId){
                            isExisting = true
                        }
                    })
                    if (local_activeProjectId !== undefined && isExisting){
                        setActiveProjectId(local_activeProjectId)
                    } else {
                        setActiveProjectId(res.data.data[0]._id)
                    }
                }
            }
        ).catch(e=>{
            console.log("错了", e)
        })
        PubSub.subscribe("updateProjectList", updateProjectList)
        PubSub.subscribe("updateDashboardBannerUsers", updateDashboardBannerUsers)
    }, [setActiveProjectId])

    useEffect(() => {
        if (props.activeProjectId !== "") {
            api.projectApi.getProjectById(props.activeProjectId).then(
                res => {
                    api.userApi.getUsersByIds(res.data.data.participants).then(
                        res => {
                            setUsers(res.data.data)
                            const myid = jwt.verifyToken(getToken(cookie))._doc._id
                            const me = res.data.data.filter(item=>{
                                if (item._id === myid){
                                    return true
                                }
                                return false
                            })
                            console.log(typeof me[0].collectedProjectIds)
                            if (me[0].collectedProjectIds.indexOf(props.activeProjectId) !== -1){
                                setCollectedThis(true)
                            } else {
                                setCollectedThis(false)
                            }
                        }
                    )
                }
            )
        }
    }, [props.activeProjectId])

    function updateDashboardBannerUsers(_, activeProjectId){
        console.log(activeProjectId)
        if (activeProjectId !== ""){
            api.projectApi.getProjectById(activeProjectId).then(
                res => {
                    if (res.data.data === undefined) return;
                    api.userApi.getUsersByIds(res.data.data.participants).then(
                        res => {
                            setUsers(res.data.data)
                        }
                    )
                }
            )
        } else {
            console.log("activeProjectId 空")
        }
    }

    function updateProjectList(){
        api.projectApi.getProjects().then(
            res => {
                setProjects(res.data.data)
            }
        )
    }

    function collectProject() {
        let thisuser = jwt.verifyToken(getToken(cookie))._doc
        api.userApi.getUsersByIds([thisuser._id]).then(
            res => {
                thisuser = res.data.data[0]
                let thiscollectedProjectIds = "";
                if (collectedThis) {
                    thiscollectedProjectIds = thisuser.collectedProjectIds.filter(item => {
                        if (item === props.activeProjectId) {
                            return false
                        } else {
                            return true
                        }
                    })
                } else {
                    if (thisuser.collectedProjectIds.indexOf(props.activeProjectId) === -1) {
                        thiscollectedProjectIds = [...thisuser.collectedProjectIds, props.activeProjectId]
                    } else return;
                }
                const user = {
                    _id: thisuser._id,
                    collectedProjectIds: thiscollectedProjectIds
                }
                api.userApi.updateUserByUserId(user).then(
                    res => {
                        console.log(res.data.data)
                        setCollectedThis(!collectedThis)
                    }
                )
            }
        )
    }

    function openNewProjectInput(){
        setIsOpenningNewProjectInput(true)
    }

    return (
        <Container sx={{ background: "" }} maxWidth="xl">
            {
                isOpenningNewProjectInput ? (
                    <DialogBox isDialogOpening={isOpenningNewProjectInput} setIsDialogOpening={setIsOpenningNewProjectInput}>
                        <NewProject setIsDialogOpening={setIsOpenningNewProjectInput} setActiveProjectId={props.setActiveProjectId}/>
                    </DialogBox>
                ) : ("")
            }
            {
                isOpenningInviting ? (
                    <DialogBox isDialogOpening={isOpenningInviting} setIsDialogOpening={setIsOpenningInviting}>
                        <Inviting setIsDialogOpening={setIsOpenningInviting} activeProjectId={props.activeProjectId}/>
                    </DialogBox>
                ) : ("")
            }
            <div className='dashboard_banner'>
                <ProjectSelector activeProjectId={props.activeProjectId} projects={projects} setActiveProjectId={props.setActiveProjectId} />
                <div className='like_project_btn'>
                    <IconButton onClick={collectProject} aria-label="like">
                        {
                            collectedThis ? <GradeIcon sx={{ color: "#FFDE2E" }} /> : (
                                <GradeIcon />
                            )
                        }
                    </IconButton>
                </div>
                <div className='like_project_btn'>
                    <IconButton aria-label="like" onClick={openNewProjectInput}>
                        <AddCircleOutlineIcon sx={{ color: "" }} />
                    </IconButton>
                </div>
                <div style={{ flexGrow: 1 }}></div>

                <AvatarGroup
                    spacing={1}
                    max={6}
                    sx={{
                        '& .MuiAvatar-root': { width: 30, height: 30, fontSize: 14 },
                    }}
                >
                    {
                        users.map(item => {
                            return <Avatar sx={{ bgcolor: stringToColor(`${item.username}`) }} key={item._id} alt="" children={item.username[0]} />
                        })
                    }
                    {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" /> */}
                </AvatarGroup>
                <div style={{ marginLeft: "10px" }}>
                    <Button onClick={()=>{setIsOpenningInviting(true)}} sx={{ height: 34 }} variant="outlined" endIcon={<AddCircleOutlineIcon />}>
                        Invite
                    </Button>
                </div>
            </div>
            <Divider />
        </Container>

    )
}
