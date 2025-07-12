import React, { useRef } from 'react';
import AboutUsMainSection from '../../components/aboutUs/AboutUsMainSection.jsx';
import AboutUsWelcomeSection from '../../components/aboutUs/AboutUsWelcomeSection.jsx';
import OurCommitmentComponent from '../../components/aboutUs/OurCommitmentComponent.jsx'
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';

function AboutUsPage() {
 
  return (
    <div>
        <Navbar />
        <AboutUsMainSection />
        <AboutUsWelcomeSection />
        <OurCommitmentComponent />
        <Footer_Combination />
    </div>
  );
}

export default AboutUsPage;