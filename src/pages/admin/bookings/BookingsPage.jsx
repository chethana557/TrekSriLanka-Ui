import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import BookingsManagement from '../../../components/admin/BookingsManagement.jsx';

function BookingsPage() {
  return (
    <Box>
        <CssBaseline />      
        <BookingsManagement />
    </Box>
  );
}

export default BookingsPage;