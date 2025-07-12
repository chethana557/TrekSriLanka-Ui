import React, { useRef } from 'react';
import Navbar from '../../components/common/Navbar.jsx';
import Footer_Combination from '../../components/common/Footer_Combination.jsx';
import HotelRoomMainSection from '../../components/hotel/HotelRoomMainSection.jsx'
import HotelGallery from '../../components/hotel/HotelGallery.jsx'
import HotelRoomFeatures from '../../components/hotel/HotelRoomFeatures.jsx'

function HotelReserveConfirm() {


  return (
    <div className="landing-page">
        <Navbar />
        <HotelRoomMainSection />
        <HotelGallery />
        <HotelRoomFeatures />
        <Footer_Combination />
    </div>
  );
}

export default HotelReserveConfirm;