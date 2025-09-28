import React, { useRef, useState } from 'react';
import DestinationsMoreSection from '../../components/destination/DestinationsMoreSection.jsx';
import DestinationMainSectionOne from '../../components/destination/DestinationMainSectionOne.jsx';
import Navbar from '../../components/navbars/Navbar.jsx';
import SriLankaExplorer from '../../components/landingPage/SriLankaExplorer.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';

function DestinationDetailsPage() {


  const [nearestTown, setNearestTown] = useState('');

  return (
    <div className="landing-page">
        <Navbar />
        <DestinationMainSectionOne />
        <div style={{ marginBottom: '90px' }} />
        <SriLankaExplorer onSelect={(name) => setNearestTown(name)} />
        <DestinationsMoreSection nearestTown={nearestTown} />
        <Footer_Combination />
    </div>
  );
}

export default DestinationDetailsPage;