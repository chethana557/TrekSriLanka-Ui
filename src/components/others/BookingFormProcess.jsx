import React, { useRef } from 'react';
import Navbar from '../common/Navbar.jsx';
import Footer_Combination from '../common/Footer_Combination.jsx';
import BookingForm from '../BookingForm.jsx';

function BookingFormProcess() {

  return (
    <div className="booking-form-page">
        <Navbar />
        <BookingForm />
        <Footer_Combination />
    </div>
  );
}

export default BookingFormProcess;