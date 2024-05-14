import React, { useEffect, useCallback } from 'react'
import './index.css'
//fake data
// compone
import Task from './Task'
//mater
import { IconButton, Button } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import AddTask from '../../AddTask';
import api from '../../../common/api';
import EditIcon from '@mui/icons-material/Edit';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import PubSub from 'pubsub-js';

export default function WorkSpaceCol(props) {

    const [addingTask, setAddingTask] = React.useState(false)

    // const [tasks, setTasks] = React.useState([])

    const [isModifyingTitle, setIsModifyingTitle] = React.useState(false)

    function placeTaskToTG(_, { taskgroupId, task, index }) {

    }

    useEffect(() => {

    }, [props.mytasks])

    useEffect(() => {

    }, [])

    function toggleAddingTask() {
        setAddingTask(!addingTask)
    }

    function addOneTask(taskgroupId, task) {
        // setTasks([...tasks, task])
        props.addOneTask(taskgroupId, task)
    }

    function handleClick() {

    }

    async function toggleTtitleModifyingBox(e) {
        if (isModifyingTitle) {
            if (e.target.value !== props.taskgroup.title) {
                const taskgroup = {
                    _id: props.taskgroup._id,
                    title: e.target.value
                }
                await api.taskgroupApi.updateTaskgroup(taskgroup)
                props.updateTaskgroupTitle(props.taskgroup._id, e.target.value)
            }
        }
        setIsModifyingTitle(!isModifyingTitle)
    }

    return (
        <div className='WorkSpaceCol'>
            <div className='WorkSpaceCol_title'>
                {
                    isModifyingTitle ? (
                        <div className='WorkSpaceCol_title_modifying_box'>
                            <input autoFocus onBlur={toggleTtitleModifyingBox} type="text" defaultValue={props.taskgroup.title} />
                        </div>
                    ) : (
                        <div style={{ display: "flex", alignItems: "center" }} onDoubleClick={toggleTtitleModifyingBox}>
                            {props.taskgroup.title}
                            <EditIcon onClick={toggleTtitleModifyingBox} sx={{ height: "17px", verticalAlign: "bottom" }} />
                        </div>
                    )
                }
                <div style={{ flexGrow: 1 }}></div>
                <IconButton aria-label="more">
                    <MoreHorizIcon />
                </IconButton>
            </div>
            {
                addingTask ? (
                    <AddTask addOneTask={addOneTask} taskgroupId={props.taskgroup._id} toggleAddingTask={toggleAddingTask} />
                ) : (
                    <div className='WorkSpaceCol_add_btn'>
                        <Button onClick={toggleAddingTask} variant="outlined" endIcon={<AddIcon />}>Add a task</Button>
                    </div>
                )
            }
            <Droppable droppableId={props.droppableId}>
                {(provided, snapshot) => (
                    <div
                        style={{minHeight: "200px"}}
                        ref={provided.innerRef}
                        // style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                        {...provided.droppableProps}
                    >
                        {
                            props.mytasks !== undefined ? (
                                props.mytasks.map((item, index) => {
                                    return <Draggable key={item._id} draggableId={item._id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Task
                                                    className={`${snapshot.isDragging ? 'task_dragging' : ''}`}
                                                    key={item._id}
                                                    task={item} >
                                                </Task>
                                            </div>
                                        )}
                                    </Draggable>
                                })
                            ) : ("")
                        }
                        {provided.placeholder}
                    </div>

                )}
            </Droppable>
        </div>


    )
}
