import React from 'react';
import RecommendationSystem from '../../components/recommendation/RecommendationSystem.jsx';
import RecommendationWelcome from '../../components/recommendation/RecommendationWelcome.jsx';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';
import RecommendationMainSection from '../../components/recommendation/RecommendationMainSection.jsx';

function RecommendationPage() {
  return (
    <div>
      <Navbar />
      <RecommendationMainSection />
      <RecommendationWelcome />
      <RecommendationSystem />
      <Footer_Combination />
    </div>
  );
}

export default RecommendationPage; 