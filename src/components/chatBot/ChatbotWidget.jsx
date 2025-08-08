import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Chat, Close, Minimize, Message, Add, Settings, Person, AutoAwesome, SmartToy, OpenInFull } from '@mui/icons-material';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingAnimation from './TypingAnimation';
import SessionManager from './SessionManager';
import { BASE_URL } from '../../api/index.js';

// Styled components for modern design with green theme
const FloatingButton = styled(IconButton)(({ theme }) => ({
  background: 'linear-gradient(135deg, #00A79D 0%, #4AB9B0 100%)',
  color: 'white',
  width: 60,
  height: 60,
  boxShadow: '0 8px 32px rgba(0, 167, 157, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(0, 167, 157, 0.4)',
    background: 'linear-gradient(135deg, #4AB9B0 0%, #00A79D 100%)',
  },
}));

const ChatContainer = styled(Paper)(({ theme }) => ({
  borderRadius: 20,
  overflow: 'hidden',
  boxShadow: '0 20px 60px rgba(0, 167, 157, 0.15)',
  // border: '1px solid rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  background: 'rgba(255, 255, 255, 0.95)',
}));

const ModernHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #00A79D 0%, #4AB9B0 100%)',
  color: 'white',
  padding: '16px 20px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
    animation: 'shimmer 2s infinite',
  },
}));

const MessageContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
  height: '500px',
  overflowY: 'auto',
  padding: '16px',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(135deg, #00A79D 0%, #4AB9B0 100%)',
    borderRadius: '3px',
  },
}));

const WelcomeCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #00A79D 0%, #4AB9B0 100%)',
  color: 'white',
  padding: '24px',
  textAlign: 'center',
  borderRadius: '16px',
  marginBottom: '16px',
  boxShadow: '0 8px 32px rgba(0, 167, 157, 0.2)',
}));

