import React, { useRef } from 'react';
import Navbar from '../../components/common/Navbar.jsx';
import Footer_Combination from '../../components/common/Footer_Combination.jsx';
import HotelMainSection from '../../components/hotel/HotelMainSection.jsx'
import HotelWelcomeSection from '../../components/hotel/HotelWelcomeSection.jsx'
import HotelGallerySection from '../../components/hotel/HotelGallerySection.jsx'
import HotelFacilitiesAndRooms from '../../components/hotel/HotelFacilitiesAndRooms.jsx';

function HotelDetailsPage() {


  return (
    <div className="landing-page">
        <Navbar />
        <HotelMainSection />
        <HotelWelcomeSection />
        <HotelGallerySection />
        <HotelFacilitiesAndRooms />
        <Footer_Combination />
    </div>
  );
}

export default HotelDetailsPage;