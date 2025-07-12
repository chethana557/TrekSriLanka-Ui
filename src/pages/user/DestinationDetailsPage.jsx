import React, { useRef } from 'react';
import DestinationMainSection from '../../components/destination/DestinationMainSection.jsx';
import DestinationWelcomeSection from '../../components/destination/DestinationWelcomeSection.jsx';
import DestinationAdditionalDetails from '../../components/destination/DestinationAdditionalDetails.jsx';
import DestinationsMoreSection from '../../components/destination/DestinationsMoreSection.jsx';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';

function DestinationDetailsPage() {


  return (
    <div className="landing-page">
        <Navbar />
        <DestinationMainSection />
        <DestinationWelcomeSection />
        <DestinationAdditionalDetails/>
        <DestinationsMoreSection />
        <Footer_Combination />
    </div>
  );
}

export default DestinationDetailsPage;