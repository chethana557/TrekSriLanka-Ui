import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/common/LoginPage.jsx';
import AccommodationPackageDetailsPage from './pages/user/AccommodationPackageDetailsPage.jsx';
import LandingPage from './pages/user/LandingPage.jsx';
import SignUpPage from './pages/user/SignUpPage.jsx';
import TourPackagePage from './pages/user/TourPackagePage.jsx';
import DestinationDetailsPage from './pages/user/DestinationDetailsPage.jsx';
import TourPackageDetailsPage from './pages/user/TourPackageDetailsPage.jsx';
import AboutUsPage from './pages/user/AboutUsPage.jsx'
import ContactUsPage from './pages/user/ContactUsPage.jsx'
import RecommendationPage from './pages/user/RecommendationPage.jsx'
import BookingFormPage from './pages/others/BookingFormPage.jsx';
import PackageBookingSummary from './pages/others/PackageBookingSummary.jsx';
import PaymentInformation from './pages/others/PaymentInformation.jsx';
import Confirmation from './pages/others/Confirmation.jsx';
// Hotel booking flow pages
import HotelBookingForm from './pages/others/HotelBookingForm.jsx';
import HotelBookingReview from './pages/others/HotelBookingReview.jsx';
import HotelPayment from './pages/others/HotelPayment.jsx';
import HotelBookingConfirmation from './pages/others/HotelBookingConfirmation.jsx';
import HotelDetailsPage from './pages/others/HotelDetailsPage.jsx';
import RoomDetailsPage from './pages/others/RoomDetailsPage.jsx';
import MyBookingsPage from './pages/user/MyBookingsPage.jsx';
import EditProfilePage from './pages/user/EditProfilePage.jsx';

// Admin page imports
import AdminDashboardPage from './pages/admin/dashboard/AdminDashboardPage.jsx';
import BookingsPage from './pages/admin/bookings/BookingsPage.jsx';
import ContactMessagesPage from './pages/admin/contactus/ContactMessagesPage.jsx';
import DestinationsPage from './pages/admin/destinations/DestinationsPage.jsx';
import AddDestinationPage from './pages/admin/destinations/AddDestinationPage.jsx';
import FeedbacksPage from './pages/admin/feedbacks/FeedbacksPage.jsx';
import SeasonalOfferPage from './pages/admin/seasonal-offer/SeasonalOfferPage.jsx';
import AddSeasonalOfferPage from './pages/admin/seasonal-offer/AddSeasonalOfferPage.jsx';
import TourPackagesPage from './pages/admin/tour-packages/TourPackagesPage.jsx';
import AddTourPackagePage from './pages/admin/tour-packages/AddTourPackagePage.jsx';
import DocumentPage from './pages/admin/documents/DocumentPage.jsx'
import HotelsPage from './pages/user/HotelsPage.jsx'
import HotelRequestsPage from './pages/admin/hotels/HotelRequestsPage.jsx'
import DestinationPage from './pages/user/DestinationPage.jsx';
import MainCitiesPage from './pages/admin/main-cities/MainCitiesPage.jsx';
import AddMainCityPage from './pages/admin/main-cities/AddMainCityPage.jsx';


// Admin route guard
const AdminRoute = ({ element }) => {
  const userType = localStorage.getItem('user_type');
  return userType === 'admin' ? element : <Navigate to="/" replace />;
};

// Auth route guard (requires access_token)
const AuthRoute = ({ element }) => {
  const token = localStorage.getItem('access_token');
  const location = useLocation();
  if (token) return element;
  return <Navigate to="/login" replace state={{ redirect: location.pathname }} />;
};

// Clears booking session data when user leaves the booking flow routes
const BookingFlowSessionReset = () => {
  const location = useLocation();
  useEffect(()=>{
    const bookingPaths = ['/booking','/booking/review','/booking/payment','/booking/confirmation'];
    const hotelBookingPaths = ['/hotels/'];
    const onBookingFlow = bookingPaths.some(p => location.pathname.startsWith(p));
    const onHotelBookingFlow = hotelBookingPaths.some(p => location.pathname.includes(p) && location.pathname.includes('/booking'));
    if(!onBookingFlow){
      try { sessionStorage.removeItem('bookingFormData'); } catch {}
      try { sessionStorage.removeItem('bookingFlowExpiry'); } catch {}
    }
    if(!onHotelBookingFlow){
      try { sessionStorage.removeItem('hotelBookingData'); } catch {}
      try { sessionStorage.removeItem('hotelBookingExpiry'); } catch {}
    }
  }, [location.pathname]);
  return null;
};

