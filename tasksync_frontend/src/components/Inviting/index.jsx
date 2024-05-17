import React, { useEffect } from 'react'
import './index.css'
import { Avatar } from '@mui/material';
import { Button, Checkbox } from '@mui/material';
import api from '../../common/api';
import { stringToColor } from '../../common/common';
import PubSub from 'pubsub-js';

export default function Inviting(props) {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const [selectedUsersDisplay, setSelectedUsersDisplay] = React.useState([])

  const [selectedUsers, setSelectedUsers] = React.useState([])

  const [keywordValue, setKeywordValue] = React.useState("")

  const [usersResult, setUsersResult] = React.useState([])

  useEffect(() => {
    api.userApi.getUsersByIds(selectedUsers).then(
      res => {
        setSelectedUsersDisplay(res.data.data)
      }
    )
  }, [selectedUsers])

  async function searchUser() {
    if (keywordValue !== "") {
      const res = await api.userApi.getUsersByKeyword(keywordValue)
      setUsersResult(res.data.data)
    }
  }

  function checkUser(e) {
    if (e.target.checked) {
      if (selectedUsers.indexOf(e.target.value) === -1) {
        setSelectedUsers([...selectedUsers, e.target.value])
      }
    } else {
      const new_selectedUsers = selectedUsers.filter(item => {
        if (item === e.target.value) {
          return false
        }
        return true
      })
      setSelectedUsers(new_selectedUsers)
    }
  }

  const [timer, setTimer] = React.useState("")
  function debounce(func, delay) {
    return function (e) {
      setKeywordValue(e.target.value)
      if (timer !== "") {
        clearTimeout(timer)
      }
      let timerId = setTimeout(() => { func() }, delay)
      setTimer(timerId)
    }
  }

  function invite(){
    api.projectApi.addUsersIntoProject(selectedUsers, props.activeProjectId).then(
      res=>{
        PubSub.publish("updateDashboardBannerUsers", props.activeProjectId)
        props.setIsDialogOpening(false)
      }
    )
  }

  return (
    <div className='InvitingBox'>
      <div className='InvitingBox_title'>Inviting</div>
      <div className='InvitingBox_input_box_label'>
        <label htmlFor="projectnameValue">Search who to invite</label>
      </div>
      <div className='InvitingBox_users_display'>
        {/* <div className='InvitingBox_users_display_item'>
          <Avatar sx={{ bgcolor: stringToColor(item.username) }}>{item.username[0]}</Avatar>
          <div style={{ marginLeft: 10 }}>{item.username}</div>
        </div> */}
        {
          selectedUsersDisplay.map(item => {
            return (
              <div key={item._id} className='inviting_searchresul_display_item'>
                <Avatar sx={{ bgcolor: stringToColor(item.username) }}>{item.username[0]}</Avatar>
                <div style={{ marginLeft: 10 }}>{item.username}</div>
              </div>
            )
          })
        }
      </div>
      <div className='InvitingBox_input_box'>
        <input value={keywordValue} onChange={debounce(searchUser, 400)} placeholder="Invitee's name" id='projectnameValue' type="text" />
      </div>
      <div className='inviting_searchresult'>
        {
          usersResult.map(item => {
            return (
              <div key={item._id} className='inviting_searchresul_display_item'>
                <Avatar sx={{ bgcolor: stringToColor(item.username) }}>{item.username[0]}</Avatar>
                <div style={{ marginLeft: 10 }}>{item.username}</div>
                <div style={{ flexGrow: 1 }}></div>
                {
                  selectedUsers.indexOf(item._id) !== -1 ? (
                    <Checkbox value={item._id} defaultChecked onChange={checkUser} {...label} />
                  ) : (
                    <Checkbox value={item._id} onChange={checkUser} {...label} />
                  )
                }

              </div>
            )
          })
        }
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <Button onClick={invite} sx={{ width: "100%" }} variant="contained">Create</Button>
    </div>
  )
}
