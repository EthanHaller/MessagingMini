import './App.css';
import axios from "axios"

import React, {useState, useEffect} from "react"
import { Button, TextField, Typography } from '@mui/material';

function App() {
  const [info, setInfo] = useState();
  const [message, setMessage] = useState("")
  const [username, setUsername] = useState("");

  const getInfo = () => {
    fetch("http://localhost:9000/messages/info")
    .then((res) => res.json())
    .then((text) => setInfo(text.result))
    .catch((err) => console.log(err))
  }
  useEffect(() => {
    getInfo()
  }, [])

  const post = () => {
    axios.post("http://localhost:9000/messages/post/", {
      text: message,
      likes: 0,
      responses: [],
      username: username
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
    .then(getInfo())
  }

  const updateMessage = (e) => {
    setMessage(e.target.value)
  }
  const updateUsername = (e) => {
    setUsername(e.target.value)
  }

  console.log(info)

  return (
    <React.Fragment>
      <Typography variant='h3'>Message Board</Typography>
      <TextField onChange={updateUsername} placeholder='Username' />
      <TextField onChange={updateMessage} placeholder='Message' />
      <Button onClick={() => post()}>Post</Button>
    </React.Fragment>
  );
}

export default App;