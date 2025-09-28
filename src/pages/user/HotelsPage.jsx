import React from 'react';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';
import HotelCreateForm from '../../components/user/HotelCreateForm.jsx';

export default function HotelsPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ 
        flexGrow: 1,
        backgroundColor: '#f8f9fa',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}>
        <HotelCreateForm />
      </main>
      <Footer_Combination />
    </div>
  );
}
