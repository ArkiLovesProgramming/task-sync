import React, { useEffect, useState, useRef } from 'react'
//css
import './index.css'
// fd
import { tasks } from '../../common/data'
//component
import WorkSpaceCol from './WorkspaceCol'
import api from '../../common/api'
import { DragDropContext } from 'react-beautiful-dnd';

export default function Workspace(props) {

  // 是一个对象集合，对象里面有 taskgroup，以及其对应的 tasks
  const [taskgroups, setTaskgroups] = useState([])

  useEffect(() => {
    const { activeProjectId } = props
    if (activeProjectId !== "") {
      api.taskgroupApi.getTaskgroupByProjectId(activeProjectId).then(
        async res => {
          let newtaskgroups = []
          res.data.data.forEach((item, index) => {
            newtaskgroups[index] = {
              taskgroupId: item._id,
              taskgroup: item
            }
          })
          for (let i = 0; i < newtaskgroups.length; i++) {
            let res = await api.taskApi.getTaskByTaskgroupId(newtaskgroups[i]["taskgroup"]._id)
            newtaskgroups[i]["tasks"] = res.data.data
          }
          setTaskgroups(newtaskgroups)
        }
      )
    }
  }, [props.activeProjectId])

  function updateTaskgroupTitle(taskgroupId, newTitle) {
    let new_taskgroups = taskgroups.map(item => ({
      taskgroupId: item.taskgroupId,
      taskgroup: { ...item.taskgroup }, // 对 taskgroup 进行浅拷贝
      tasks: [...item.tasks] // 对 tasks 进行浅拷贝
    }));
    new_taskgroups.forEach(item => {
      if (item.taskgroupId === taskgroupId) {
        item.taskgroup.title = newTitle
      }
    })
    setTaskgroups(new_taskgroups)
  }

  function addOneTask(taskgroupId, task) {
    let newtaskgroups = taskgroups.map(item => {
      if (item.taskgroup._id === taskgroupId) {
        let newtasks = [...item.tasks, task]
        return { taskgroup: item.taskgroup, tasks: newtasks }
      }
      return item
    })
    setTaskgroups(newtaskgroups)
  }

  async function onDragEnd(result) {
    const { destination, source } = result
    console.log("destination", destination, "source", source)

    if (!destination){
      return;
    }

    if (destination.droppableId === source.droppableId && source.index === destination.index){
      return;
    }

    //++++++++
    // 这样是深拷贝，我想要浅拷贝
    // let newtaskgroups = Array.from(taskgroups) //无限浅拷贝～
    let originalTaskgroupsState = taskgroups.map(item => ({
      taskgroupId: item.taskgroupId,
      taskgroup: { ...item.taskgroup }, // 对 taskgroup 进行浅拷贝
      tasks: [...item.tasks] // 对 tasks 进行浅拷贝
    }));
    
    let newtaskgroups = taskgroups.map(item => ({
      taskgroupId: item.taskgroupId,
      taskgroup: { ...item.taskgroup }, // 对 taskgroup 进行浅拷贝
      tasks: [...item.tasks] // 对 tasks 进行浅拷贝
    }));

    let targettask = {};
    newtaskgroups = newtaskgroups.map(item=>{
      if (item.taskgroup._id === source.droppableId){
        targettask = item.tasks[source.index]
        item.tasks.splice(source.index, 1)
        return item
      }
      return item
    })
    newtaskgroups = newtaskgroups.map(item=>{
      if (item.taskgroup._id === destination.droppableId){
        item.tasks.splice(destination.index, 0, targettask)
        return item
      }
      return item
    })
    setTaskgroups(newtaskgroups)
    //++++++++

    console.log("originalTaskgroupsState", originalTaskgroupsState)
    //数据库移动 task 在任务组间
    if (destination.droppableId !== source.droppableId){
      let targetTaskId;
      originalTaskgroupsState.forEach(item=>{
        if (item.taskgroupId === source.droppableId){
          console.log("源任务", item.tasks[source.index])
          console.log("source.index", source.index)
          targetTaskId = item.tasks[source.index]._id
        }
      })
      console.log("源任务Id", targetTaskId)
      console.log(targetTaskId)
      await api.taskApi.moveTask(targetTaskId, destination.droppableId)
    }

    // 数据库保存顺序
    //++++++++
    newtaskgroups.forEach( async item=>{
      if (destination.droppableId === source.droppableId){
        if (item.taskgroupId === source.droppableId){
          await api.taskApi.reorderTask(item.tasks).then(res=>{})
        }
      } else {
        if (item.taskgroupId === source.droppableId || item.taskgroupId === destination.droppableId){
          await api.taskApi.reorderTask(item.tasks).then(res=>{})
        }
      }
    })
    //++++++++

    // moveTaskInTaskgroups(source, destination)
  }

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <div className='Workspace'>
        {
          taskgroups.map((item, index) => {
            if (item.tasks === undefined) return;
            return (
              <WorkSpaceCol
                droppableId={item.taskgroup._id}
                updateTaskgroupTitle={updateTaskgroupTitle}
                key={item.taskgroup._id}
                taskgroup={item.taskgroup}
                mytasks={item.tasks}
                addOneTask={addOneTask}
              >
              </WorkSpaceCol>
            )
          })
        }
      </div>
    </DragDropContext>
  )
}
