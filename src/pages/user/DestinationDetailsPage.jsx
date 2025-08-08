import React, { useRef } from 'react';
import DestinationMainSection from '../../components/destination/DestinationMainSection.jsx';
import DestinationWelcomeSection from '../../components/destination/DestinationWelcomeSection.jsx';
import DestinationAdditionalDetails from '../../components/destination/DestinationAdditionalDetails.jsx';
import DestinationsMoreSection from '../../components/destination/DestinationsMoreSection.jsx';
import BookingMainSection from '../../components/accommodation/BookingMainSection.jsx';
import BookingWelcomeSection from '../../components/accommodation/BookingWelcomeSection.jsx';
import SearchItems from '../../components/accommodation/SearchItems.jsx';
import Navbar from '../../components/navbars/Navbar.jsx';
import SriLankaExplorer from '../../components/landingPage/SriLankaExplorer.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';

function DestinationDetailsPage() {


  return (
    <div className="landing-page">
        <Navbar />
        <BookingMainSection />
        <div style={{ marginBottom: '90px' }} />
        <SriLankaExplorer />
        {/* <DestinationMainSection />
        <DestinationWelcomeSection />
        <DestinationAdditionalDetails/> */}
        <DestinationsMoreSection />
        <Footer_Combination />
    </div>
  );
}

export default DestinationDetailsPage;