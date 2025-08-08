import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import ContactMessagesManagement from '../../../components/adminPages/ContactMessagesManagement';
import AdminNavBar from '../../../components/adminPages/AdminNavBar.jsx'
import Footer_Combination from '../../../components/footerCombination/Footer_Combination.jsx'
import ChatbotWidget from '../../../components/chatBot/ChatbotWidget.jsx';


function ContactMessagesPage() {
  return (
    <Box>
        <CssBaseline />   
        <AdminNavBar />     
        <ContactMessagesManagement />
        <ChatbotWidget />
        <Footer_Combination /> 
      </Box>
  );
}

export default ContactMessagesPage;