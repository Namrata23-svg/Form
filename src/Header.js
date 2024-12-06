import React from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
class Header extends React.Component {
  render() {
    return (
      <Box sx={{flexGrow: 1}}>
        <AppBar
          position="static"
          style={{backgroundColor: 'black', marginTop: '-8px'}}
        >
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
            >
              <MenuIcon />
            </IconButton> */}
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
}

export default Header
