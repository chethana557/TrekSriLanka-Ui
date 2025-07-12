import React, { useRef } from 'react';
import TourMainSection from '../../components/tourPackages/TourMainSection.jsx';
import TourWelcomeSection from '../../components/tourPackages/TourWelcomeSection.jsx';
import TourSearch from '../../components/tourPackages/TourSearch.jsx';
import SeasonalOffersSection from '../../components/tourPackages/SeasonalOffersSection.jsx';
import TourDestinationsSection from '../../components/tourPackages/TourDestinationsSection.jsx';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';

function TourPackagePage() {
  const welcomeSectionRef = useRef(null);
  const searchSectionRef = useRef(null);
  
  const handleScrollToWelcome = () => {
    welcomeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
        <Navbar />
        <TourMainSection onLetGoClick={handleScrollToWelcome} />
        <div ref={welcomeSectionRef}>
            <TourWelcomeSection />
        </div>
        <SeasonalOffersSection />
        <TourSearch />
        <TourDestinationsSection />
        <Footer_Combination />
    </div>
  );
}

export default TourPackagePage;