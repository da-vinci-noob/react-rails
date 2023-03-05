import React, { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

export default function ButtonAppBar({ userEmail }) {
  const logState = () => {
    if (userEmail) {
      return 'Logout'
    } else {
      return 'Login'
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {userEmail}
          </Typography>
          <Link
            color="white"
            to={`/${logState().toLowerCase()}`}
            variant="body2"
          >
            <Button variant="contained" color="secondary">
              {logState()}
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
