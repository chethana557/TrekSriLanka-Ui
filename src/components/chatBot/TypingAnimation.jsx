//TypingAnimation.jsx
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import SmartToyIcon from '@mui/icons-material/SmartToy';

// Styled components for modern design with green theme
const TypingBubble = styled(Paper)(({ theme }) => ({
  padding: '12px 16px',
  borderRadius: '18px 18px 18px 4px',
  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  color: '#1a202c',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(0, 167, 157, 0.1)',
  maxWidth: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
}));

const TypingDot = styled('span')(({ delay, theme }) => ({
  display: 'inline-block',
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #00A79D 0%, #4AB9B0 100%)',
  animation: 'typingPulse 1.4s infinite both',
  animationDelay: `${delay}s`,
}));

const AssistantAvatar = styled(Avatar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  color: '#00A79D',
  width: 36,
  height: 36,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(0, 167, 157, 0.1)',
  marginRight: '8px',
}));

const TypingText = styled(Typography)(({ theme }) => ({
  color: '#94a3b8',
  fontSize: '0.75rem',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontWeight: 500,
  marginTop: '4px',
}));

export default function TypingAnimation() {
  return (
    <Box 
      display="flex" 
      justifyContent="flex-start" 
      alignItems="flex-end" 
      mb={2}
      sx={{
        animation: 'fadeInUp 0.3s ease-out',
        '@keyframes fadeInUp': {
          '0%': {
            opacity: 0,
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      <AssistantAvatar>
        <SmartToyIcon fontSize="small" />
      </AssistantAvatar>
      
      <Box display="flex" flexDirection="column">
        <TypingBubble>
          <TypingDot delay={0} />
          <TypingDot delay={0.2} />
          <TypingDot delay={0.4} />
        </TypingBubble>
        <TypingText variant="caption" sx={{ px: 1 }}>
          AI is typing...
        </TypingText>
      </Box>
      
      <style>{`
        @keyframes typingPulse {
          0%, 80%, 100% { 
            opacity: 0.3;
            transform: scale(0.8);
          }
          40% { 
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </Box>
  );
} 