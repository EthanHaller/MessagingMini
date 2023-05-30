import React, { useState } from "react"
import axios from "axios"
import { Button, Paper, TextField } from "@mui/material"

function EditableMessage({ messageInfo, onChange }) {
    const [isEditable, setIsEditable] = useState(false)
    const [newMessage, setNewMessage] = useState(messageInfo.text)

    const changeMessage = (e) => {
        setNewMessage(e.target.value)
    }
    const handleUpdate = () => {
        if(isEditable) {
            axios.put("http://localhost:9000/messages/put?id=" + messageInfo.id, {
                "text": newMessage
            })
        }
        setIsEditable(!isEditable)
        onChange()
    }

    const deleteMessage = () => {
        axios.delete("http://localhost:9000/messages/delete?id=" + messageInfo.id)
        onChange()
    }
    
    console.log(messageInfo)
    return (
        <Paper>
            <TextField
                disabled={!isEditable}
                variant='standard'
                defaultValue={messageInfo.text}
                onChange={changeMessage}
            />
            <Button onClick={() => handleUpdate()}>{isEditable ? "Save" : "Edit"}</Button>
            <Button onClick={() => deleteMessage()}>Delete</Button>
        </Paper>
    )
}

export default EditableMessage