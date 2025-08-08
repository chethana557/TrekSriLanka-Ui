import React, { useState, useRef, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

// Styled components for modern design with green theme
const InputContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  borderRadius: '24px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
  backgroundColor: '#ffffff',
  border: '1px solid rgba(0, 167, 157, 0.1)',
  transition: 'all 0.2s ease',
  '&:focus-within': {
    boxShadow: '0 4px 16px rgba(0, 167, 157, 0.15)',
    border: '1px solid rgba(0, 167, 157, 0.3)',
    transform: 'translateY(-1px)',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,
  fontSize: '14px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  backgroundColor: 'transparent',
  borderRadius: '16px',
  padding: '8px 12px',
  '& .MuiInputBase-input': {
    fontSize: '14px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    '&::placeholder': {
      color: '#94a3b8',
      opacity: 1,
    },
  },
  '&:focus': {
    backgroundColor: 'transparent',
  },
}));

const SendButton = styled(IconButton)(({ theme, disabled }) => ({
  background: disabled 
    ? 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%)'
    : 'linear-gradient(135deg, #00A79D 0%, #4AB9B0 100%)',
  color: disabled ? '#94a3b8' : 'white',
  borderRadius: '50%',
  width: 36,
  height: 36,
  marginLeft: '8px',
  boxShadow: disabled 
    ? '0 2px 4px rgba(0, 0, 0, 0.1)'
    : '0 4px 12px rgba(0, 167, 157, 0.3)',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: disabled ? 'none' : 'scale(1.05)',
    boxShadow: disabled 
      ? '0 2px 4px rgba(0, 0, 0, 0.1)'
      : '0 6px 16px rgba(0, 167, 157, 0.4)',
  },
  '&:active': {
    transform: disabled ? 'none' : 'scale(0.95)',
  },
}));

const AttachButton = styled(IconButton)(({ theme }) => ({
  color: '#94a3b8',
  borderRadius: '50%',
  width: 32,
  height: 32,
  marginRight: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: '#00A79D',
    backgroundColor: 'rgba(0, 167, 157, 0.1)',
    transform: 'scale(1.05)',
  },
}));

export default function ChatInput({ onSendMessage, isLoading }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
  };

  const handleAttachFile = () => {
    // File attachment functionality can be added here
    console.log('Attach file clicked');
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputContainer>
        <AttachButton onClick={handleAttachFile} size="small">
          <AttachFileIcon fontSize="small" />
        </AttachButton>
        
        <StyledInputBase
          inputRef={textareaRef}
          value={message}
          onChange={handleTyping}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          multiline
          maxRows={4}
          fullWidth
          disabled={isLoading}
        />
        
        <SendButton
          type="submit"
          disabled={!message.trim() || isLoading}
          size="small"
        >
          <SendIcon fontSize="small" />
        </SendButton>
      </InputContainer>
    </form>
  );
} 