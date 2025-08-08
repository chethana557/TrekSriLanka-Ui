import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../../api';
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
import logoImage from '../../assets/admin/logo_new.png'; 
import adminAvatar from '../../assets/admin/boy.png'; 
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

// Admin navigation items with their corresponding routes
const adminPages = [
  { name: 'Dashboard', path: '/admin/dashboard' },
  { name: 'Seasonal Offers', path: '/admin/seasonal-offers' },
  { name: 'Tour Packages', path: '/admin/tour-packages' },
  { name: 'Bookings', path: '/admin/bookings' },
  { name: 'Destinations', path: '/admin/destinations' },
  { name: 'Resources', path: '/admin/resources' },
  { name: 'Messages', path: '/admin/messages' },
  { name: 'Feedback', path: '/admin/feedback' }
];

function AdminNavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElAvatar, setAnchorElAvatar] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;
      try {
        const res = await fetch(`${BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (e) {}
    };
    fetchProfile();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleAvatarClick = (event) => {
    setAnchorElAvatar(event.currentTarget);
  };

  const handleCloseAvatarMenu = () => {
    setAnchorElAvatar(null);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/auth/logout`, { method: 'POST' });
    } catch (e) {}
    localStorage.clear();
    handleCloseAvatarMenu();
    navigate('/');
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
                >
                  <Typography sx={{ textAlign: 'center', color: '#333', width: '100%' }}>
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
                  color: '#333', 
                  display: 'block',
                  fontWeight: isCurrentPage(page.path) ? 'bold' : 'normal',
                  '&:hover': { 
                    color: '#4AB9B0',
                    fontWeight: 'bold',
                    transform: 'translateY(-1px)',
                    transition: 'all 0.2s ease'
                  }
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Admin Profile Avatar */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <IconButton sx={{ p: 0 }} onClick={handleAvatarClick}>
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
            <Menu
              anchorEl={anchorElAvatar}
              open={Boolean(anchorElAvatar)}
              onClose={handleCloseAvatarMenu}
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
                  <Avatar src={adminAvatar} sx={{ width: 64, height: 64, mb: 1, boxShadow: 2 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#222', fontSize: '1.15rem' }}>
                    {profile?.full_name || profile?.username || 'Admin'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#888', fontWeight: 500, fontSize: '0.97rem' }}>
                    {profile?.username}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 1 }} />
                <List disablePadding>
                  <ListItem button sx={{ px: 3, py: 1.2, '&:hover': { bgcolor: '#f5f7fa' } }}>
                    <ListItemIcon sx={{ minWidth: 36, color: '#4AB9B0' }}><PersonIcon /></ListItemIcon>
                    <ListItemText primary={<span style={{ fontWeight: 500 }}>Edit Profile</span>} />
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AdminNavBar;