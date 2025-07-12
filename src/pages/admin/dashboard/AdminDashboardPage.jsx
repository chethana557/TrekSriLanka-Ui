import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import DashboardStatsSection from '../../../components/adminPages/DashboardStatsSection.jsx';
import QuickActionsSection from '../../../components/adminPages/QuickActionsSection.jsx';
import RecentBookingsSection from '../../../components/adminPages/RecentBookingsSection.jsx';
import AdminNavBar from '../../../components/adminPages/AdminNavBar.jsx'
import Footer_Combination from '../../../components/footerCombination/Footer_Combination.jsx'

function AdminDashboardPage() {
  return (
    <Box>
        <CssBaseline />      
        <AdminNavBar />   
        <DashboardStatsSection />
        <QuickActionsSection />
        <RecentBookingsSection />
        <Footer_Combination /> 
      </Box>
  );
}

export default AdminDashboardPage;