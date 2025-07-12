import React, { useRef } from 'react';
import ContactUsMainSection from '../../components/contactus/ContactUsMainSection.jsx';
import Navbar from '../../components/navbars/Navbar.jsx';
import ContactForm from '../../components/contactus/ContactForm.jsx'
import ContactUsWelcomeSection from '../../components/contactus/ContactUsWelcomeSection.jsx'
import ContactDetails from '../../components/contactus/ContactDetails.jsx'
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';

function ContactUsPage() {
 
  return (
    <div>
        <Navbar />
        <ContactUsMainSection />
        <ContactUsWelcomeSection />
        <ContactForm />
        <ContactUsWelcomeSection />
        <ContactDetails />
        <Footer_Combination />
    </div>
  );
}

export default ContactUsPage;