const SuggestionChip = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  padding: '8px 16px',
  margin: '4px',
  borderRadius: '20px',
  fontSize: '12px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backdropFilter: 'blur(10px)',
}));

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSessionManager, setShowSessionManager] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasDocuments, setHasDocuments] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (isOpen && !isMinimized) {
      initializeSession();
      checkDocuments();
    }
    // eslint-disable-next-line
  }, [isOpen, isMinimized]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeSession = async () => {
    try {
      const response = await fetch(`${BASE_URL}/rag/sessions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.sessions && data.sessions.length > 0) {
          setCurrentSessionId(data.sessions[0].id);
          await loadSessionHistory(data.sessions[0].id);
        }
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error('Failed to initialize session:', error);
    }
  };

  const createNewSession = async () => {
    try {
      const response = await fetch(`${BASE_URL}/rag/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ session_name: 'New Chat' }),
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentSessionId(data.session_id);
        setMessages([]);
        return data.session_id;
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error('Failed to create session:', error);
    }
    return null;
  };

  const loadSessionHistory = async (sessionId) => {
    try {
      const response = await fetch(`${BASE_URL}/rag/sessions/${sessionId}/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const formattedMessages = data.messages.map((msg) => ({
          id: Date.now().toString() + Math.random(),
          content: msg.content,
          sender: msg.type === 'human' ? 'user' : 'assistant',
          timestamp: msg.timestamp,
          sources: msg.context || [],
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error('Failed to load session history:', error);
    }
  };

  const handleSessionChange = async (sessionId) => {
    setCurrentSessionId(sessionId);
    await loadSessionHistory(sessionId);
  };

  const handleNewSession = () => {
    createNewSession();
  };

  const checkDocuments = async () => {
    try {
      const response = await fetch(`${BASE_URL}/documents/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setHasDocuments(data.documents && data.documents.length > 0);
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error('Failed to check documents:', error);
    }
  };

  const sendMessage = async (content) => {
    if (!hasDocuments) {
      const errorMessage = {
        id: Date.now().toString(),
        content: "Please upload some PDF documents first before asking questions. Go to the Documents tab to upload your files.",
        sender: 'assistant',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }
    if (!currentSessionId) {
      await createNewSession();
      return;
    }
    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/rag/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: content,
          session_id: currentSessionId,
          include_context: false,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          content: data.response,
          sender: 'assistant',
          timestamp: new Date().toISOString(),
          sources: data.context || [],
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I couldn't process your request right now. Please try again later.",
        sender: 'assistant',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => {
    if (isOpen) {
      setIsMinimized(!isMinimized);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  // Floating bot button (when chat is closed)
  if (!isOpen) {
    // Check if user is logged in (has token)
    const token = localStorage.getItem('access_token');
    if (!token) {
      return null; // Don't show the floating button if no token
    }

    return (
      <Box position="fixed" bottom={24} right={24} zIndex={1300}>
        <Tooltip title="Chat with TreckSL AI Assistant" placement="top">
          <FloatingButton onClick={toggleChat} size="large">
            <Badge badgeContent={unreadCount > 9 ? '9+' : unreadCount} color="error" invisible={unreadCount === 0}>
              <SmartToy fontSize="large" />
            </Badge>
          </FloatingButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box position="fixed" bottom={24} right={24} zIndex={1300}>
      <ChatContainer sx={{ 
        width: isMinimized ? 320 : 450, 
        height: isMinimized ? 64 : 700, 
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
      }}>
        {/* Modern Header */}
        <ModernHeader>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                color: 'white', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                backdropFilter: 'blur(10px)'
              }}>
                <SmartToy />
              </Avatar>
              {!isMinimized && (
                <Box>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ 
                    fontFamily: 'system-ui, -apple-system, sans-serif', 
                    color: 'white', 
                    letterSpacing: 1 
                  }}>
                    TreckSL AI Assistant
                  </Typography>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <AutoAwesome sx={{ fontSize: 16, color: '#FFD700' }} />
                    <Typography variant="caption" sx={{ color: '#FFD700' }}>
                      Powered by Gemini
                    </Typography>
                  </Box>
                </Box>
              )}
              {isMinimized && (
                <Typography variant="subtitle2" fontWeight={600} sx={{ 
                  fontFamily: 'system-ui, -apple-system, sans-serif', 
                  color: 'white', 
                  letterSpacing: 0.5 
                }}>
                  TreckSL AI
                </Typography>
              )}
            </Box>
            <Box>
              {!isMinimized && (
                <Tooltip title="Sessions">
                  <IconButton sx={{ 
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
                  }} onClick={() => setShowSessionManager(!showSessionManager)}>
                    <Message fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title={isMinimized ? "Expand Chat" : "Minimize Chat"}>
                <IconButton sx={{ 
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
                }} onClick={toggleChat}>
                  {isMinimized ? <OpenInFull fontSize="small" /> : <Minimize fontSize="small" />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Close">
                <IconButton sx={{ 
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' }
                }} onClick={closeChat}>
                  <Close fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </ModernHeader>
        
        {!isMinimized && (
          <>
            {showSessionManager ? (
              <Box sx={{ height: 520, overflowY: 'auto', bgcolor: '#f8fafc' }}>
                <SessionManager
                  currentSessionId={currentSessionId}
                  onSessionChange={handleSessionChange}
                  onNewSession={handleNewSession}
                />
              </Box>
            ) : (
              <>
                {/* Messages */}
                <MessageContainer>
                  {!hasDocuments && (
                    <WelcomeCard>
                      <Avatar sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.2)', 
                        color: 'white', 
                        mx: 'auto', 
                        mb: 2,
                        backdropFilter: 'blur(10px)'
                      }}>
                        <Message fontSize="large" />
                      </Avatar>
                      <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                        No Documents Found
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
                        Upload documents to start chatting with your AI assistant
                      </Typography>
                      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                        <Settings sx={{ fontSize: 16, color: '#FFD700' }} />
                        <Typography variant="caption" sx={{ color: '#FFD700' }}>
                          Go to Documents tab to upload
                        </Typography>
                      </Box>
                    </WelcomeCard>
                  )}
                  {messages.length === 0 && hasDocuments && (
                    <Box textAlign="center" py={4}>
                      <Avatar sx={{ 
                        bgcolor: 'linear-gradient(135deg, #00A79D 0%, #4AB9B0 100%)', 
                        color: 'white', 
                        mx: 'auto', 
                        mb: 3,
                        width: 64,
                        height: 64
                      }}>
                        <SmartToy fontSize="large" />
                      </Avatar>
                      <Typography variant="h6" fontWeight={700} sx={{ 
                        background: 'linear-gradient(135deg, #00A79D 0%, #4AB9B0 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 2
                      }}>
                        Welcome! 👋
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={3}>
                        I'm your AI assistant. Ask me anything about your documents!
                      </Typography>
                      <Box display="flex" flexDirection="column" gap={1}
                      >
                        <SuggestionChip onClick={() => sendMessage("What are the main topics in my documents?")}
                          sx={{ 
                            background: 'linear-gradient(135deg, #00A79D 0%, #4AB9B0 100%)',
                            color: "white" 
                          }}>
                          "What are the main topics in my documents?"
                        </SuggestionChip>
                        <SuggestionChip 
                          onClick={() => sendMessage("Can you summarize the key points?")} 
                          sx={{ 
                            background: 'linear-gradient(135deg, #00A79D 0%, #4AB9B0 100%)',
                            color: "white" 
                          }}
                        >
                          "Can you summarize the key points?"
                        </SuggestionChip>
                        <SuggestionChip onClick={() => sendMessage("Explain the concepts in simple terms")}
                          sx={{ 
                            background: 'linear-gradient(135deg, #00A79D 0%, #4AB9B0 100%)',
                            color: "white"
                          }}>
                          "Explain the concepts in simple terms"
                        </SuggestionChip>
                      </Box>
                    </Box>
                  )}
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {isLoading && (
                    <TypingAnimation />
                  )}
                  <div ref={messagesEndRef} />
                </MessageContainer>
                {/* Chat Input */}
                <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.1)', bgcolor: 'white', p: 2 }}>
                  <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
                </Box>
              </>
            )}
          </>
        )}
      </ChatContainer>
    </Box>
  );
} 