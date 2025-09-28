import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';
import { Calendar, Users, Baby, Home, DollarSign } from 'lucide-react';
import { BASE_URL } from '../../api';

function HotelBookingReview(){
  const { hotelId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData || (()=>{ try { return JSON.parse(sessionStorage.getItem('hotelBookingData')||'{}'); }catch{return {};}})();
  const [hotel,setHotel] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);

  useEffect(()=>{ let active=true; (async()=>{ try { const res= await fetch(`${BASE_URL}/hotels/${hotelId}`); if(!res.ok) throw new Error('Hotel not found'); const data= await res.json(); if(active) setHotel(data.hotel); }catch(e){ if(active) setError(e.message);} finally{ if(active) setLoading(false);} })(); return ()=>{active=false}; },[hotelId]);

  const selectedRoom = hotel?.room_types?.find(r=> r.room_name===bookingData.roomType);
  const nights = (()=>{ if(!bookingData.checkIn || !bookingData.checkOut) return 0; try { const a=new Date(bookingData.checkIn); const b=new Date(bookingData.checkOut); return Math.max(1, Math.round((b-a)/(1000*60*60*24))); }catch{return 0;} })();
  const baseNightPrice = selectedRoom?.price_per_night || 0;
  const subtotal = baseNightPrice * nights;
  const tax = Math.round(subtotal * 0.12 * 100)/100;
  const total = subtotal + tax;

  const proceed=()=> navigate(`/hotels/${hotelId}/booking/payment`, { state:{ hotelId, bookingData: { ...bookingData, totalAmount: total, nights } } });

  return (
    <>
      <Navbar />
      <div style={{minHeight:'100vh',padding:'3rem 1rem',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <h1 style={{fontSize:'2.2rem',fontWeight:'bold',color:'#00A79D',marginBottom:'1.5rem'}}>Review Reservation</h1>
        <div style={{display:'flex',alignItems:'center',gap:'2rem',marginBottom:'2rem'}}>
          {['Details','Review','Payment'].map((lbl,i)=>{ const step=i+1; const active= step<=2; const current= step===2; return <React.Fragment key={lbl}><div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6}}><div style={{width:40,height:40,borderRadius:'50%',background: current?'#00A79D':(active?'#00A79D':'#e0e0e0'),color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold'}}>{step}</div><span style={{fontSize:14,color: current || active?'#00A79D':'#999'}}>{lbl}</span></div>{step<3 && <div style={{width:60,height:2,background: step<2?'#00A79D':'#e0e0e0'}} />}</React.Fragment>; })}
        </div>
        {loading && <div>Loading...</div>}
        {error && <div style={{color:'red'}}>Error: {error}</div>}
        {!loading && !error && hotel && (
          <div style={{maxWidth:800,width:'100%',background:'#fff',borderRadius:24,boxShadow:'0 16px 32px rgba(0,0,0,0.08)',padding:'2rem',display:'flex',flexDirection:'column',gap:'1rem'}}>
            <h2 style={{margin:'0 0 1rem 0'}}>{hotel.hotel_name}</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'1rem'}}>
              <Info label='Room Type' value={bookingData.roomType} />
              <Info label='Check In' value={bookingData.checkIn} />
              <Info label='Check Out' value={bookingData.checkOut} />
              <Info label='Nights' value={nights} />
              <Info label='Adults' value={bookingData.adults} />
              <Info label='Children' value={bookingData.children} />
            </div>
            <div style={{marginTop:'1.5rem',background:'#f8f9fa',border:'2px solid #e5e7eb',borderRadius:12,padding:'1rem',position:'relative'}}>
              <DollarSign style={{position:'absolute',left:12,top:16,color:'#00A79D'}} />
              <div style={{paddingLeft:32,display:'flex',flexDirection:'column',gap:8}}>
                <div style={{display:'flex',justifyContent:'space-between'}}><span>Room ({nights} x {baseNightPrice.toFixed(2)})</span><span>{subtotal.toFixed(2)}</span></div>
                <div style={{display:'flex',justifyContent:'space-between'}}><span>Tax (12%)</span><span>{tax.toFixed(2)}</span></div>
                <div style={{marginTop:8,borderTop:'2px solid #00A79D',paddingTop:8,display:'flex',justifyContent:'space-between',fontWeight:'bold'}}><span>Total</span><span>{total.toFixed(2)}</span></div>
              </div>
            </div>
            <div style={{display:'flex',gap:'1rem',marginTop:'1rem'}}>
              <button type='button' onClick={()=> navigate(`/hotels/${hotelId}/booking`, { state:{ hotelId, bookingData } })} style={{flex:1,padding:'12px 24px',border:'2px solid #ccc',borderRadius:12,background:'transparent',cursor:'pointer'}}>Previous</button>
              <button type='button' onClick={proceed} style={{flex:1,padding:'12px 24px',border:'none',borderRadius:12,background:'#00A79D',color:'#fff',fontWeight:'bold',cursor:'pointer'}}>Confirm & Pay</button>
            </div>
          </div>
        )}
      </div>
      <Footer_Combination />
    </>
  );
}

function Info({label,value}){ return <div style={{background:'#f8f9fa',border:'2px solid #e5e7eb',borderRadius:12,padding:'10px 12px'}}><div style={{fontSize:12,color:'#666',marginBottom:4}}>{label}</div><div style={{fontWeight:500}}>{value}</div></div>; }

export default HotelBookingReview;
