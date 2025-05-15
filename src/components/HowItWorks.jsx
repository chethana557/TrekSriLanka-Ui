import React from 'react';
import { MousePointer, FileText, User } from 'lucide-react';

const HowItWorks = () => {
  const containerStyle = {
    width: '100%',
    padding: '60px 20px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const headingStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#00A79D',
    marginBottom: '50px',
    textAlign: 'center'
  };

  const stepsContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    gap: '20px',
    marginBottom: '60px'
  };

  const stepCardStyle = {
    width: '320px',
    padding: '40px 30px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  };

  const iconContainerStyle = {
    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '30px'
  };

  const stepTitleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '12px'
  };

  const stepDescriptionStyle = {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.5'
  };

  const guaranteeContainerStyle = {
    width: '100%',
    maxWidth: '1200px',
    textAlign: 'center',
    marginBottom: '40px'
  };

  const guaranteeTitleStyle = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#00A79D',
    marginBottom: '20px'
  };

  const guaranteeDescriptionStyle = {
    fontSize: '18px',
    color: '#333',
    lineHeight: '1.6',
    maxWidth: '900px',
    margin: '0 auto',
    marginBottom: '40px'
  };

  const whyChooseContainerStyle = {
    width: '100%',
    maxWidth: '1200px'
  };

  const whyChooseTitleStyle = {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '40px'
  };

  const benefitsContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px'
  };

  const benefitItemStyle = {
    flex: '1 1 220px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  };

  const benefitIconContainerStyle = {
    width: '80px',
    height: '80px',
    marginBottom: '20px'
  };

  const benefitTitleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px'
  };

  const benefitDescriptionStyle = {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.4'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>How it works</h2>
      
      <div style={stepsContainerStyle}>
        <div style={stepCardStyle}>
          <div style={iconContainerStyle}>
            <MousePointer size={60} strokeWidth={1.5} />
          </div>
          <h3 style={stepTitleStyle}>Select your Tour</h3>
          <p style={stepDescriptionStyle}>
            Select your favourite tour among our packages
          </p>
        </div>
        
        <div style={stepCardStyle}>
          <div style={iconContainerStyle}>
            <FileText size={60} strokeWidth={1.5} />
          </div>
          <h3 style={stepTitleStyle}>Get a Quotation</h3>
          <p style={stepDescriptionStyle}>
            Contact us & get a cost effective quotation
          </p>
        </div>
        
        <div style={stepCardStyle}>
          <div style={iconContainerStyle}>
            <User size={60} strokeWidth={1.5} />
          </div>
          <h3 style={stepTitleStyle}>Book & Enjoy</h3>
          <p style={stepDescriptionStyle}>
            Get ready & enjoy your life freely
          </p>
        </div>
      </div>
      
      <div style={guaranteeContainerStyle}>
        <h2 style={guaranteeTitleStyle}>Safety, value and expertise is our guarantee</h2>
        <p style={guaranteeDescriptionStyle}>
          At TrekSriLanka, we bring you the best of Sri Lanka with safety, value, and expert guidance. 
          Explore ancient temples, pristine beaches, and lush mountains like a true insider. 
          With interactive guides, expert tips, and real-time support, planning your adventure is effortless. 
          Start exploring today—every click leads to a new discovery!
        </p>
      </div>
      
      <div style={whyChooseContainerStyle}>
        <h3 style={whyChooseTitleStyle}>Why choose TrekSriLanka?</h3>
        
        <div style={benefitsContainerStyle}>
          <div style={benefitItemStyle}>
            <div style={benefitIconContainerStyle}>
              <img src="src/assets/4/41.png" alt="Sri Lanka Experts" width="60" height="100" />
            </div>
            <h4 style={benefitTitleStyle}>Sri Lanka Experts</h4>
            <p style={benefitDescriptionStyle}>
              We are passionate about Sri Lanka and know every hidden gem across the island.
            </p>
          </div>
          
          <div style={benefitItemStyle}>
            <div style={benefitIconContainerStyle}>
              <img src="src/assets/4/42.png" alt="Sri Lanka Experts" width="100" height="80" />
            </div>
            <h4 style={benefitTitleStyle}>Years of Expertise</h4>
            <p style={benefitDescriptionStyle}>
              With extensive experience, our trusted insights and fair booking policies guarantee a seamless travel experience.
            </p>
          </div>
          
          <div style={benefitItemStyle}>
            <div style={benefitIconContainerStyle}>
              <img src="src/assets/4/43.png" alt="Sri Lanka Experts" width="100" height="100" />
            </div>
            <h4 style={benefitTitleStyle}>Best Price Guarantee</h4>
            <p style={benefitDescriptionStyle}>
              Enjoy competitive pricing with the best value for your perfect trip.
            </p>
          </div>
          
          <div style={benefitItemStyle}>
            <div style={benefitIconContainerStyle}>
              <img src="src/assets/4/44.png" alt="Sri Lanka Experts" width="100" height="100" />
            </div>
            <h4 style={benefitTitleStyle}>24/7 Support</h4>
            <p style={benefitDescriptionStyle}>
              Need help during your journey? We're here for you anytime, anywhere!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;