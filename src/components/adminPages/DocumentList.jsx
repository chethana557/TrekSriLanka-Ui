import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
  Stack,
  Skeleton,
  Alert
} from '@mui/material';
import {
  Description,
  CalendarToday,
  Storage,
  Delete,
  CheckCircle,
  Schedule,
  Error
} from '@mui/icons-material';
import { BASE_URL } from '../../api';

export default function DocumentList({ refreshTrigger }) {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Instead, get token directly from localStorage
  const getToken = () => localStorage.getItem('access_token');
  const getUsername = () => localStorage.getItem('username');

  useEffect(() => {
    fetchDocuments();
  }, [refreshTrigger]);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const token = getToken();
      const username = getUsername();
      const response = await fetch(`${BASE_URL}/documents/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Username': username,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDocuments(data.documents || []);
      }
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDocument = async (documentId) => {
    try {
      const token = getToken();
      const username = getUsername();
      const response = await fetch(`${BASE_URL}/documents/${documentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Username': username,
        },
      });

      if (response.ok) {
        // Remove the document from the local state
        setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      } else {
        console.error('Failed to delete document');
      }
    } catch (error) {
      console.error('Failed to delete document:', error);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <Schedule />;
      case 'completed':
        return <CheckCircle />;
      case 'failed':
        return <Error />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'processing':
        return 'Processing';
      case 'completed':
        return 'Ready';
      case 'failed':
        return 'Failed';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'warning';
      case 'completed':
        return 'success';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return (
      <Stack spacing={2}>
        {[...Array(3)].map((_, i) => (
          <Card key={i} variant="outlined">
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Skeleton variant="rectangular" width={40} height={40} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" height={24} />
                  <Skeleton variant="text" width="40%" height={20} />
                </Box>
                <Skeleton variant="rectangular" width={80} height={32} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  }

  if (documents.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Description sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 500 }}>
          No documents uploaded
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Upload your first PDF document to start chatting with AI about your content.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 500 }}>
          Your Documents ({documents.length})
        </Typography>
      </Box>

      <Stack spacing={2}>
        {documents.map((document) => (
          <Card 
            key={document.id} 
            variant="outlined" 
            sx={{ 
              transition: 'box-shadow 0.2s ease',
              '&:hover': { 
                boxShadow: 2 
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box 
                    sx={{ 
                      bgcolor: 'error.50', 
                      p: 1.5, 
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Description sx={{ color: 'error.main' }} />
                  </Box>
                  
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" component="h4" sx={{ fontWeight: 500, mb: 0.5 }}>
                      {document.filename}
                    </Typography>
                    
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Storage sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatFileSize(document.file_size)}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(document.upload_date)}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Chip
                    icon={getStatusIcon(document.processing_status)}
                    label={getStatusText(document.processing_status)}
                    size="small"
                    color={getStatusColor(document.processing_status)}
                    variant="outlined"
                  />
                  
                  <IconButton 
                    onClick={() => deleteDocument(document.id)}
                    size="small"
                    sx={{ 
                      color: 'grey.400',
                      '&:hover': { 
                        color: 'error.main' 
                      }
                    }}
                    title="Delete document"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
              
              {document.processing_status === 'failed' && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  Document processing failed. Please try uploading again.
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}