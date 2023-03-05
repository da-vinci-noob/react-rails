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

export default function SignUp() {
  const navigate = useNavigate()
  const [queryParameters] = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [referredBy, setReferredBy] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') == 'true') {
      navigate('/')
    }
    setReferredBy(queryParameters.get('referred_by'))
  }, [])

  const handleSignUp = (event) => {
    event.preventDefault()
    console.log(email, password, referredBy)
    axios
      .post(
        'http://localhost:3000/users/tokens/sign_up',
        {
          email: email,
          password: password,
          referred_by_id: referredBy
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(function (response) {
        handleSignup(response.data)
      })
      .catch(function (error) {
        setError(error?.response?.data?.error_description?.join(', '))
      })
  }

  const handleSignup = (data) => {
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
            {error}
          </Typography>
          <Typography component="h1" variant="h4">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSignUp}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Referred By Email"
                  name="email"
                  autoComplete="email"
                  value={referredBy || ''}
                  disabled={queryParameters.get('referred_by') ? true : false}
                  onChange={(event) => {
                    setReferredBy(event.target.value)
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
