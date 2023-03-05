import React, { useState, useEffect } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import ListItemButton from '@mui/material/ListItemButton'
import PersonIcon from '@mui/icons-material/Person'
import axios from 'axios'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'

const theme = createTheme()

export default function HomePage() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState()

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') != 'true') {
      navigate('/login')
    } else getUser()
  }, [])

  const getUser = async () => {
    await axios
      .get('http://localhost:3000/users/tokens/info', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(function (response) {
        setUser(response.data)
      })
      .catch(function (error) {
        localStorage.setItem('isLoggedIn', false)
        navigate('/login?error=User Not Logged In')
      })
  }

  const setUser = (data) => {
    localStorage.setItem('isLoggedIn', true)
    setUserData(data)
  }

  return (
    <ThemeProvider theme={theme}>
      <Header userEmail={userData?.email} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <h1>Referred Users List</h1>
          <List
            dense
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            {userData?.referred_users.map((value) => {
              const labelId = `checkbox-list-secondary-label-${value.email}`
              return (
                <ListItem key={value.email} disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={value.email} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
          <TextField
            fullWidth
            id="email"
            label="Your Referral Link"
            name="email"
            autoComplete="email"
            value={`http://localhost:3000/signup?referred_by=${
              userData?.email || ''
            }`}
          />
        </Box>
      </Container>
    </ThemeProvider>
  )
}
