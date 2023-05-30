import { Box, Typography, Container, List, Paper, Divider } from "@mui/material"

function AllMessages({ info }) {
    const allMessagesList = info.map((mes) => {
        return (
          <Box>
            <Typography variant='h6' sx={{ pl: '10px', pt: '10px', pb: '5px' }}>{mes.username + ":"}</Typography>
            <Typography variant='body1' sx={{ pl: '15px' }}>{mes.text}</Typography>
            <Divider/>
          </Box>
        )
      })

    return (
        <Container>
            <Typography variant='h6'>All Messages:</Typography>
            <Paper style={{ maxHeight: '100%', overflow: 'auto' }}>
              <List>
                {allMessagesList}
              </List>
            </Paper>
        </Container>
    )
}

export default AllMessages