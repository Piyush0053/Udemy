import React from 'react'
import { AppBar, Typography, Toolbar, Container } from '@mui/material'

const Navbar = () => (
  <AppBar position="static" color="primary" elevation={4}>
    <Container maxWidth="lg">
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div"
          sx={{ 
            flexGrow: 1,
            textAlign: 'center',
            fontWeight: 'bold',
            py: 1
          }}
        >
          Image Finder
        </Typography>
      </Toolbar>
    </Container>
  </AppBar>
)

export default Navbar