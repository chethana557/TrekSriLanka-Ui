import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import DocumentUpload from './DocumentUpload.jsx';
import DocumentList from './DocumentList.jsx';

export default function DocumentsTab() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadComplete = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          Document Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Upload PDF documents to enable AI-powered Q&A. Your documents are processed and vectorized for intelligent search.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <DocumentUpload onUploadComplete={handleUploadComplete} />
        <DocumentList refreshTrigger={refreshTrigger} />
      </Box>
    </Container>
  );
}