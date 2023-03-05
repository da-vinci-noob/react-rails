import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Header from './Header'
import axios from 'axios'

const theme = createTheme()

export default function SignIn() {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') == 'true') {
      navigate('/')
    }
  }, [])

  const [queryParameters] = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    getUser()
  }

  const getUser = async () => {
    await axios
      .post(
        'http://localhost:3000/users/tokens/sign_in',
        {
          email: email,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(function (response) {
        handleLogin(response.data)
      })
      .catch(function (error) {
        navigate('/login?error=Username Password Not Valid')
      })
  }

  const handleLogin = (data) => {
    localStorage.setItem('isLoggedIn', true)
    localStorage.setItem('token', data.refresh_token)
    navigate('/')
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />

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
          <Typography component="h1" variant="h6" color="red">
            {queryParameters.get('error')}
          </Typography>
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
              }}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
              }}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
