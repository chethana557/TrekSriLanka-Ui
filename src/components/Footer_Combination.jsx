import React from 'react';
import Footer from './Footer';

const Footer_Combination = () => {
  return (
    <div style={{ position: 'relative' }}>
      <img 
        src="src/assets/footer_img.png" 
        alt="Wave Overlap" 
        style={{
          position: 'absolute',
          top: '-100px', 
          left: 0,
          width: '100%',
          height: 'auto',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, paddingTop: '120px' }}>
        <Footer />
      </div>
    </div>
  );
};

export default Footer_Combination;
