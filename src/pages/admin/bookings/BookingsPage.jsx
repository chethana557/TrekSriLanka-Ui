import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import AdminNavBar from '../../../components/adminPages/AdminNavBar.jsx'
import BookingsManagement from '../../../components/adminPages/BookingsManagement.jsx';
import Footer_Combination from '../../../components/footerCombination/Footer_Combination.jsx'
import ChatbotWidget from '../../../components/chatBot/ChatbotWidget.jsx';

function BookingsPage() {
  return (
    <Box>
        <CssBaseline />   
        <AdminNavBar />   
        <BookingsManagement />
        <ChatbotWidget />
        <Footer_Combination />
    </Box>
  );
}

export default BookingsPage;