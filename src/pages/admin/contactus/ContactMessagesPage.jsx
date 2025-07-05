import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import ContactMessagesManagement from '../../../components/admin/ContactMessagesManagement';
import Footer_Combination from '../../../components//common/Footer_Combination.jsx'

function ContactMessagesPage() {
  return (
    <Box>
        <CssBaseline />      
        <ContactMessagesManagement />
      </Box>
  );
}

export default ContactMessagesPage;