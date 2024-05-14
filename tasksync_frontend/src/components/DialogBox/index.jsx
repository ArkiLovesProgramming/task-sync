import './index.css'

import React from 'react'

export default function DialogBox(props) {

    const windowRef = React.useRef()

    function closeWindow(e) {
        if (e.target === windowRef.current) {
            props.setIsDialogOpening(false)
        }
    }

    return props.isDialogOpening ? (
        <div ref = { windowRef } className = 'myDialogBox' onClick = { closeWindow } >
            <>{props.children}</>
        </div>
    ) : ("")
}
