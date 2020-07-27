import React from 'react'

const Notification = ({ message, errorStatus }) => {
    console.log("notification: ", message, errorStatus)
    if (message === "") {
        return <></>
    }
    if (errorStatus) {
        return (
            <div className = "errorNotification">Status: {message}</div>
        )
    } else {
        return (
            <div className = "successNotification">Status: {message}</div>
        )
    }

    
}

export default Notification