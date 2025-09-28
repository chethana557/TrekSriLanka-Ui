import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';
import { CheckCircle, Home, Calendar, Users, Baby, Bed } from 'lucide-react';

function HotelBookingConfirmation(){
  const { hotelId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData || {};
  const booking = location.state?.booking || null;
  const ref = booking?.booking_id || `HB${Date.now().toString().slice(-8)}`;

  return (
    <>
      <Navbar />
      <div style={{minHeight:'100vh',padding:'3rem 1rem',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <h1 style={{fontSize:'2.3rem',fontWeight:'bold',color:'#00A79D',marginBottom:'1.5rem'}}>Reservation Confirmed</h1>
        <div style={{maxWidth:800,width:'100%',background:'#fff',borderRadius:24,boxShadow:'0 16px 32px rgba(0,0,0,0.08)',padding:'2rem'}}>
          <div style={{textAlign:'center',marginBottom:'2rem'}}>
            <CheckCircle size={80} style={{color:'#00A79D',marginBottom:'1rem'}} />
            <h2 style={{margin:'0 0 0.5rem 0'}}>Your stay is booked!</h2>
            <p style={{margin:0,color:'#555'}}>We emailed the reservation details. Keep the reference below.</p>
          </div>
          <div style={{marginBottom:'1.5rem'}}>
            <label style={{display:'block',fontWeight:500,marginBottom:6}}>Booking Reference</label>
            <div style={{background:'#f8f9fa',border:'2px solid #00A79D',borderRadius:12,padding:'12px 16px',textAlign:'center',fontWeight:'bold',color:'#00A79D'}}>{ref}</div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'1rem',marginBottom:'1.5rem'}}>
            <Info icon={<Bed />} label='Room' value={bookingData.roomType} />
            <Info icon={<Calendar />} label='Check In' value={bookingData.checkIn} />
            <Info icon={<Calendar />} label='Check Out' value={bookingData.checkOut} />
            <Info icon={<Users />} label='Adults' value={bookingData.adults} />
            <Info icon={<Baby />} label='Children' value={bookingData.children} />
          </div>
          <div style={{background:'#fff3cd',border:'1px solid #ffeaa7',padding:'1rem',borderRadius:12,fontSize:12,color:'#856404',marginBottom:'1.5rem'}}>
            Our team may reach out prior to arrival. Bring a valid ID matching the booking name at check‑in.
          </div>
          <div style={{display:'flex',gap:'1rem'}}>
            <button style={{flex:1,padding:'12px 24px',border:'2px solid #ccc',borderRadius:12,background:'transparent',cursor:'pointer'}} onClick={()=> navigate(`/hotels/${hotelId}`)}>View Hotel</button>
            <button style={{flex:1,padding:'12px 24px',border:'none',borderRadius:12,background:'#00A79D',color:'#fff',fontWeight:'bold',cursor:'pointer'}} onClick={()=> navigate('/')}>Home <Home size={16} style={{marginLeft:6}} /></button>
          </div>
        </div>
      </div>
      <Footer_Combination />
    </>
  );
}

function Info({icon,label,value}){ return <div style={{background:'#f8f9fa',border:'2px solid #e5e7eb',borderRadius:12,padding:'10px 12px',display:'flex',flexDirection:'column',gap:4}}>{icon && React.cloneElement(icon,{size:20,style:{color:'#00A79D'}})}<span style={{fontSize:12,color:'#666'}}>{label}</span><span style={{fontWeight:500}}>{value}</span></div>; }

export default HotelBookingConfirmation;
