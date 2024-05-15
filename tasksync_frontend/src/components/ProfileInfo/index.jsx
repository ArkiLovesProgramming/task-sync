import React, { useState } from 'react'
import './index.css'
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import api from '../../common/api';
import { IconButton, Button } from '@mui/material';

export default function ProfileInfo() {

    const [isediting, setisediting] = useState(true)

    const [usernameValue, setusernameValue] = useState("")
    const [emailValue, setemailValue] = useState("")
    const [bioValue, setbioValue] = useState("")

    const fileinput = React.useRef()
    const profilepicdisplay = React.useRef()

    function toggaleIsEditing() {
        setisediting(!isediting)
    }

    function fileinputclick() {
        const input = fileinput.current
        input.click()
    }

    function filechange(e) {
        const input = fileinput.current
        var reads = new FileReader();
        let file = input.files[0];
        if ((file.size / 1024) / 5 > 1024) {
            alert('上传图片不能大于5M');
            return;
        }
        reads.readAsDataURL(file);
        reads.onload = function (e) {
            profilepicdisplay.current.src = this.result;
        };
    }

    function confirm() {
        // const token = cookie.get("token")
        // const user = jwt.verifyToken(token)._doc
        // let formdata = {
        //     userId: user._id,
        //     profilePicFile: fileinput.current.files[0],
        //     username: usernameValue,
        //     email: emailValue,
        //     bio: bioValue
        // }
        if (fileinput.current.files[0] === undefined) return;
        const formData = new FormData();
        formData.append("file", fileinput.current.files[0])
        api.fileApi.upload(formData)
    }

    return (
        <div>
            <div className='modul_name'>
                Info
            </div>
            <div className='ProfileInfo'>
                <div className='ProfileInfo_right'>
                    <div className='ProfileInfo_edit'>
                        <IconButton onClick={toggaleIsEditing} size='small' aria-label="like">
                            <EditIcon />
                        </IconButton>
                    </div>
                    <img ref={profilepicdisplay} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYQpPd05yJSp5YLgkMmAlZmFt5LodZsFvRQG35kTF4cy5fMFUrTUfhsCWnBQ&s" alt="" />
                </div>
                <div className='ProfileInfo_bottom'>
                    {
                        !isediting ? (
                            <div>
                                <div className='ProfileInfo_bottom_name'>
                                    Arki Wang
                                </div>
                                <div className='ProfileInfo_bottom_email'>
                                    betaweiwang@gmail.com
                                </div>
                                <div className='ProfileInfo_bottom_bio'>
                                    Download the perfect profile pictures. Find over 100+ of the best free profile images.
                                </div>
                            </div>
                        ) : (
                            <div>
                                <input onChange={filechange} ref={fileinput} type="file" hidden accept='image/*' />
                                <Button onClick={fileinputclick} sx={{ width: "100%" }} variant="outlined" endIcon={<FileUploadIcon />}>Confirm</Button>
                                <div className='profileinfo_editing_item'>
                                    <label className='profileinfo_editing_item_label' htmlFor="profileinfo_username_editing">Username</label>
                                    <div className='profileinfo_input_box'>
                                        <input id='profileinfo_username_editing' type="text" value={usernameValue} onChange={e => { setusernameValue(e.target.value) }} />
                                    </div>
                                </div>
                                <div className='profileinfo_editing_item'>
                                    <label className='profileinfo_editing_item_label' htmlFor="profileinfo_username_editing">Email</label>
                                    <div className='profileinfo_input_box'>
                                        <input id='profileinfo_username_editing' type="text" value={emailValue} onChange={e => { setemailValue(e.target.value) }} />
                                    </div>
                                </div>
                                <div className='profileinfo_editing_item'>
                                    <label className='profileinfo_editing_item_label' htmlFor="profileinfo_username_editing">Bio</label>
                                    <div className='profileinfo_input_box'>
                                        <input id='profileinfo_username_editing' type="text" value={bioValue} onChange={e => { setbioValue(e.target.value) }} />
                                    </div>
                                </div>
                                <Button onClick={confirm} sx={{ width: "100%", marginTop: "20px" }} variant="contained" endIcon={<CheckIcon />}>Confirm</Button>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}
