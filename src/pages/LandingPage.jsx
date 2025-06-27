import React, { useRef } from 'react';
import MainSection from '../components/landing/MainSection.jsx';
import WelcomeSection from '../components/landing/WelcomeSection.jsx';
import DestinationsSection from '../components/landing/DestinationsSection.jsx';
import Navbar from '../components/common/Navbar.jsx';
import MoreDestinationsSection from '../components/landing/MoreDestinationsSection.jsx';
import SriLankaExplorer from '../components/landing/SriLankaExplorer.jsx';
import AccommodationCarousel from '../components/landing/AccommodationCarousel.jsx';
import HowItWorks from '../components/landing/HowItWorks.jsx';
import Footer_Combination from '../components/common/Footer_Combination.jsx';

function LandingPage() {
  const welcomeSectionRef = useRef(null);
  const handleScrollToWelcome = () => {
    welcomeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      <Navbar />
      <MainSection onLetGoClick={handleScrollToWelcome} />
      <div ref={welcomeSectionRef}>
        <WelcomeSection />
      </div>
      <DestinationsSection />
      <MoreDestinationsSection />
      <div style={{ marginBottom: '90px' }} />
      <SriLankaExplorer />
      <AccommodationCarousel />
      <HowItWorks />
      <Footer_Combination />
    </div>
  );
}

export default LandingPage;