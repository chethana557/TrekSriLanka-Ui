import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
import Avatar from '@mui/material/Avatar';
import logoImage from '../../assets/logo_new.png'; 
import adminAvatar from '../../assets/admin/boy.png'; 

// Admin navigation items with their corresponding routes
const adminPages = [
  { name: 'Dashboard', path: '/admin/dashboard' },
  { name: 'Seasonal Offers', path: '/admin/seasonal-offers' },
  { name: 'Tour Packages', path: '/admin/tour-packages' },
  { name: 'Bookings', path: '/admin/bookings' },
  { name: 'Destinations', path: '/admin/destinations' },
  { name: 'Messages', path: '/admin/messages' },
  { name: 'Feedback', path: '/admin/feedback' }
];

function AdminNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const isCurrentPage = (path) => {
    return location.pathname === path;
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
                mr: 1,
                cursor: 'pointer'
              }}
              alt="TrekSriLanka Logo"
              src={logoImage}
              onClick={() => navigate('/admin/dashboard')}
            />
            <Box 
              sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                flexDirection: 'column',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/admin/dashboard')}
            >
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
              {adminPages.map((page) => (
                <MenuItem 
                  key={page.name} 
                  onClick={() => handleNavigation(page.path)}
                  sx={{
                    bgcolor: isCurrentPage(page.path) ? '#f0f0f0' : 'transparent'
                  }}
                >
                  <Typography sx={{ 
                    textAlign: 'center', 
                    color: isCurrentPage(page.path) ? '#4AB9B0' : '#333',
                    fontWeight: isCurrentPage(page.path) ? 'bold' : 'normal'
                  }}>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile logo */}
          <Box 
            sx={{ 
              display: { xs: 'flex', md: 'none' }, 
              flexGrow: 1,
              alignItems: 'center',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/admin/dashboard')}
          >
            <Box 
              component="img"
              sx={{ 
                height: 50,
                mr: 1 
              }}
              alt="TrekSriLanka Logo"
              src={logoImage} 
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
            {adminPages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleNavigation(page.path)}
                sx={{ 
                  my: 2, 
                  mx: 1,
                  color: isCurrentPage(page.path) ? '#4AB9B0' : '#333', 
                  display: 'block',
                  fontWeight: isCurrentPage(page.path) ? 'bold' : 'normal',
                  '&:hover': { color: '#4AB9B0' },
                  borderBottom: isCurrentPage(page.path) ? '2px solid #4AB9B0' : 'none',
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Admin Profile Avatar */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar 
                alt="Admin Profile" 
                src={adminAvatar}
                sx={{ 
                  width: 40, 
                  height: 40,
                  border: '2px solid #4AB9B0'
                }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AdminNavBar;