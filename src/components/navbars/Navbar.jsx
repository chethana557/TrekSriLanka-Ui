import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import Logo from '../../assets/common/logo_new.png'
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import LogoutIcon from '@mui/icons-material/Logout';
import BookingIcon from '@mui/icons-material/BookOnline';
import userAvatar from '../../assets/admin/boy.png';
import { isLoggedIn, clearUserCredentials, getCurrentUser } from '../../utils/authUtils';

// Navigation items
const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Destinations', path: '/destination' },
  { label: 'Packages', path: '/packages' },
  { label: 'Accommodation', path: '/accommodation' },
  { label: 'Recommendations', path: '/recommendations' },
  { label: 'About Us', path: '/aboutus' },
  { label: 'Contact', path: '/contactus' }
];

// Configurable navbar appearance
const NAVBAR_BG_OPACITY = 0.82; // increase for less transparency (range 0-1)
const NAVBAR_BLUR_PX = 1; // backdrop blur radius
const HOTEL_REQUEST_BUTTON_LABEL = 'List Your Hotel';

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorElProfile, setAnchorElProfile] = React.useState(null);
  const [profile, setProfile] = React.useState({ username: '' });

  // Use the new authentication utility
  const loggedIn = isLoggedIn();

  React.useEffect(() => {
    if (loggedIn) {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setProfile({ username: currentUser.username });
      }
    }
  }, [loggedIn]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleProfileClick = (event) => {
    setAnchorElProfile(event.currentTarget);
  };
  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };
  const handleLogout = () => {
    clearUserCredentials();
    handleCloseProfile();
    navigate('/');
  };

  return (
    <AppBar 
      position="sticky" 
      color="transparent" 
      elevation={2}
      sx={{ 
        bgcolor: `rgba(255,255,255,${NAVBAR_BG_OPACITY})`,
        backdropFilter: `saturate(180%) blur(${NAVBAR_BLUR_PX}px)`,
        WebkitBackdropFilter: `saturate(180%) blur(${NAVBAR_BLUR_PX}px)`,
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease'
      }}
    >
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
              src={Logo}
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
              {navLinks.map((link) => (
                <MenuItem key={link.label} onClick={handleCloseNavMenu}>
                  <Link to={link.path} style={{ textDecoration: 'none', color: '#333', width: '100%' }}>
                    <Typography sx={{ textAlign: 'center' }}>{link.label}</Typography>
                  </Link>
                </MenuItem>
              ))}
              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: '#4AB9B0',
                    color: '#4AB9B0',
                    '&:hover': { 
                      bgcolor: '#4AB9B0',
                      color: 'white',
                      borderColor: '#4AB9B0'
                    },
                    borderRadius: '25px',
                    textTransform: 'none',
                    fontWeight: 'bold',
                    px: 3,
                    mb: 1
                  }}
                  onClick={() => navigate('/hotels')}
                >
                  {HOTEL_REQUEST_BUTTON_LABEL}
                </Button>
              </MenuItem>
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
                  onClick={() => navigate('/login')}
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
              src={Logo}
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
            {navLinks.map((link) => (
              <Button
                key={link.label}
                component={Link}
                to={link.path}
                onClick={handleCloseNavMenu}
                sx={{ 
                  my: 2, 
                  mx: 1,
                  color: '#333', 
                  display: 'block',
                  fontWeight: location.pathname === link.path ? 'bold' : 'normal',
                  '&:hover': { 
                    color: '#4AB9B0',
                    fontWeight: 'bold',
                    transform: 'translateY(-1px)',
                    transition: 'all 0.2s ease'
                  }
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Add Hotel and Login button or User Profile */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {/* Add Hotel Button */}
            <Button
              variant="outlined"
              onClick={() => navigate('/hotels')}
              sx={{
                borderColor: '#4AB9B0',
                color: '#4AB9B0',
                '&:hover': { 
                  bgcolor: '#4AB9B0',
                  color: 'white',
                  borderColor: '#4AB9B0'
                },
                borderRadius: '25px',
                textTransform: 'none',
                fontWeight: 'bold',
                px: 3
              }}
            >
              {HOTEL_REQUEST_BUTTON_LABEL}
            </Button>
            
            {loggedIn ? (
              <>
                <IconButton sx={{ p: 0 }} onClick={handleProfileClick}>
                  <Avatar alt="User Profile" src={userAvatar} sx={{ width: 40, height: 40, border: '2px solid #4AB9B0' }} />
                </IconButton>
                <Menu
                  anchorEl={anchorElProfile}
                  open={Boolean(anchorElProfile)}
                  onClose={handleCloseProfile}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                  PaperProps={{
                    sx: {
                      bgcolor: 'white',
                      borderRadius: 3,
                      boxShadow: 4,
                      minWidth: 320,
                      p: 0,
                      mt: 0.8,
                      overflow: 'visible',
                    }
                  }}
                >
                  <Box sx={{ width: 320, p: 0 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 3, pb: 2 }}>
                      <Avatar src={userAvatar} sx={{ width: 64, height: 64, mb: 1, boxShadow: 2 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#222', fontSize: '1.15rem' }}>
                        {profile?.username || 'User'}
                      </Typography>
                    </Box>
                    <Divider sx={{ mb: 1 }} />
                    <List disablePadding>
                      <ListItem button onClick={() => { navigate('/my-bookings'); handleCloseProfile(); }} sx={{ px: 3, py: 1.2, '&:hover': { bgcolor: '#f5f7fa' } }}>
                        <ListItemIcon sx={{ minWidth: 36, color: '#4AB9B0' }}><BookingIcon /></ListItemIcon>
                        <ListItemText primary={<span style={{ fontWeight: 500 }}>My Bookings</span>} />
                      </ListItem>
                      <ListItem button onClick={() => { navigate('/edit-profile'); handleCloseProfile(); }} sx={{ px: 3, py: 1.2, '&:hover': { bgcolor: '#f5f7fa' } }}>
                        <ListItemIcon sx={{ minWidth: 36, color: '#4AB9B0' }}><PersonIcon /></ListItemIcon>
                        <ListItemText primary={<span style={{ fontWeight: 500 }}>Edit Profile</span>} />
                      </ListItem>
                      <ListItem button sx={{ px: 3, py: 1.2, '&:hover': { bgcolor: '#f5f7fa' } }}>
                        <ListItemIcon sx={{ minWidth: 36, color: '#4AB9B0' }}><SettingsIcon /></ListItemIcon>
                        <ListItemText primary={<span style={{ fontWeight: 500 }}>Settings & Privacy</span>} />
                      </ListItem>
                      <ListItem button sx={{ px: 3, py: 1.2, '&:hover': { bgcolor: '#f5f7fa' } }}>
                        <ListItemIcon sx={{ minWidth: 36, color: '#4AB9B0' }}><HelpIcon /></ListItemIcon>
                        <ListItemText primary={<span style={{ fontWeight: 500 }}>Help & Support</span>} />
                      </ListItem>
                      <ListItem button sx={{ px: 3, py: 1.2, '&:hover': { bgcolor: '#f5f7fa' } }}>
                        <ListItemIcon sx={{ minWidth: 36, color: '#4AB9B0' }}><Brightness4Icon /></ListItemIcon>
                        <ListItemText primary={<span style={{ fontWeight: 500 }}>Display & Accessibility</span>} />
                      </ListItem>
                      <Divider sx={{ my: 1 }} />
                      <ListItem button onClick={handleLogout} sx={{ px: 3, py: 1.2, cursor: 'pointer', '&:hover': { bgcolor: '#fbe9e7' } }}>
                        <ListItemIcon sx={{ minWidth: 36, color: '#e53935' }}><LogoutIcon /></ListItemIcon>
                        <ListItemText primary={<span style={{ fontWeight: 500, color: '#e53935' }}>Logout</span>} />
                      </ListItem>
                    </List>
                  </Box>
                </Menu>
              </>
            ) : (
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
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;