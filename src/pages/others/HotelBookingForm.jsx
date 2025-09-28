import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';
import { Calendar, Users, Baby, Home, AlertCircle } from 'lucide-react';
import { BASE_URL } from '../../api';

const expiryKeyHotel = 'hotelBookingExpiry';

function HotelBookingForm(){
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const incoming = location.state?.bookingData || null;
  const persisted = (()=>{ try { const d= JSON.parse(sessionStorage.getItem('hotelBookingData')||'null'); const exp=Number(sessionStorage.getItem(expiryKeyHotel)); if(exp && exp <= Date.now()) return null; return d; } catch { return null;} })();
  const [hotel,setHotel] = useState(null);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState(null);
  const [formData,setFormData] = useState({
    checkIn: incoming?.checkIn || persisted?.checkIn || '',
    checkOut: incoming?.checkOut || persisted?.checkOut || '',
    adults: incoming?.adults || persisted?.adults || '',
    children: incoming?.children || persisted?.children || '0',
    roomType: incoming?.roomType || persisted?.roomType || ''
  });
  const [timeLeft,setTimeLeft] = useState(300);
  const [expired,setExpired] = useState(false);
  const [availability,setAvailability] = useState(null);
  const [checking,setChecking] = useState(false);
  const [availError,setAvailError] = useState(null);

  useEffect(()=>{ let active=true; (async()=>{ try { const res = await fetch(`${BASE_URL}/hotels/${hotelId}`); if(!res.ok) throw new Error('Hotel not found'); const data = await res.json(); if(active) setHotel(data.hotel); }catch(e){ if(active) setError(e.message);} finally{ if(active) setLoading(false);} })(); return ()=>{active=false}; },[hotelId]);

  const reset= useCallback(()=>{ setFormData({checkIn:'',checkOut:'',adults:'',children:'0',roomType:''}); try{ sessionStorage.removeItem('hotelBookingData'); }catch{} },[]);
  useEffect(()=>{ let expiry = Number(sessionStorage.getItem(expiryKeyHotel)); const now=Date.now(); if(!expiry || isNaN(expiry) || expiry<=now){ expiry = now + 5*60*1000; try{ sessionStorage.setItem(expiryKeyHotel,String(expiry)); }catch{} } const tick=()=>{ const remain= expiry - Date.now(); if(remain<=0){ setTimeLeft(0); setExpired(true); reset(); try{ sessionStorage.removeItem(expiryKeyHotel);}catch{} return;} setTimeLeft(Math.floor(remain/1000)); }; tick(); const id=setInterval(tick,1000); return ()=>clearInterval(id); },[reset]);

  useEffect(()=>{ try{ sessionStorage.setItem('hotelBookingData', JSON.stringify(formData)); }catch{} },[formData]);

  // Availability check when checkIn, checkOut or roomType changes
  useEffect(()=>{
    const { checkIn, checkOut, roomType } = formData;
    if(!checkIn || !roomType) { setAvailability(null); return; }
    if(!hotelId) return;
    let active = true;
    (async()=>{
      try{
        setChecking(true); setAvailError(null);
        const params = new URLSearchParams({ hotel_id: hotelId, room_type_name: roomType, check_in: checkIn });
        if(checkOut) params.append('check_out', checkOut);
        const res = await fetch(`${BASE_URL}/hotel-bookings/availability?${params.toString()}`);
        if(!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        if(active) setAvailability(data);
      }catch(e){ if(active){ setAvailError(e.message); setAvailability(null);} }
      finally{ if(active) setChecking(false); }
    })();
    return ()=>{ active=false; };
  },[formData.checkIn, formData.checkOut, formData.roomType, hotelId]);

  const handleChange=(f)=>(e)=> setFormData(fd=>({...fd,[f]: e.target.value}));

  const isComplete = formData.checkIn && formData.checkOut && formData.roomType && formData.adults!=='';

  const handleSubmit=(e)=>{ e.preventDefault(); if(!isComplete || expired) return; navigate(`/hotels/${hotelId}/booking/review`, { state:{ hotelId, bookingData: formData } }); };

  const formatTime = (s)=> `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  return (
    <>
      <Navbar />
      <div style={{minHeight:'100vh',padding:'3rem 1rem',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <h1 style={{fontSize:'2.2rem',fontWeight:'bold',color:'#00A79D',marginBottom:'1.5rem'}}>Reserve Accommodation</h1>
        <div style={{marginBottom:'1rem'}}>{expired? <span style={{color:'#b00020'}}>Session expired.</span>: <span style={{background:'#E6FAF9',padding:'6px 14px',borderRadius:20,color:'#007f78',fontSize:14}}>Time left: {formatTime(timeLeft)}</span>}</div>
        {/* Stepper */}
        <div style={{display:'flex',alignItems:'center',gap:'2rem',marginBottom:'2rem'}}>
          {['Details','Review','Payment'].map((lbl,i)=>{ const step=i+1; const active= step===1; return <React.Fragment key={lbl}><div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6}}><div style={{width:40,height:40,borderRadius:'50%',background: active?'#00A79D':'#e0e0e0',color: active?'#fff':'#999',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold'}}>{step}</div><span style={{fontSize:14,color:active?'#00A79D':'#999'}}>{lbl}</span></div>{step<3 && <div style={{width:60,height:2,background:'#e0e0e0'}} />}</React.Fragment>; })}
        </div>
        {loading && <div>Loading hotel...</div>}
        {error && <div style={{color:'red'}}>Error: {error}</div>}
        {!loading && !error && hotel && (
          <div style={{maxWidth:800,width:'100%',background:'#fff',borderRadius:24,boxShadow:'0 16px 32px rgba(0,0,0,0.08)',padding:'2rem'}}>
            <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1.2rem'}}>
              <div>
                <label style={{display:'block',fontWeight:500,marginBottom:6}}>Room Type<span style={{color:'#d93025'}}>*</span></label>
                <select value={formData.roomType} onChange={handleChange('roomType')} style={{width:'100%',padding:'12px 14px',border:'2px solid #e5e7eb',borderRadius:12,background:'#f8f9fa'}}>
                  <option value="">Select room</option>
                  {hotel.room_types?.map(rt=> <option key={rt.room_name} value={rt.room_name}>{rt.room_name} (max {rt.guest_count} guests)</option>)}
                </select>
                {checking && <div style={{marginTop:6,fontSize:12,color:'#666'}}>Checking availability...</div>}
                {availability && (
                  <div style={{marginTop:8,display:'flex',alignItems:'center',gap:8,fontSize:12,padding:'6px 10px',borderRadius:8,background: availability.remaining>0? '#E6FAF9':'#fff6f6',border: `1px solid ${availability.remaining>0?'#b6e9e4':'#f5c2c7'}`,color: availability.remaining>0?'#006b64':'#b02a37'}}>
                    <AlertCircle size={14} />
                    {availability.remaining>0? `${availability.remaining} room${availability.remaining!==1?'s':''} available for selected dates` : 'No rooms available for selected dates'}
                  </div>) }
                {availError && <div style={{marginTop:6,fontSize:12,color:'#b02a37'}}>Availability error: {availError}</div>}
              </div>
              <div>
                <label style={{display:'block',fontWeight:500,marginBottom:6}}>Check In<span style={{color:'#d93025'}}>*</span></label>
                <div style={{position:'relative'}}>
                  <Calendar style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#00A79D'}} />
                  <input type='date' value={formData.checkIn} onChange={handleChange('checkIn')} style={{width:'100%',padding:'12px 14px 12px 44px',border:'2px solid #e5e7eb',borderRadius:12,background:'#f8f9fa'}} />
                </div>
              </div>
              <div>
                <label style={{display:'block',fontWeight:500,marginBottom:6}}>Check Out<span style={{color:'#d93025'}}>*</span></label>
                <div style={{position:'relative'}}>
                  <Calendar style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#00A79D'}} />
                  <input type='date' value={formData.checkOut} onChange={handleChange('checkOut')} style={{width:'100%',padding:'12px 14px 12px 44px',border:'2px solid #e5e7eb',borderRadius:12,background:'#f8f9fa'}} />
                </div>
              </div>
              <div>
                <label style={{display:'block',fontWeight:500,marginBottom:6}}>Adults<span style={{color:'#d93025'}}>*</span></label>
                <div style={{position:'relative'}}>
                  <Users style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#00A79D'}} />
                  <input type='number' min='1' value={formData.adults} onChange={handleChange('adults')} style={{width:'100%',padding:'12px 14px 12px 44px',border:'2px solid #e5e7eb',borderRadius:12,background:'#f8f9fa'}} />
                </div>
              </div>
              <div>
                <label style={{display:'block',fontWeight:500,marginBottom:6}}>Children</label>
                <div style={{position:'relative'}}>
                  <Baby style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#00A79D'}} />
                  <input type='number' min='0' value={formData.children} onChange={handleChange('children')} style={{width:'100%',padding:'12px 14px 12px 44px',border:'2px solid #e5e7eb',borderRadius:12,background:'#f8f9fa'}} />
                </div>
              </div>
              <div style={{display:'flex',gap:'1rem',marginTop:'1rem'}}>
                <button type='button' onClick={()=> navigate(-1)} style={{flex:1,padding:'12px 24px',border:'2px solid #ccc',borderRadius:12,background:'transparent',cursor:'pointer'}}>Back</button>
                <button type='submit' disabled={!isComplete || expired} style={{flex:1,padding:'12px 24px',border:'none',borderRadius:12,background:(!expired && isComplete)? '#00A79D':'#9ccfcb',color:'#fff',fontWeight:'bold',cursor:(!expired && isComplete)?'pointer':'not-allowed'}}>Next</button>
              </div>
            </form>
          </div>
        )}
      </div>
      <Footer_Combination />
    </>
  );
}

export default HotelBookingForm;
