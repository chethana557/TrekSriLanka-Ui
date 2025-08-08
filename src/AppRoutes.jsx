import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/common/LoginPage.jsx';
import AccommodationPackageDetailsPage from './pages/user/AccommodationPackageDetailsPage.jsx';
import LandingPage from './pages/user/LandingPage.jsx';
import SignUpPage from './pages/user/SignUpPage.jsx';
import TourPackagePage from './pages/user/TourPackagePage.jsx';
import DestinationDetailsPage from './pages/user/DestinationDetailsPage.jsx';
import AboutUsPage from './pages/user/AboutUsPage.jsx'
import ContactUsPage from './pages/user/ContactUsPage.jsx'
import RecommendationPage from './pages/user/RecommendationPage.jsx'

// Admin page imports
import AdminDashboardPage from './pages/admin/dashboard/AdminDashboardPage.jsx';
import BookingsPage from './pages/admin/bookings/BookingsPage.jsx';
import ContactMessagesPage from './pages/admin/contactus/ContactMessagesPage.jsx';
import DestinationsPage from './pages/admin/destinations/DestinationsPage.jsx';
import FeedbacksPage from './pages/admin/feedbacks/FeedbacksPage.jsx';
import SeasonalOfferPage from './pages/admin/seasonal-offer/SeasonalOfferPage.jsx';
import TourPackagesPage from './pages/admin/tour-packages/TourPackagesPage.jsx';
import DocumentPage from './pages/admin/documents/DocumentPage.jsx'


// Admin route guard
const AdminRoute = ({ element }) => {
  const userType = localStorage.getItem('user_type');
  return userType === 'admin' ? element : <Navigate to="/" replace />;
};

const AppRoutes = () => (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/accommodation" element={<AccommodationPackageDetailsPage />} />
      <Route path="/packages" element={<TourPackagePage />} />
      <Route path="/destination" element={<DestinationDetailsPage />} />
      <Route path="/aboutus" element={<AboutUsPage />} />
      <Route path="/contactus" element={<ContactUsPage />} />
      <Route path="/recommendations" element={<RecommendationPage />} />
      
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminRoute element={<AdminDashboardPage />} />} />
      <Route path="/admin/bookings" element={<AdminRoute element={<BookingsPage />} />} />
      <Route path="/admin/messages" element={<AdminRoute element={<ContactMessagesPage />} />} />
      <Route path="/admin/destinations" element={<AdminRoute element={<DestinationsPage />} />} />
      <Route path="/admin/resources" element={<AdminRoute element={<DocumentPage />} />} />
      <Route path="/admin/feedback" element={<AdminRoute element={<FeedbacksPage />} />} />
      <Route path="/admin/seasonal-offers" element={<AdminRoute element={<SeasonalOfferPage />} />} />
      <Route path="/admin/tour-packages" element={<AdminRoute element={<TourPackagesPage />} />} />
      {/* <Route path="/admin/seasonal-offers/add" element={<AddNewSeasonalOffer />} /> */}
      {/* <Route path="/admin/tour-packages/add" element={<AddNewTourPackages />} /> */}
    </Routes>
);

export default AppRoutes; 