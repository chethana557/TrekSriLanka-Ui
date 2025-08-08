import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import MessageIcon from '@mui/icons-material/Message';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TagIcon from '@mui/icons-material/Tag';
import { BASE_URL } from '../../api/index.js';

// Styled components for modern design with green theme
const SessionCard = styled(Paper)(({ isActive, theme }) => ({
  padding: '16px',
  border: `2px solid ${isActive ? '#00A79D' : '#e2e8f0'}`,
  backgroundColor: isActive ? '#f0fdf4' : '#ffffff',
  borderRadius: '12px',
  boxShadow: isActive ? '0 4px 12px rgba(0, 167, 157, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.08)',
  cursor: 'pointer',
  position: 'relative',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 4px 16px rgba(0, 167, 157, 0.2)',
    borderColor: '#00A79D',
    transform: 'translateY(-1px)',
  },
}));

const NewChatButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #00A79D 0%, #4AB9B0 100%)',
  color: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 167, 157, 0.3)',
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #4AB9B0 0%, #00A79D 100%)',
    boxShadow: '0 6px 16px rgba(0, 167, 157, 0.4)',
    transform: 'translateY(-1px)',
  },
}));

const EmptyStateCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
  padding: '24px',
  borderRadius: '12px',
  marginBottom: '16px',
  border: '1px solid rgba(0, 167, 157, 0.1)',
  textAlign: 'center',
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  color: '#00A79D',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 167, 157, 0.1)',
    transform: 'scale(1.05)',
  },
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  color: '#ef4444',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    transform: 'scale(1.05)',
  },
}));

const ActiveIndicator = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '8px',
  right: '8px',
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #00A79D 0%, #4AB9B0 100%)',
  boxShadow: '0 2px 4px rgba(0, 167, 157, 0.3)',
}));

export default function SessionManager({ currentSessionId, onSessionChange, onNewSession }) {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingSession, setEditingSession] = useState(null);
  const [editName, setEditName] = useState('');
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    fetchSessions();
    // eslint-disable-next-line
  }, []);

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/rag/sessions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSessions(data.sessions || []);
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error('Failed to fetch sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createSession = async (name = 'New Chat') => {
    try {
      const response = await fetch(`${BASE_URL}/rag/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ session_name: name }),
      });
      if (response.ok) {
        const data = await response.json();
        await fetchSessions();
        onSessionChange(data.session_id);
        return data.session_id;
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error('Failed to create session:', error);
    }
    return null;
  };

  const updateSessionName = async (sessionId, newName) => {
    try {
      const response = await fetch(`${BASE_URL}/rag/sessions/${sessionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ session_name: newName }),
      });
      if (response.ok) {
        setSessions((prev) => prev.map((session) =>
          session.id === sessionId ? { ...session, name: newName } : session
        ));
        setEditingSession(null);
        setEditName('');
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error('Failed to update session:', error);
    }
  };

  const deleteSession = async (sessionId) => {
    try {
      const response = await fetch(`${BASE_URL}/rag/sessions/${sessionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setSessions((prev) => prev.filter((session) => session.id !== sessionId));
        if (currentSessionId === sessionId) {
          const newSessionId = await createSession();
          if (newSessionId) {
            onSessionChange(newSessionId);
          }
        }
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error('Failed to delete session:', error);
    }
  };

  const handleNewSession = async () => {
    const sessionId = await createSession();
    if (sessionId) {
      onNewSession();
    }
  };

  const startEditing = (session) => {
    setEditingSession(session.id);
    setEditName(session.name);
  };

  const handleEditSubmit = (sessionId) => {
    if (editName.trim()) {
      updateSessionName(sessionId, editName.trim());
    } else {
      setEditingSession(null);
      setEditName('');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 168) {
      return `${Math.floor(diffInHours / 24)}d ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  if (isLoading) {
    return (
      <Box p={3}>
        {[...Array(3)].map((_, i) => (
          <Paper key={i} sx={{ height: 60, mb: 2, bgcolor: '#f0fdf4', borderRadius: 2 }} />
        ))}
      </Box>
    );
  }

  return (
    <Box p={3}>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box>
          <Typography variant="h6" fontWeight={700} sx={{ color: '#00A79D' }}>
            Chat Sessions
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            {sessions.length} session{sessions.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
        <NewChatButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewSession}
        >
          New Chat
        </NewChatButton>
      </Box>
      
      {/* Sessions List */}
      <Box display="flex" flexDirection="column" gap={2}>
        {sessions.length === 0 ? (
          <Box textAlign="center" py={6}>
            <EmptyStateCard>
              <MessageIcon sx={{ fontSize: 40, color: '#00A79D', mb: 1 }} />
              <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#00A79D', mb: 1 }}>
                No chat sessions yet
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Create your first session to start chatting
              </Typography>
            </EmptyStateCard>
            <NewChatButton variant="contained" onClick={handleNewSession}>
              Start Your First Chat
            </NewChatButton>
          </Box>
        ) : (
          sessions.map((session) => (
            <SessionCard
              key={session.id}
              isActive={currentSessionId === session.id}
              onClick={() => onSessionChange(session.id)}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box flex={1} minWidth={0}>
                  {editingSession === session.id ? (
                    <Box display="flex" alignItems="center" gap={1}>
                      <TextField
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleEditSubmit(session.id)}
                        onBlur={() => handleEditSubmit(session.id)}
                        size="small"
                        autoFocus
                        sx={{ flex: 1 }}
                      />
                      <ActionButton onClick={() => handleEditSubmit(session.id)}>
                        <CheckIcon />
                      </ActionButton>
                    </Box>
                  ) : (
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600} noWrap sx={{ color: '#1a202c' }}>
                        {session.name}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={2} mt={0.5}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <TagIcon sx={{ fontSize: 16, color: '#00A79D' }} />
                          <Typography variant="caption" sx={{ color: '#64748b' }}>
                            {session.message_count} messages
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <AccessTimeIcon sx={{ fontSize: 16, color: '#00A79D' }} />
                          <Typography variant="caption" sx={{ color: '#64748b' }}>
                            {formatDate(session.updated_at)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
                {editingSession !== session.id && (
                  <Box display="flex" alignItems="center" gap={1} ml={2}>
                    <ActionButton size="small" onClick={(e) => { e.stopPropagation(); startEditing(session); }}>
                      <EditIcon fontSize="small" />
                    </ActionButton>
                    <DeleteButton size="small" onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }}>
                      <DeleteIcon fontSize="small" />
                    </DeleteButton>
                  </Box>
                )}
              </Box>
              {/* Active Indicator */}
              {currentSessionId === session.id && <ActiveIndicator />}
            </SessionCard>
          ))
        )}
      </Box>
    </Box>
  );
} 