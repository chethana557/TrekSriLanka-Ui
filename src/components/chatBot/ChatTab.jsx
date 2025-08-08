// ChatTab.jsx

import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Alert,
  AlertTitle,
  Chip
} from '@mui/material';
import {
  MessageSquare,
  FileText,
  Plus
} from 'lucide-react';
import ChatMessage from './ChatMessage.jsx';
import ChatInput from './ChatInput.jsx';
import TypingAnimation from './TypingAnimation.jsx';
import SessionManager from './SessionManager.jsx';
import SessionStats from './SessionStats.jsx';
import { BASE_URL } from '../../api/index.js';

export default function ChatTab() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasDocuments, setHasDocuments] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [showSessionManager, setShowSessionManager] = useState(false);
  const messagesEndRef = useRef(null);
  const token = localStorage.getItem('access_token');
  const username = localStorage.getItem('username');

  useEffect(() => {
    checkDocuments();
    initializeSession();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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
      console.error('Failed to load session history:', error);
    }
  };

  const handleSessionChange = async (sessionId) => {
    setCurrentSessionId(sessionId);
    await loadSessionHistory(sessionId);
    setShowSessionManager(false);
  };

  const handleNewSession = () => {
    setShowSessionManager(false);
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
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    if (!currentSessionId) {
      await createNewSession();
      return;
    }

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
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
          include_context: false
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
        
        setMessages(prev => [...prev, assistantMessage]);
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
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Chat Header */}
      <Paper 
        elevation={1} 
        sx={{ 
          borderBottom: '1px solid',
          borderColor: 'divider',
          p: 2
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MessageSquare 
                size={24} 
                style={{ color: '#1976d2', marginRight: '12px' }} 
              />
              <Box>
                <Typography variant="h6" component="h2" color="text.primary">
                  AI Document Chat
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {hasDocuments 
                    ? 'Ask questions about your uploaded documents' 
                    : 'Upload documents to start chatting'
                  }
                </Typography>
              </Box>
            </Box>
            
            <Button
              onClick={() => setShowSessionManager(!showSessionManager)}
              variant="outlined"
              startIcon={<Plus size={16} />}
              sx={{ textTransform: 'none' }}
            >
              Sessions
            </Button>
          </Box>
        </Container>
      </Paper>

      {/* Session Manager */}
      {showSessionManager && (
        <SessionManager
          currentSessionId={currentSessionId}
          onSessionChange={handleSessionChange}
          onNewSession={handleNewSession}
        />
      )}

      {/* Session Stats */}
      {currentSessionId && (
        <SessionStats
          currentSessionId={currentSessionId}
          messageCount={messages.length}
        />
      )}

      {/* Messages */}
      <Box 
        sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          backgroundColor: '#f5f5f5' 
        }}
      >
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {!hasDocuments && (
              <Alert 
                severity="info" 
                sx={{ 
                  borderRadius: 2,
                  textAlign: 'center'
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <FileText size={48} />
                  <Typography variant="h6" component="h3">
                    No Documents Found
                  </Typography>
                  <Typography variant="body2">
                    Upload PDF documents in the Documents tab to start asking questions about their content.
                  </Typography>
                </Box>
              </Alert>
            )}
            
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <Box sx={{ transition: 'all 0.3s ease-in-out' }}>
                <TypingAnimation />
              </Box>
            )}
            
            <div ref={messagesEndRef} />
          </Box>
        </Container>
      </Box>

      {/* Chat Input */}
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
    </Box>
  );
}