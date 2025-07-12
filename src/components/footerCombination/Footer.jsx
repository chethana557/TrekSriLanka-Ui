import React from 'react';
import { Box, Container, Grid, Typography, Link, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Logo from '../../assets/common/logo_new.png'; 

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ backgroundColor: '#0CA296', color: 'white', pt: 50, pb: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ 
              fontSize: '18px', 
              fontWeight: 600, 
              mb: 2,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -5,
                left: 0,
                width: '50px',
                height: '2px',
                backgroundColor: 'white',
              }
            }}>
              About TrekSriLanka
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  component="img"
                  src={Logo}
                  sx={{ width: 80, height: 80 }}
                />
                <Typography variant="caption" sx={{ fontSize: '12px', fontStyle: 'italic' }}>
                  Your Ultimate Travel Companion!
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ mt: 1 }}>
                Your Ultimate Travel Companion for exploring the beauty <br />
                and culture of Sri Lanka since 2025.
              </Typography>

            </Box>
          </Grid>
          
          {/* Contact Us Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ 
              fontSize: '18px', 
              fontWeight: 600, 
              mb: 2,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -5,
                left: 0,
                width: '50px',
                height: '2px',
                backgroundColor: 'white',
              }
            }}>
              Contact Us
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">
                  123 Travel Street, Colombo, Sri Lanka
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">
                  +94 123 456 789
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">
                  info@treksrilanka.com
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          {/* Quick Links Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ 
              fontSize: '18px', 
              fontWeight: 600, 
              mb: 2,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -5,
                left: 0,
                width: '50px',
                height: '2px',
                backgroundColor: 'white',
              }
            }}>
              Quick Links
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Home', 'About Us', 'Destinations', 'Bookings', 'Travel Blog', 'Contact'].map((link) => (
                <Link 
                  key={link} 
                  href="#" 
                  sx={{ 
                    color: 'white', 
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  {link}
                </Link>
              ))}
            </Box>
          </Grid>
          
          {/* Popular Destinations Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ 
              fontSize: '18px', 
              fontWeight: 600, 
              mb: 2,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -5,
                left: 0,
                width: '50px',
                height: '2px',
                backgroundColor: 'white',
              }
            }}>
              Popular Destinations
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Sigiriya', 'Ella', 'Mirissa', 'Kandy', 'Jaffna', 'Anuradhapura'].map((place) => (
                <Link 
                  key={place} 
                  href="#" 
                  sx={{ 
                    color: 'white', 
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  {place}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>
        
        {/* Social Media and Copyright */}
        <Box sx={{ mt: 4, textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.2)', pt: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Follow Us
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
            <FacebookIcon sx={{ cursor: 'pointer' }} />
            <TwitterIcon sx={{ cursor: 'pointer' }} />
            <InstagramIcon sx={{ cursor: 'pointer' }} />
            <LinkedInIcon sx={{ cursor: 'pointer' }} />
          </Box>
          
          <Typography variant="body2">
            © 2025 TrekSriLanka. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;