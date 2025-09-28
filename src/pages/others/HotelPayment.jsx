import React, { useState, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';
import { CreditCard, Calendar, Lock, MapPin, Building, Mail, DollarSign } from 'lucide-react';
import { BASE_URL } from '../../api';

function HotelPayment(){
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state?.bookingData || (()=>{ try { return JSON.parse(sessionStorage.getItem('hotelBookingData')||'{}'); }catch{return {};}})();
  const [formData,setFormData] = useState({ cardName:'', cardNumber:'', expiry:'', cvc:'', billingAddress:'', city:'', postalCode:'', agree:false });
  const [submitting,setSubmitting] = useState(false);
  const normalize = v=> v.replace(/[^0-9]/g,'');
  const formatCard = v=> normalize(v).slice(0,19).replace(/(.{4})/g,'$1 ').trim();
  const formatExp = v=> { const d= v.replace(/[^0-9]/g,'').slice(0,4); return d.length<=2?d:d.slice(0,2)+'/'+d.slice(2); };
  const handleChange=f=>e=>{ let val=e.target.type==='checkbox'?e.target.checked:e.target.value; if(f==='cardNumber') val=formatCard(val); if(f==='expiry') val=formatExp(val); if(f==='cvc') val=normalize(val).slice(0,4); setFormData(fd=>({...fd,[f]:val})); };
  const luhn= num=>{ let s=0,a=false; for(let i=num.length-1;i>=0;i--){ let n=+num[i]; if(a){ n*=2; if(n>9)n-=9;} s+=n; a=!a;} return s%10===0; };
  const validation = useMemo(()=>{ const errs={}; const digits= normalize(formData.cardNumber); if(!formData.cardName.trim()) errs.cardName='Required'; if(digits.length<13||digits.length>19||!luhn(digits)) errs.cardNumber='Invalid'; if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) errs.expiry='Invalid'; if(!/^[0-9]{3,4}$/.test(formData.cvc)) errs.cvc='Invalid'; if(!formData.billingAddress) errs.billingAddress='Required'; if(!formData.city) errs.city='Required'; if(!formData.postalCode) errs.postalCode='Required'; if(!formData.agree) errs.agree='Required'; return {errs, valid:Object.keys(errs).length===0}; },[formData]);

  const submit = async()=>{ if(!validation.valid) return; setSubmitting(true); try{ const payload={ hotel_id: hotelId, room_type_name: bookingData.roomType, check_in: bookingData.checkIn, check_out: bookingData.checkOut, adults: Number(bookingData.adults)||1, children: Number(bookingData.children)||0, total_amount: bookingData.totalAmount||0, billing_address: formData.billingAddress, city: formData.city, postal_code: formData.postalCode }; const token = localStorage.getItem('access_token'); const res = await fetch(`${BASE_URL}/hotel-bookings/`, { method:'POST', headers:{'Content-Type':'application/json', ...(token?{Authorization:`Bearer ${token}`}:{})}, body: JSON.stringify(payload) }); let bookingResp=null; if(res.status===201){ bookingResp= await res.json(); }
  if(bookingResp && !bookingResp.payment_status){ bookingResp.payment_status='success'; }
  navigate(`/hotels/${hotelId}/booking/confirmation`, { state:{ hotelId, bookingData:{...bookingData}, payment: formData, booking: bookingResp } }); } catch(e){} finally{ setSubmitting(false); try{ sessionStorage.removeItem('hotelBookingData'); }catch{} try{ sessionStorage.removeItem('hotelBookingExpiry'); }catch{} }
  };

  const totalDisplay = (bookingData.totalAmount||0).toFixed(2);

  return (
    <>
      <Navbar />
      <div style={{minHeight:'100vh',padding:'3rem 1rem',display:'flex',flexDirection:'column',alignItems:'center'}}>
        <h1 style={{fontSize:'2.2rem',fontWeight:'bold',color:'#00A79D',marginBottom:'1.5rem'}}>Payment</h1>
        <div style={{display:'flex',alignItems:'center',gap:'2rem',marginBottom:'2rem'}}>
          {['Details','Review','Payment'].map((lbl,i)=>{ const step=i+1; const active= step<=3; const current= step===3; return <React.Fragment key={lbl}><div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6}}><div style={{width:40,height:40,borderRadius:'50%',background: current?'#00A79D':'#00A79D',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold'}}>{step}</div><span style={{fontSize:14,color:'#00A79D'}}>{lbl}</span></div>{step<3 && <div style={{width:60,height:2,background:'#00A79D'}} />}</React.Fragment>; })}
        </div>
        <div style={{maxWidth:800,width:'100%',background:'#fff',borderRadius:24,boxShadow:'0 16px 32px rgba(0,0,0,0.08)',padding:'2rem'}}>
          <div style={{marginBottom:'1rem',background:'#f8f9fa',border:'2px solid #e5e7eb',borderRadius:12,padding:'1rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{display:'flex',alignItems:'center',gap:8}}><DollarSign size={18} style={{color:'#00A79D'}} /> Total</span>
            <strong style={{color:'#00A79D',fontSize:'1.25rem'}}>{totalDisplay}</strong>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
            <Input label='Cardholder Name' required value={formData.cardName} onChange={handleChange('cardName')} icon={<CreditCard />} error={validation.errs.cardName} />
            <Input label='Card Number' required value={formData.cardNumber} onChange={handleChange('cardNumber')} icon={<CreditCard />} error={validation.errs.cardNumber} placeholder='1234 5678 9012 3456' />
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
              <Input label='Expiry' required value={formData.expiry} onChange={handleChange('expiry')} icon={<Calendar />} error={validation.errs.expiry} placeholder='MM/YY' />
              <Input label='CVC' required value={formData.cvc} onChange={handleChange('cvc')} icon={<Lock />} error={validation.errs.cvc} placeholder='123' />
            </div>
            <hr style={{border:'none',borderTop:'2px solid #e5e7eb',margin:'1rem 0'}} />
            <Input label='Billing Address' required value={formData.billingAddress} onChange={handleChange('billingAddress')} icon={<MapPin />} error={validation.errs.billingAddress} />
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem'}}>
              <Input label='City' required value={formData.city} onChange={handleChange('city')} icon={<Building />} error={validation.errs.city} />
              <Input label='Postal Code' required value={formData.postalCode} onChange={handleChange('postalCode')} icon={<Mail />} error={validation.errs.postalCode} />
            </div>
            <div style={{background:'#fff3cd',padding:'0.75rem 1rem',borderRadius:12,border:'1px solid #ffeaa7'}}>
              <label style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:12,color:'#856404'}}>
                <input type='checkbox' checked={formData.agree} onChange={handleChange('agree')} style={{marginTop:2}} />
                <span>I agree to the terms, privacy and cancellation policy.</span>
              </label>
              {validation.errs.agree && <div style={{color:'#d93025',fontSize:12,marginTop:4}}>Required</div>}
            </div>
            <div style={{display:'flex',gap:'1rem',marginTop:'1rem'}}>
              <button type='button' onClick={()=> navigate(`/hotels/${hotelId}/booking/review`, { state:{ hotelId, bookingData } })} style={{flex:1,padding:'12px 24px',border:'2px solid #ccc',borderRadius:12,background:'transparent',cursor:'pointer'}}>Previous</button>
              <button type='button' disabled={!validation.valid || submitting} onClick={submit} style={{flex:1,padding:'12px 24px',border:'none',borderRadius:12,background: validation.valid? '#00A79D':'#9ccfcb',color:'#fff',fontWeight:'bold',cursor: validation.valid? 'pointer':'not-allowed'}}>{submitting? 'Processing...':'Confirm'}</button>
            </div>
          </div>
        </div>
      </div>
      <Footer_Combination />
    </>
  );
}

function Input({label,required,value,onChange,icon,error,placeholder}){
  return (
    <div>
      <label style={{display:'block',fontWeight:500,marginBottom:6,fontSize:14}}>{label}{required && <span style={{color:'#d93025'}}>*</span>}</label>
      <div style={{position:'relative'}}>
        {icon && React.cloneElement(icon,{style:{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#00A79D',width:20,height:20}})}
        <input value={value} onChange={onChange} placeholder={placeholder} style={{width:'100%',padding:'12px 14px 12px 44px',border:'2px solid #e5e7eb',borderRadius:12,background:'#f8f9fa'}} />
      </div>
      {error && <div style={{color:'#d93025',fontSize:12,marginTop:4}}>{error}</div>}
    </div>
  );
}

export default HotelPayment;
