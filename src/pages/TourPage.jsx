import React, { useRef } from 'react';
import TourMainSection from '../components/tour/TourMainSection.jsx';
import TourWelcomeSection from '../components/tour/TourWelcomeSection.jsx';
import TourSearch from '../components/tour/TourSearch.jsx';
import SeasonalOffersSection from '../components/tour/SeasonalOffersSection.jsx';
import TourDestinationsSection from '../components/tour/TourDestinationsSection.jsx';
import Navbar from '../components/common/Navbar.jsx';
import Footer_Combination from '../components/common/Footer_Combination.jsx';

function TourPage() {
  const welcomeSectionRef = useRef(null);
  const searchSectionRef = useRef(null);
  
  const handleScrollToWelcome = () => {
    welcomeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
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

export default TourPage;