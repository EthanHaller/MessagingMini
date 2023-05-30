import './App.css';
import axios from "axios"

import React, {useState, useEffect} from "react"
import { Button, TextField, Typography, Box, Grid } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import UserMessages from './UserMessages';
import AllMessages from './AllMessages'

function App() {
  const [info, setInfo] = useState();
  const [usersMessages, setUsersMessages] = useState();
  const [message, setMessage] = useState("")
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getAllMessages()
  }, [isLoggedIn])
  useEffect(() => {
    getMessagesForUser(username)
  }, [isLoggedIn])

  const getMessages = (user) => {
    getAllMessages()
    getMessagesForUser(user)
  }
  const getAllMessages = () => {
    fetch("http://localhost:9000/messages/info")
    .then((res) => res.json())
    .then((text) => setInfo(text.result))
    .catch((err) => console.log(err))
  }
  const getMessagesForUser = (user) => {
    fetch("http://localhost:9000/messages/info?user=" + user)
    .then((res) => res.json())
    .then((text) => setUsersMessages(text.result))
    .catch((err) => console.log(err))
  }

  const post = () => {
    axios.post("http://localhost:9000/messages/post/", {
      text: message,
      likes: 0,
      responses: [],
      username: username
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
    .then(getMessages(username))
  }

  const updateMessage = (e) => {
    setMessage(e.target.value)
  }
  const updateUsername = (e) => {
    setUsername(e.target.value)
  }

  console.log(info)
  return (
    <Box m='30px' sx={{ flexGrow: 1 }}>
      <Typography variant='h3'>{isLoggedIn ? "Message Board" : "Message Board Login"}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box>
            <Box display='flex'>
              <TextField onChange={updateUsername} placeholder='Username' width='80%'/>
              <Button onClick={() => setIsLoggedIn(true)} variant='outlined' endIcon={<LoginIcon />}>Login</Button>
            </Box>
            {isLoggedIn &&
            <Box display='flex'>
              <TextField onChange={updateMessage} placeholder='Message' />
              <Button onClick={() => post()} variant='outlined'>Post</Button>
            </Box>
            }
          </Box>
        </Grid>
        {isLoggedIn && 
        <Grid item xs={4}>
          <UserMessages usersMessages={usersMessages} getMessages={() => getMessages(username)}/>
        </Grid>
        }
        {info && 
        <Grid item xs={isLoggedIn ? 4 : 8}>
          <AllMessages info={info}/>
        </Grid>
        }
      </Grid>
    </Box>
  );
}

export default App;