const AppRoutes = () => (
  <>
    <BookingFlowSessionReset />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/accommodation" element={<AccommodationPackageDetailsPage />} />
      <Route path="/packages" element={<TourPackagePage />} />
  <Route path="/packages/:id" element={<TourPackageDetailsPage />} />
  <Route path="/booking" element={<BookingFormPage />} />
      <Route path="/destination" element={<DestinationDetailsPage />} />
      <Route path="/destination/details" element={<DestinationPage />} />
  <Route path="/destination/city-details" element={<DestinationPage />} />
      <Route path="/aboutus" element={<AboutUsPage />} />
      <Route path="/contactus" element={<ContactUsPage />} />
      <Route path="/recommendations" element={<RecommendationPage />} />
      <Route path="/my-bookings" element={<AuthRoute element={<MyBookingsPage />} />} />
      <Route path="/edit-profile" element={<AuthRoute element={<EditProfilePage />} />} />
      <Route path="/hotels" element={<HotelsPage />} />
  <Route path="/hotels/:hotelId" element={<HotelDetailsPage />} />
      <Route path="/hotels/:hotelId/rooms/:roomIndex" element={<RoomDetailsPage />} />
  <Route path="/hotels/:hotelId/booking" element={<AuthRoute element={<HotelBookingForm />} />} />
  <Route path="/hotels/:hotelId/booking/review" element={<AuthRoute element={<HotelBookingReview />} />} />
  <Route path="/hotels/:hotelId/booking/payment" element={<AuthRoute element={<HotelPayment />} />} />
  <Route path="/hotels/:hotelId/booking/confirmation" element={<AuthRoute element={<HotelBookingConfirmation />} />} />
      
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminRoute element={<AdminDashboardPage />} />} />
      <Route path="/admin/bookings" element={<AdminRoute element={<BookingsPage />} />} />
      <Route path="/admin/messages" element={<AdminRoute element={<ContactMessagesPage />} />} />
      <Route path="/admin/destinations" element={<AdminRoute element={<DestinationsPage />} />} />
      <Route path="/admin/destinations/add" element={<AdminRoute element={<AddDestinationPage />} />} />
      <Route path="/admin/main-cities" element={<AdminRoute element={<MainCitiesPage />} />} />
      <Route path="/admin/main-cities/add" element={<AdminRoute element={<AddMainCityPage />} />} />
      <Route path="/admin/resources" element={<AdminRoute element={<DocumentPage />} />} />
      <Route path="/admin/feedback" element={<AdminRoute element={<FeedbacksPage />} />} />
      <Route path="/admin/seasonal-offers" element={<AdminRoute element={<SeasonalOfferPage />} />} />
      <Route path="/admin/seasonal-offers/add" element={<AdminRoute element={<AddSeasonalOfferPage />} />} />
      <Route path="/admin/tour-packages" element={<AdminRoute element={<TourPackagesPage />} />} />
      <Route path="/admin/tour-packages/add" element={<AdminRoute element={<AddTourPackagePage />} />} />
      <Route path="/admin/hotel-requests" element={<AdminRoute element={<HotelRequestsPage />} />} />
  <Route path="/booking/review" element={<AuthRoute element={<PackageBookingSummary />} />} />
  <Route path="/booking/payment" element={<AuthRoute element={<PaymentInformation />} />} />
  <Route path="/booking/confirmation" element={<AuthRoute element={<Confirmation />} />} />
      {/* <Route path="/admin/seasonal-offers/add" element={<AddNewSeasonalOffer />} /> */}
      {/* <Route path="/admin/tour-packages/add" element={<AddNewTourPackages />} /> */}
    </Routes>
  </>
);

export default AppRoutes;