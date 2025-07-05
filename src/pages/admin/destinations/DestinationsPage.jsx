import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import DestinationsManagement from '../../../components/admin/DestinationsManagement.jsx';


function DestinationsPage() {
  return (
    <Box>
        <CssBaseline />      
        <DestinationsManagement />
      </Box>
  );
}

export default DestinationsPage;