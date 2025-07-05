import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import FeedbackManagement from '../../../components/admin/FeedbackManagement';

function FeedbacksPage() {
  return (
    <Box>
        <CssBaseline />      
        <FeedbackManagement />
      </Box>
  );
}

export default FeedbacksPage;