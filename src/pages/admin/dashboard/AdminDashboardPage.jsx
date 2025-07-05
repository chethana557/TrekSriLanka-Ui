import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import DashboardStatsSection from '../../../components/admin/DashboardStatsSection.jsx';
import QuickActionsSection from '../../../components/admin/QuickActionsSection.jsx';
import RecentBookingsSection from '../../../components/admin/RecentBookingsSection.jsx';
import Footer_Combination from '../../../components/common/Footer_Combination.jsx'

function AdminDashboardPage() {
  return (
    <Box>
        <CssBaseline />      
        <DashboardStatsSection />
        <QuickActionsSection />
        <RecentBookingsSection />
      </Box>
  );
}

export default AdminDashboardPage;