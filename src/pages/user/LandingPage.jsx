import React, { useRef } from 'react';
import MainSection from '../../components/landingPage/MainSection.jsx';
import WelcomeSection from '../../components/landingPage/WelcomeSection.jsx';
import DestinationsSection from '../../components/landingPage/DestinationsSection.jsx';
import Navbar from '../../components/navbars/Navbar.jsx';
import MoreDestinationsSection from '../../components/landingPage/MoreDestinationsSection.jsx';
import SriLankaExplorer from '../../components/landingPage/SriLankaExplorer.jsx';
import AccommodationCarousel from '../../components/landingPage/AccommodationCarousel.jsx';
import HowItWorks from '../../components/landingPage/HowItWorks.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';

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