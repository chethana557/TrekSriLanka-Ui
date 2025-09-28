import React, { useRef, useEffect, useState } from 'react';
import MainSection from '../../components/landingPage/MainSection.jsx';
import WelcomeSection from '../../components/landingPage/WelcomeSection.jsx';
import DestinationsSection from '../../components/landingPage/DestinationsSection.jsx';
import Navbar from '../../components/navbars/Navbar.jsx';
import MoreDestinationsSection from '../../components/landingPage/MoreDestinationsSection.jsx';
import SriLankaExplorer from '../../components/landingPage/SriLankaExplorer.jsx';
import AccommodationCarousel from '../../components/landingPage/AccommodationCarousel.jsx';
import HowItWorks from '../../components/landingPage/HowItWorks.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';
import ChatbotWidget from '../../components/chatBot/ChatbotWidget.jsx';
import { BASE_URL } from '../../api';

function LandingPage() {
  const welcomeSectionRef = useRef(null);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const handleScrollToWelcome = () => {
    welcomeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoadingCities(true);
        const base = BASE_URL || (import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1` : 'http://localhost:8000/api/v1');
        const res = await fetch(`${base}/main-cities/`);
        if (!res.ok) throw new Error('Failed to fetch main cities');
        const data = await res.json();
        setCities(Array.isArray(data) ? data : []);
      } catch (_) {
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };
    fetchCities();
  }, []);

  return (
    <div className="landing-page">
      <Navbar />
      <MainSection onLetGoClick={handleScrollToWelcome} />
      <div ref={welcomeSectionRef}>
        <WelcomeSection />
      </div>
      <DestinationsSection cities={cities} />
      <MoreDestinationsSection cities={cities} />
      <div style={{ marginBottom: '90px' }} />
      <SriLankaExplorer />
      <AccommodationCarousel />
      <HowItWorks />
      <Footer_Combination />
      <ChatbotWidget />
    </div>
  );
}

export default LandingPage;