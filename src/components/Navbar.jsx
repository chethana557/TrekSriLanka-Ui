import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';


// Navigation items
const pages = ['Home', 'About Us', 'Destinations', 'Packages', 'Accommodation', 'Contact'];

function TrekSriLankaNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={1} sx={{ bgcolor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for larger screens */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Box 
              component="img"
              sx={{ 
                height: 70,
                display: { xs: 'none', md: 'flex' },
                mr: 1 
              }}
              alt="TrekSriLanka Logo"
              src="src/assets/logo_new.png" 
            />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  textDecoration: 'none',
                  lineHeight: 1,
                }}
              >
                TREKSRILANKA
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#666',
                  textDecoration: 'none',
                }}
              >
                Your Ultimate Travel Companion!
              </Typography>
            </Box>
          </Box>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: '#333' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center', color: '#333' }}>{page}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#4AB9B0',
                    '&:hover': { bgcolor: '#3da89f' },
                    borderRadius: '25px',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    px: 3
                  }}
                >
                  Login
                </Button>
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile logo */}
          <Box 
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              flexGrow: 1,
              alignItems: 'center'
            }}
          >
            <Box 
              component="img"
              sx={{ 
                height: 50,
                mr: 1 
              }}
              alt="TrekSriLanka Logo"
              src="src/assets/logo_new.png" 
            />
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              TREKSRILANKA
            </Typography>
          </Box>

          {/* Desktop navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  mx: 1,
                  color: '#333', 
                  display: 'block',
                  fontWeight: page === 'Home' ? 'bold' : 'normal',
                  '&:hover': { color: '#4AB9B0' }
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Login button */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#4AB9B0',
                '&:hover': { bgcolor: '#3da89f' },
                borderRadius: '25px',
                textTransform: 'none',
                fontWeight: 'bold',
                px: 3
              }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default TrekSriLankaNavbar;