import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';
import { 
  CreditCard,
  Calendar,
  Lock,
  MapPin,
  Building,
  Mail
} from 'lucide-react';

function PaymentInformation() {
  const navigate = useNavigate();
  const location = useLocation();
  const packageId = location.state?.packageId || (()=>{ try { return (JSON.parse(sessionStorage.getItem('bookingFormData')||'{}')).packageId || null; } catch { return null; } })();
  const bookingData = location.state?.bookingData || (()=>{ try { return JSON.parse(sessionStorage.getItem('bookingFormData')||'{}'); } catch { return {}; } })();
  const [formData, setFormData] = useState({
  cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    agreeToTerms: false
  });
  const [touched, setTouched] = useState({});
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  // Timer state for 5-minute window
  const [timeLeft, setTimeLeft] = useState(300);
  const [expired, setExpired] = useState(false);
  // Shared with BookingFormPage so user has a single 5-minute window for the whole booking flow
  const expiryKey = 'bookingFlowExpiry';

  const resetPaymentForm = useCallback(()=>{
    setFormData({
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      billingAddress: '',
      city: '',
      postalCode: '',
      agreeToTerms: false
    });
    setTouched({});
    setAttemptedSubmit(false);
  }, []);

  // Initialize / manage countdown (independent from booking page)
  useEffect(()=>{
    let expiry = NaN;
    try { expiry = Number(sessionStorage.getItem(expiryKey)); } catch {}
    const now = Date.now();
    if(!expiry || isNaN(expiry) || expiry <= now){
      expiry = now + 5*60*1000;
      try { sessionStorage.setItem(expiryKey, String(expiry)); } catch {}
    }
  const tick = ()=>{
      const remainingMs = expiry - Date.now();
      if(remainingMs <= 0){
        setTimeLeft(0);
        setExpired(true);
    resetPaymentForm();
    try { sessionStorage.removeItem(expiryKey); } catch {}
    try { sessionStorage.removeItem('bookingFormData'); } catch {}
        return;
      }
      setTimeLeft(Math.floor(remainingMs/1000));
    };
    tick();
    const id = setInterval(tick, 1000);
    return ()=> clearInterval(id);
  }, [resetPaymentForm]);

  // Detect logout (token removal) and clear payment form
  const prevTokenRef = useRef(localStorage.getItem('access_token'));
  useEffect(()=>{
    const poll = setInterval(()=>{
      const current = localStorage.getItem('access_token');
      if(prevTokenRef.current && !current){
        resetPaymentForm();
        try { sessionStorage.removeItem(expiryKey); } catch {}
        try { sessionStorage.removeItem('bookingFormData'); } catch {}
        setExpired(false);
        setTimeLeft(300);
      }
      prevTokenRef.current = current;
    }, 1500);
    return ()=> clearInterval(poll);
  }, [resetPaymentForm]);

  const formatTime = (secs)=>{
    const m = Math.floor(secs/60).toString().padStart(2,'0');
    const s = (secs%60).toString().padStart(2,'0');
    return `${m}:${s}`;
  };

  // --- Validation Helpers ---
  const normalizeCard = (v) => v.replace(/[^0-9]/g, '');
  const luhnValid = (num) => {
    if(num.length < 12) return false;
    let sum = 0, alt = false;
    for (let i = num.length - 1; i >= 0; i--) {
      let n = parseInt(num[i],10);
      if (alt) { n *= 2; if (n > 9) n -= 9; }
      sum += n; alt = !alt;
    }
    return sum % 10 === 0;
  };
  const expiryValid = (mmYY) => {
    if(!/^(0[1-9]|1[0-2])\/\d{2}$/.test(mmYY)) return false;
    const [mm, yy] = mmYY.split('/');
    const month = parseInt(mm,10);
    const year = 2000 + parseInt(yy,10);
    const now = new Date();
    // Last day of expiry month
    const exp = new Date(year, month, 0, 23, 59, 59);
    return exp >= new Date(now.getFullYear(), now.getMonth(), 1);
  };
  const cvcValid = (cvc) => /^[0-9]{3,4}$/.test(cvc);
  const looksFake = (num) => /^([0-9])\1+$/.test(num);

  // --- Field specific derived / formatting handlers ---
  const formatCardNumber = (raw) => normalizeCard(raw).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (raw) => {
    const digits = raw.replace(/[^0-9]/g,'').slice(0,4);
    if(digits.length <= 2) return digits;
    return digits.slice(0,2) + '/' + digits.slice(2);
  };

  const handleInputChange = (field) => (event) => {
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    if(field === 'cardNumber') value = formatCardNumber(value);
    if(field === 'expiryDate') value = formatExpiry(value);
    if(field === 'cvc') value = value.replace(/[^0-9]/g,'').slice(0,4);
    setFormData(f=>({ ...f, [field]: value }));
  };

  // --- Validation state (computed) ---
  const validation = useMemo(()=>{
    const errors = {};
    const cardDigits = normalizeCard(formData.cardNumber);
    if(!formData.cardholderName.trim()) errors.cardholderName = 'Required';
    if(!cardDigits) errors.cardNumber = 'Required';
    else if(looksFake(cardDigits)) errors.cardNumber = 'Invalid number';
    else if(cardDigits.length < 13 || cardDigits.length > 19) errors.cardNumber = 'Length 13-19 digits';
    else if(!luhnValid(cardDigits)) errors.cardNumber = 'Failed checksum';
    if(!formData.expiryDate) errors.expiryDate = 'Required';
    else if(!expiryValid(formData.expiryDate)) errors.expiryDate = 'Invalid or expired';
    if(!formData.cvc) errors.cvc = 'Required';
    else if(!cvcValid(formData.cvc)) errors.cvc = '3 or 4 digits';
    if(!formData.billingAddress.trim()) errors.billingAddress = 'Required';
    if(!formData.city.trim()) errors.city = 'Required';
    if(!formData.postalCode.trim()) errors.postalCode = 'Required';
    return { errors, isValid: Object.keys(errors).length === 0 && formData.agreeToTerms };
  }, [formData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setAttemptedSubmit(true);
    if(!validation.isValid) return; // do not proceed if invalid
    const token = localStorage.getItem('access_token');
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    // Compute total amount if not already present in bookingData (fallback simple example)
  const totalAmount = bookingData?.totalAmount || bookingData?.total_amount || 0;
    const payload = {
      package_id: packageId,
      travel_date: bookingData?.travelDate || bookingData?.travel_date || '',
      adults: Number(bookingData?.adults)||0,
      children: Number(bookingData?.children)||0,
      guide_language: bookingData?.language || bookingData?.guide_language || '',
      total_amount: totalAmount,
  billing_address: formData.billingAddress,
      city: formData.city,
      postal_code: formData.postalCode
    };

    const headers = { 'Content-Type':'application/json', ...(token?{Authorization:`Bearer ${token}`}:{}) };

    (async()=>{
      let bookingResponse = null;
      try{
        const res = await fetch(`${apiBase}/api/v1/bookings/`, { method:'POST', headers, body: JSON.stringify(payload) });
        if(res.status === 201){
          bookingResponse = await res.json();
          // Mark payment status success locally (future: PATCH endpoint after real payment)
          if(bookingResponse){
            bookingResponse.payment_status = 'success';
          }
        }
      }catch(e){ /* ignore */ }

      // Increment booking count separately (optional)
      if(packageId){
        try {
          fetch(`${apiBase}/api/v1/tour-packages/${packageId}/increment-bookings`, { method:'POST', headers, body: JSON.stringify({ delta:1 }) }).catch(()=>{});
        } catch(e){/* ignore */}
      }

      // Clear persisted data
      try { sessionStorage.removeItem('bookingFormData'); } catch {}
      try { sessionStorage.removeItem('bookingFlowExpiry'); } catch {}
  navigate('/booking/confirmation', { state:{ packageId, bookingData: { ...bookingData, totalAmount }, payment: formData, booking: bookingResponse } });
    })();
  };

  const inputStyle = {
    width: '100%',
    paddingLeft: '48px',
    paddingRight: '16px',
    paddingTop: '12px',
    paddingBottom: '12px',
    backgroundColor: '#f8f9fa',
    border: '2px solid #e9ecef',
    borderRadius: '12px',
    fontSize: '16px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    outline: 'none',
    transition: 'all 0.2s ease'
  };

  const labelStyle = {
    display: 'block',
    color: '#333',
    fontWeight: '500',
    marginBottom: '0.5rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const iconStyle = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#00A79D',
    width: '20px',
    height: '20px'
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = '#00A79D';
    e.target.style.boxShadow = '0 0 0 3px rgba(0, 167, 157, 0.1)';
  };

  const handleBlur = (field) => (e) => {
    e.target.style.borderColor = '#e9ecef';
    e.target.style.boxShadow = 'none';
    setTouched(t=>({...t,[field]:true}));
  };

  const errorText = (msg) => msg ? (<div style={{color:'#d93025',fontSize:12,marginTop:6,fontFamily:'system-ui,-apple-system,sans-serif'}}>{msg}</div>) : null;
  const showError = (field) => !!validation.errors[field] && (touched[field] || attemptedSubmit);

  return (
    <>
    <Navbar />
    <div style={{
      minHeight: '100vh',
      padding: '3rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Page Title - Outside the card */}
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#00A79D',
        textAlign: 'center',
        marginBottom: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        Secure Payment
      </h1>
      {/* Countdown Timer */}
      <div style={{
        marginBottom:'1.5rem',
        display:'flex',
        justifyContent:'center',
        width:'100%'
      }}>
        <div style={{
          background: expired ? '#ffe5e5' : '#E6FAF9',
          border: `1px solid ${expired ? '#ffb3b3' : '#b6e9e4'}`,
          color: expired ? '#b00020' : '#007f78',
          padding:'8px 18px',
          borderRadius:30,
          fontFamily:'system-ui,-apple-system,sans-serif',
          fontSize:14,
          fontWeight:500,
          letterSpacing:0.5,
          boxShadow:'0 2px 6px rgba(0,0,0,0.08)'
        }}>
          {expired ? 'Payment session expired. Form reset.' : `Time left: ${formatTime(timeLeft)}`}
        </div>
      </div>
      {/* Expiry Warning (final 60s) */}
      {!expired && timeLeft <= 60 && (
        <div style={{
          marginBottom:'1.5rem',
          maxWidth:800,
          width:'100%',
          background:'#fff4e5',
          border:'1px solid #ffd8a8',
          color:'#b54708',
          padding:'10px 16px',
          borderRadius:12,
          fontFamily:'system-ui,-apple-system,sans-serif',
          fontSize:14,
          display:'flex',
          alignItems:'center',
          gap:12,
          boxShadow:'0 2px 6px rgba(0,0,0,0.06)'
        }} role="alert" aria-live="assertive">
          <span style={{
            display:'inline-block',
            width:10,
            height:10,
            borderRadius:'50%',
            background:'#ff922b',
            boxShadow:'0 0 0 4px rgba(255,146,43,0.25)'
          }} />
          <strong style={{fontWeight:600}}>Almost there!</strong>
          <span>Your session will expire in {timeLeft} second{timeLeft!==1?'s':''}. Submit payment to finish.</span>
        </div>
      )}

      {/* Progress Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3rem',
        gap: '2rem'
      }}>
        {/* Stepper (steps 1 & 2 active, 3 current) */}
        {/** Booking Details -> Review & Confirm -> Payment **/}
        <div style={{ display:'flex', alignItems:'center', gap:'2rem' }}>
          {['Booking Details','Review & Confirm','Payment'].map((label, idx)=>{
            const step = idx+1;
            const isActive = step < 3; // completed
            const isCurrent = step === 3;
            const bg = isCurrent ? '#00A79D' : (isActive ? '#00A79D' : '#e0e0e0');
            const color = isCurrent || isActive ? 'white' : '#999';
            const labelColor = isCurrent || isActive ? '#00A79D' : '#999';
            return (
              <React.Fragment key={label}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem' }}>
                  <div style={{ width:40,height:40,borderRadius:'50%',backgroundColor:bg,color,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',fontSize:18,fontFamily:'system-ui,-apple-system,sans-serif' }}>{step}</div>
                  <span style={{ fontSize:14,color:labelColor,fontWeight:500,fontFamily:'system-ui,-apple-system,sans-serif' }}>{label}</span>
                </div>
                {step < 3 && <div style={{ width:60,height:2, backgroundColor: step < 3 ? '#00A79D' : '#e0e0e0' }} />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Content Card */}
      <div style={{
        maxWidth: '800px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        padding: '2.5rem'
      }}>
        {/* Form Content */}
        <div 
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          
          {/* Card Information Section */}
          <div>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '1.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Card Information
            </h2>
          </div>

          {/* Cardholder Name */}
          <div>
            <label style={labelStyle}>
              Cardholder Name <span style={{color:'#d93025'}}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <CreditCard style={iconStyle} />
              <input
                type="text"
                placeholder="Enter cardholder name"
                value={formData.cardholderName}
                onChange={handleInputChange('cardholderName')}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur('cardholderName')}
              />
            </div>
            {showError('cardholderName') && errorText(validation.errors.cardholderName)}
          </div>

          {/* Card Number */}
          <div>
            <label style={labelStyle}>
              Card Number <span style={{color:'#d93025'}}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <CreditCard style={iconStyle} />
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleInputChange('cardNumber')}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur('cardNumber')}
              />
            </div>
            {showError('cardNumber') && errorText(validation.errors.cardNumber)}
          </div>

          {/* Expiry Date and CVC */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem'
          }}>
            <div>
              <label style={labelStyle}>
                Expiry Date <span style={{color:'#d93025'}}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Calendar style={iconStyle} />
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange('expiryDate')}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur('expiryDate')}
                />
              </div>
              {showError('expiryDate') && errorText(validation.errors.expiryDate)}
            </div>

            <div>
              <label style={labelStyle}>
                CVC <span style={{color:'#d93025'}}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Lock style={iconStyle} />
                <input
                  type="text"
                  placeholder="123"
                  value={formData.cvc}
                  onChange={handleInputChange('cvc')}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur('cvc')}
                />
              </div>
              {showError('cvc') && errorText(validation.errors.cvc)}
            </div>
          </div>

          {/* Billing Address Section */}
          <div style={{
            borderTop: '2px solid #e9ecef',
            paddingTop: '2rem',
            marginTop: '1rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '1.5rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Billing Address
            </h3>
            
            {/* Street Address */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>
                Street Address <span style={{color:'#d93025'}}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <MapPin style={iconStyle} />
                <input
                  type="text"
                  placeholder="Enter your street address"
                  value={formData.billingAddress}
                  onChange={handleInputChange('billingAddress')}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur('billingAddress')}
                />
              </div>
              {showError('billingAddress') && errorText(validation.errors.billingAddress)}
            </div>

            {/* City and Postal Code */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem'
            }}>
              <div>
                <label style={labelStyle}>
                  City <span style={{color:'#d93025'}}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Building style={iconStyle} />
                  <input
                    type="text"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleInputChange('city')}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur('city')}
                  />
                </div>
                {showError('city') && errorText(validation.errors.city)}
              </div>

              <div>
                <label style={labelStyle}>
                  Postal/Zip Code <span style={{color:'#d93025'}}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail style={iconStyle} />
                  <input
                    type="text"
                    placeholder="Enter postal code"
                    value={formData.postalCode}
                    onChange={handleInputChange('postalCode')}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur('postalCode')}
                  />
                </div>
                {showError('postalCode') && errorText(validation.errors.postalCode)}
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#fff3cd',
            borderRadius: '12px',
            border: '1px solid #ffeaa7'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '0.75rem'
            }}>
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange('agreeToTerms')}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: '#00A79D',
                  marginTop: '2px'
                }}
              />
              <label 
                htmlFor="agreeToTerms"
                style={{
                  fontSize: '0.875rem',
                  color: '#856404',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  lineHeight: 1.5,
                  margin: 0
                }}
              >
                I agree to the terms and conditions, privacy policy, and cancellation policy. 
                I understand that my payment will be processed securely.
              </label>
            </div>
          </div>

          {/* Accepted Payment Methods */}
          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #e9ecef',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '0.875rem',
              color: '#666',
              marginBottom: '1rem',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              We accept the following payment methods:
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                width: '60px',
                height: '40px',
                backgroundColor: '#FF5F00',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '10px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                MASTER
                <br />
                CARD
              </div>
              <div style={{
                width: '60px',
                height: '40px',
                backgroundColor: '#1A1F71',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '14px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                VISA
              </div>
              <div style={{
                width: '60px',
                height: '40px',
                backgroundColor: '#016FD0',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '11px',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                maestro
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            <button
              type="button"
              onClick={()=> navigate('/booking/review', { state:{ packageId, bookingData } })}
              style={{
                flex: 1,
                padding: '12px 24px',
                border: '2px solid #ccc',
                color: '#666',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '500',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#999';
                e.target.style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#ccc';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Previous
            </button>
            <button
              type="submit"
              disabled={!validation.isValid || expired}
              onClick={handleSubmit}
              style={{
                flex: 1,
                padding: '12px 24px',
                backgroundColor: (!expired && validation.isValid) ? '#00A79D' : '#9ccfcb',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                cursor: (!expired && validation.isValid) ? 'pointer' : 'not-allowed',
                boxShadow: (!expired && validation.isValid) ? '0 4px 15px rgba(0, 167, 157, 0.3)' : 'none',
                transition: 'all 0.2s ease',
                opacity: (!expired && validation.isValid) ? 1 : 0.8
              }}
              onMouseEnter={(e) => {
                if(!validation.isValid || expired) return;
                e.target.style.backgroundColor = '#008A80';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 167, 157, 0.4)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                if(!validation.isValid || expired) return;
                e.target.style.backgroundColor = '#00A79D';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 167, 157, 0.3)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
  </div>
  <Footer_Combination />
  </>
  );
}

export default PaymentInformation;