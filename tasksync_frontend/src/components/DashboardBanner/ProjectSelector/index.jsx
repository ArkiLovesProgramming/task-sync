import React, { useEffect } from 'react'
// material
import { Select, MenuItem } from '@mui/material';
//icon
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
//css
import './index.css'

export default function ProjectSelector(props) {

    const [value, setValue] = React.useState("");

    useEffect(()=>{
        props.projects.forEach(item=>{
            if (item._id === props.activeProjectId){
                setValue(props.activeProjectId)
            }
        })
    }, [props.activeProjectId, props.projects])
  
    const handleChange = (event) => {
        props.setActiveProjectId(event.target.value)
    };
  
    return (
      <div style={{padding: "8px 0px"}}>
        <Select
        value={value}
        onChange={handleChange}
        autoWidth
        IconComponent={KeyboardArrowDownIcon}
        sx={{
            height: "40px",
            minWidth: 120,
            "&:hover": {
                "&& fieldset": {
                    borderColor: 'rgba(0, 0, 0, 0.23)'
                },
            }
        }}
        >
            {
                props.projects.map(item => {
                    return <MenuItem key={item._id} value={item._id}>{item.title}</MenuItem>
                })
            }
        </Select>
      </div>
    );
  }