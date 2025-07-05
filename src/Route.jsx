import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

// Import your existing components
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import AdminNavBar from './components/admin/AdminNavBar.jsx'; 

// Import admin pages
import FeedbacksPage from './pages/admin/feedbacks/FeedbacksPage.jsx'
import ContactMessagesPage from './pages/admin/contactus/ContactMessagesPage.jsx';
import DestinationsPage from './pages/admin/destinations/DestinationsPage.jsx'
import BookingsPage from './pages/admin/bookings/BookingsPage.jsx';
import TourPackagesPage from './pages/admin/tour-packages/TourPackagesPage.jsx';
import SeasonalOfferPage from './pages/admin/seasonal-offer/SeasonalOfferPage.jsx'
import AdminDashboardPage from './pages/admin/dashboard/AdminDashboardPage.jsx';
import Footer_Combination from './components/common/Footer_Combination.jsx';

// Admin Layout Component that wraps admin pages with navbar and footer
const AdminLayout = ({ children }) => (
  <Box >
    <AdminNavBar />
    <Box >
      {children}
    </Box>
    <Footer_Combination />
  </Box>
);

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public routes without admin layout */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Admin routes with admin layout */}
        <Route 
          path="/admin" 
          element={
            <AdminLayout>
              <AdminDashboardPage />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            <AdminLayout>
              <AdminDashboardPage />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/seasonal-offers" 
          element={
            <AdminLayout>
              <SeasonalOfferPage />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/tour-packages" 
          element={
            <AdminLayout>
              <TourPackagesPage />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/bookings" 
          element={
            <AdminLayout>
              <BookingsPage />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/destinations" 
          element={
            <AdminLayout>
              <DestinationsPage />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/messages" 
          element={
            <AdminLayout>
              <ContactMessagesPage />
            </AdminLayout>
          } 
        />
        <Route 
          path="/admin/feedback" 
          element={
            <AdminLayout>
              <FeedbacksPage />
            </AdminLayout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;