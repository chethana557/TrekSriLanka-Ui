import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import DocumentsTab from '../../../components/adminPages/DocumentsTab.jsx';
import AdminNavBar from '../../../components/adminPages/AdminNavBar.jsx'
import Footer_Combination from '../../../components/footerCombination/Footer_Combination.jsx'
import ChatbotWidget from '../../../components/chatBot/ChatbotWidget.jsx';


function DocumentPage() {
  return (
    <Box>
        <CssBaseline />   
        <AdminNavBar />      
        <DocumentsTab />
        <ChatbotWidget />
        <Footer_Combination />
      </Box>
  );
}

export default DocumentPage;