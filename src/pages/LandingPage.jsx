import React, { useRef } from 'react';
import MainSection from '../components/MainSection';
import WelcomeSection from '../components/WelcomeSection';
import DestinationSection from '../components/DestinationsSection';
import Navbar from '../components/Navbar';


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
      </div>
    </div>
  );
}

export default LandingPage;