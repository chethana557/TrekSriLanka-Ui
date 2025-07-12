import React, { useRef } from 'react';
import Navbar from '../../components/navbars/Navbar.jsx';
import BookingMainSection from '../../components/accommodation/BookingMainSection.jsx';
import BookingWelcomeSection from '../../components/accommodation/BookingWelcomeSection.jsx';
import SearchItems from '../../components/accommodation/SearchItems.jsx';
import BookingDestinationsSection from '../../components/accommodation/BookingDestinationSection.jsx';
import BookingMoreDestinationsSection from '../../components/accommodation/BookingMoreDestinationsSection.jsx'
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';

function AccommodationPackageDetailsPage() {

  return (
    <div className="landing-page">
      <Navbar />
      <BookingMainSection />
      <BookingWelcomeSection />
      <SearchItems />
      <div style={{ marginBottom: '90px' }} />
      <BookingDestinationsSection />
      <BookingMoreDestinationsSection />
      <Footer_Combination />
    </div>
  );
}

export default AccommodationPackageDetailsPage;




