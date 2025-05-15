import React, { useRef } from 'react';
import MainSection from '../components/MainSection';
import WelcomeSection from '../components/WelcomeSection';
import DestinationSection from '../components/DestinationsSection';
import Navbar from '../components/Navbar';
import Footer_Combination from '../components/Footer_Combination';
import MoreDestinationsSection from '../components/MoreDestinationsSection';
import SriLankaExplorer from '../components/SriLankaExplorer';
import AccommodationOptions from '../components/AccommodationCarousel';
import HowItWorks from '../components/HowItWorks';


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
        <DestinationSection />
        <MoreDestinationsSection/>
        <div style={{ marginBottom: '90px' }} />
        <SriLankaExplorer/>
        <AccommodationOptions/>
        <HowItWorks/>
        <Footer_Combination/>
        
      </div>
    </div>
  );
}

export default LandingPage;