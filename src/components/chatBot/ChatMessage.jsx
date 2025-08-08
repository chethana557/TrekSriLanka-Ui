//ChatMessage.jsx
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DescriptionIcon from '@mui/icons-material/Description';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// Styled components for modern design with green theme
const MessageBubble = styled(Paper)(({ isUser, theme }) => ({
  padding: '12px 16px',
  borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
  background: isUser 
    ? 'linear-gradient(135deg, #00A79D 0%, #4AB9B0 100%)'
    : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  color: isUser ? 'white' : '#1a202c',
  boxShadow: isUser 
    ? '0 4px 12px rgba(0, 167, 157, 0.3)'
    : '0 2px 8px rgba(0, 0, 0, 0.08)',
  border: isUser ? 'none' : '1px solid rgba(0, 167, 157, 0.1)',
  maxWidth: '100%',
  wordBreak: 'break-word',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: isUser 
      ? '0 6px 16px rgba(0, 167, 157, 0.4)'
      : '0 4px 12px rgba(0, 0, 0, 0.12)',
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #00A79D 0%, #4AB9B0 100%)',
  color: 'white',
  width: 36,
  height: 36,
  boxShadow: '0 4px 12px rgba(0, 167, 157, 0.3)',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const AssistantAvatar = styled(Avatar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  color: '#00A79D',
  width: 36,
  height: 36,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(0, 167, 157, 0.1)',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const SourceItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
  padding: '8px 12px',
  borderRadius: '12px',
  marginBottom: '4px',
  border: '1px solid rgba(0, 167, 157, 0.1)',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)',
    transform: 'translateX(2px)',
  },
}));

const TimestampText = styled(Typography)(({ theme }) => ({
  color: '#94a3b8',
  fontSize: '0.75rem',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontWeight: 500,
}));

export default function ChatMessage({ message }) {
  const isUser = message.sender === 'user';
  const hasSources = message.sources && message.sources.length > 0;

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-LK', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Colombo',
    });
  };

  return (
    <Box 
      display="flex" 
      justifyContent={isUser ? 'flex-end' : 'flex-start'} 
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
      <Box 
        display="flex" 
        alignItems="flex-start" 
        maxWidth="85%" 
        flexDirection={isUser ? 'row-reverse' : 'row'}
        gap={1}
      >
        {/* Avatar */}
        {isUser ? (
          <UserAvatar>
            <PersonIcon fontSize="small" />
          </UserAvatar>
        ) : (
          <AssistantAvatar>
            <SmartToyIcon fontSize="small" />
          </AssistantAvatar>
        )}
        
        {/* Message Content */}
        <Box display="flex" flexDirection="column" alignItems={isUser ? 'flex-end' : 'flex-start'} flex={1}>
          {/* Message Bubble */}
          <MessageBubble isUser={isUser}>
            <Typography 
              variant="body2" 
              sx={{ 
                whiteSpace: 'pre-wrap', 
                fontFamily: 'system-ui, -apple-system, sans-serif',
                lineHeight: 1.5,
                fontSize: '0.875rem',
              }}
            >
              {message.content}
            </Typography>
            
            {/* Sources */}
            {hasSources && (
              <Box mt={2} pt={2} borderTop="1px solid rgba(0,0,0,0.08)">
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <DescriptionIcon sx={{ fontSize: 16, color: isUser ? 'rgba(255,255,255,0.8)' : '#00A79D' }} />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: isUser ? 'rgba(255,255,255,0.8)' : '#00A79D',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                    }}
                  >
                    Sources:
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column" gap={0.5}>
                  {message.sources.slice(0, 3).map((source, index) => (
                    <SourceItem key={index}>
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          flex: 1, 
                          textOverflow: 'ellipsis', 
                          overflow: 'hidden', 
                          whiteSpace: 'nowrap', 
                          color: '#374151',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                        }}
                      >
                        {source.length > 60 ? `${source.substring(0, 60)}...` : source}
                      </Typography>
                      <OpenInNewIcon sx={{ fontSize: 14, color: '#00A79D', ml: 1 }} />
                    </SourceItem>
                  ))}
                  {message.sources.length > 3 && (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: isUser ? 'rgba(255,255,255,0.7)' : '#94a3b8', 
                        fontStyle: 'italic',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        mt: 0.5,
                      }}
                    >
                      +{message.sources.length - 3} more sources
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </MessageBubble>
          
          {/* Timestamp */}
          <TimestampText align={isUser ? 'right' : 'left'} sx={{ px: 1, mt: 0.5 }}>
            {formatTime(message.timestamp)}
          </TimestampText>
        </Box>
      </Box>
    </Box>
  );
} 