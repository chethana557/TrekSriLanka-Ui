import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Container,
  useMediaQuery,
  useTheme
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const quickActions = [
  {
    id: 1,
    title: 'Add Seasonal Offer',
    icon: TrendingUpIcon,
    bgColor: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
    iconColor: '#1976D2',
    borderColor: '#BBDEFB'
  },
  {
    id: 2,
    title: 'Add Tour Package',
    icon: AddIcon,
    bgColor: 'linear-gradient(135deg, #E8F5E8 0%, #C8E6C9 100%)',
    iconColor: '#388E3C',
    borderColor: '#C8E6C9'
  },
  {
    id: 3,
    title: 'Add Destination',
    icon: LocationOnIcon,
    bgColor: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
    iconColor: '#7B1FA2',
    borderColor: '#E1BEE7'
  }
];

function QuickActionsSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ width: '100%', py: 6 }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              color: '#00A79D', 
              fontWeight: 'bold',
              mb: 1,
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            Quick Actions
          </Typography>
        </Box>

        {/* Action Cards Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 3,
            mb: 2
          }}
        >
          {quickActions.map((action) => (
            <Card
              key={action.id}
              sx={{
                borderRadius: '16px',
                border: `2px solid ${action.borderColor}`,
                background: action.bgColor,
                cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                },
                minHeight: { xs: '60px', sm: '70px' }
              }}
            >
              <CardContent 
                sx={{ 
                  p: 2, // Reduced from 3 to 2
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'row', // Changed from 'column' to 'row'
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1.5 // Reduced gap between icon and text
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32, // Reduced from 40
                    height: 32, // Reduced from 40
                    borderRadius: '50%',
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    flexShrink: 0
                  }}
                >
                  <action.icon 
                    sx={{ 
                      fontSize: 18, // Reduced from 20 
                      color: action.iconColor 
                    }} 
                  />
                </Box>

                {/* Title */}
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: '#333',
                    fontSize: { xs: '0.95rem', sm: '1rem' }, // Reduced font size
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    lineHeight: 1.3,
                    textAlign: 'center'
                  }}
                >
                  {action.title}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default QuickActionsSection;