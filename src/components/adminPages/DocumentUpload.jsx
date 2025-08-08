import React, { useState, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Card,
  CardContent,
  IconButton,
  Stack,
  Alert,
  Chip
} from '@mui/material';
import {
  Upload,
  Close,
  Description,
  Error,
  CheckCircle,
  HourglassEmpty
} from '@mui/icons-material';
import { BASE_URL } from '../../api';

const UploadStatus = {
  UPLOADING: 'uploading',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  ERROR: 'error'
};

export default function DocumentUpload({ onUploadComplete }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploads, setUploads] = useState([]);
  const fileInputRef = useRef(null);
  const getToken = () => localStorage.getItem('access_token');
  const getUsername = () => localStorage.getItem('username');

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(file => file.type === 'application/pdf');
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    files.forEach(file => {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return;
      }
      uploadFile(file);
    });
  };

  const uploadFile = async (file) => {
    const initialStatus = {
      file,
      status: UploadStatus.UPLOADING,
      progress: 0,
    };

    setUploads(prev => [...prev, initialStatus]);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulate upload progress
      const updateProgress = (progress) => {
        setUploads(prev => prev.map(upload => 
          upload.file === file ? { ...upload, progress } : upload
        ));
      };

      // Simulate progress
      for (let i = 0; i <= 100; i += 10) {
        setTimeout(() => updateProgress(i), i * 20);
      }

      const token = getToken();
      const username = getUsername();
      const response = await fetch(`${BASE_URL}/documents/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Username': username,
        },
        body: formData,
      });

      if (response.ok) {
        setUploads(prev => prev.map(upload => 
          upload.file === file 
            ? { ...upload, status: UploadStatus.PROCESSING, progress: 100 }
            : upload
        ));

        // Simulate processing
        setTimeout(() => {
          setUploads(prev => prev.map(upload => 
            upload.file === file 
              ? { ...upload, status: UploadStatus.COMPLETED }
              : upload
          ));
          onUploadComplete();
        }, 2000);
      } else {
        setUploads(prev => prev.map(upload => 
          upload.file === file 
            ? { ...upload, status: UploadStatus.ERROR, error: 'Upload failed' }
            : upload
        ));
      }
    } catch (error) {
      setUploads(prev => prev.map(upload => 
        upload.file === file 
          ? { ...upload, status: UploadStatus.ERROR, error: 'Network error' }
          : upload
      ));
    }
  };

  const removeUpload = (file) => {
    setUploads(prev => prev.filter(upload => upload.file !== file));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case UploadStatus.UPLOADING:
      case UploadStatus.PROCESSING:
        return <HourglassEmpty sx={{ animation: 'spin 1s linear infinite' }} />;
      case UploadStatus.COMPLETED:
        return <CheckCircle color="success" />;
      case UploadStatus.ERROR:
        return <Error color="error" />;
      default:
        return null;
    }
  };

  const getStatusText = (upload) => {
    switch (upload.status) {
      case UploadStatus.UPLOADING:
        return `Uploading... ${upload.progress}%`;
      case UploadStatus.PROCESSING:
        return 'Processing document...';
      case UploadStatus.COMPLETED:
        return 'Upload completed';
      case UploadStatus.ERROR:
        return upload.error || 'Upload failed';
      default:
        return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case UploadStatus.UPLOADING:
        return 'primary';
      case UploadStatus.PROCESSING:
        return 'warning';
      case UploadStatus.COMPLETED:
        return 'success';
      case UploadStatus.ERROR:
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Upload Area */}
      <Paper
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          border: '2px dashed',
          borderColor: isDragOver ? 'primary.main' : 'grey.300',
          bgcolor: isDragOver ? 'primary.50' : 'transparent',
          p: 4,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: 'grey.400',
          }
        }}
        elevation={0}
      >
        <Upload sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
        
        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 500 }}>
          Upload PDF Documents
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Drag and drop your PDF files here, or click to browse
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Maximum file size: 10MB • Supported format: PDF
        </Typography>
        
        <Button
          variant="contained"
          onClick={() => fileInputRef.current?.click()}
          sx={{ fontWeight: 500 }}
        >
          Choose Files
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </Paper>

      {/* Upload Status */}
      {uploads.length > 0 && (
        <Box>
          <Typography variant="h6" component="h4" gutterBottom sx={{ fontWeight: 500 }}>
            Upload Progress
          </Typography>
          
          <Stack spacing={2}>
            {uploads.map((upload, index) => (
              <Card key={index} variant="outlined" sx={{ bgcolor: 'grey.50' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Description color="disabled" />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {upload.file.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {(upload.file.size / 1024 / 1024).toFixed(2)} MB
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip
                        icon={getStatusIcon(upload.status)}
                        label={getStatusText(upload)}
                        size="small"
                        color={getStatusColor(upload.status)}
                        variant="outlined"
                      />
                      
                      {(upload.status === UploadStatus.COMPLETED || upload.status === UploadStatus.ERROR) && (
                        <IconButton
                          onClick={() => removeUpload(upload.file)}
                          size="small"
                          color="default"
                        >
                          <Close />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                  
                  {upload.status === UploadStatus.UPLOADING && (
                    <Box sx={{ mt: 2 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={upload.progress} 
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}