import EditableMessage from "./EditableMessage";
import { Typography, Container, Paper, List } from "@mui/material";

function UserMessages({ usersMessages, getMessages }) {
    const usersMessagesList = usersMessages ? usersMessages.map((mes) => {
        return (
          <EditableMessage key={mes.id} messageInfo={mes} onChange={() => getMessages()}/>
        )
    }) : null

    return (
        <Container>
            <Typography variant='h6'>Your Messages:</Typography>
            <Paper style={{ maxHeight: '100%', overflow: 'auto' }}>
              <List>
                {usersMessagesList}
              </List>
            </Paper>
        </Container>
    )
}

export default UserMessages;