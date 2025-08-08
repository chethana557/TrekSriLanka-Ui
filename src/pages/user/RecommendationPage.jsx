import React from 'react';
import RecommendationSystem from '../../components/recommendation/RecommendationSystem.jsx';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';

function RecommendationPage() {
  return (
    <div>
      <Navbar />
      <RecommendationSystem />
      <Footer_Combination />
    </div>
  );
}

export default RecommendationPage; 