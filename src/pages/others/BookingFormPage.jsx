import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Users, 
  Baby,
  Globe
} from 'lucide-react';

const languages = [
  'English',
  'Sinhala', 
  'Tamil',
  'German',
  'French',
  'Spanish',
  'Japanese',
  'Chinese'
];

function BookingFormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const packageId = location.state?.packageId || null;
  const expiryKey = 'bookingFlowExpiry'; // moved earlier for persisted logic reuse
  const persisted = (()=>{
    try {
      const data = JSON.parse(sessionStorage.getItem('bookingFormData')||'null') || null;
      const exp = Number(sessionStorage.getItem(expiryKey));
      if(exp && !isNaN(exp) && exp <= Date.now()){
        // Already expired; ignore old data
        return null;
      }
      return data;
    } catch { return null; }
  })();
  const incoming = location.state?.bookingData || null;
  const [formData, setFormData] = useState({
    fullName: incoming?.fullName || persisted?.fullName || '',
    email: incoming?.email || persisted?.email || '',
    mobile: incoming?.mobile || persisted?.mobile || '',
    travelDate: incoming?.travelDate || persisted?.travelDate || '',
    adults: incoming?.adults || persisted?.adults || '',
    children: incoming?.children || persisted?.children || '',
    language: incoming?.language || persisted?.language || '',
    packageId: packageId || incoming?.packageId || persisted?.packageId || ''
  });

  // 5-minute countdown timer state
  const [timeLeft, setTimeLeft] = useState(300); // in seconds
  const [expired, setExpired] = useState(false);
  // Shared key used across booking flow (details + payment) so total window is 5 minutes
  // (Key declared above)

  const resetForm = useCallback(()=>{
    setFormData({
      fullName: '',
      email: '',
      mobile: '',
      travelDate: '',
      adults: '',
      children: '',
      language: '',
      packageId: ''
    });
    try { sessionStorage.removeItem('bookingFormData'); } catch {}
  }, []);

  // Initialize / manage countdown
  useEffect(()=>{
    let expiry = NaN;
    try { expiry = Number(sessionStorage.getItem(expiryKey)); } catch { /* ignore */ }
    const now = Date.now();
    if(!expiry || isNaN(expiry) || expiry <= now){
      expiry = now + 5*60*1000; // 5 minutes
      try { sessionStorage.setItem(expiryKey, String(expiry)); } catch {}
    }
    const tick = ()=>{
      const remainingMs = expiry - Date.now();
      if(remainingMs <= 0){
        setTimeLeft(0);
        setExpired(true);
        resetForm();
        try { sessionStorage.removeItem(expiryKey); } catch {}
        return;
      }
      setTimeLeft(Math.floor(remainingMs/1000));
    };
    tick();
    const id = setInterval(tick, 1000);
    return ()=> clearInterval(id);
  }, [resetForm]);

  // Detect logout (token removal) and clear form + timer
  const prevTokenRef = useRef(localStorage.getItem('access_token'));
  useEffect(()=>{
    const poll = setInterval(()=>{
      const current = localStorage.getItem('access_token');
      if(prevTokenRef.current && !current){
        resetForm();
        try { sessionStorage.removeItem(expiryKey); } catch {}
        setExpired(false);
        setTimeLeft(300);
      }
      prevTokenRef.current = current;
    }, 1500);
    return ()=> clearInterval(poll);
  }, [resetForm]);

  const formatTime = (secs)=>{
    const m = Math.floor(secs/60).toString().padStart(2,'0');
    const s = (secs%60).toString().padStart(2,'0');
    return `${m}:${s}`;
  };

  // Prefill user data if logged in
  useEffect(()=>{
    const token = localStorage.getItem('access_token');
    if(!token) return;
    const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    (async()=>{
      try{
        const res = await fetch(`${base}/api/v1/auth/me`, { headers:{ Authorization:`Bearer ${token}` } });
        if(!res.ok) return; // silently ignore
        const data = await res.json();
        setFormData(f=>({
          ...f,
          fullName: data.full_name || f.fullName,
          email: data.email || f.email,
          mobile: data.phone_number || f.mobile
        }));
      }catch(e){ /* ignore */ }
    })();
  }, []);

  // Ensure page starts at top when entering booking flow
  useEffect(()=>{
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  // Persist to sessionStorage whenever formData changes
  useEffect(()=>{
    try { sessionStorage.setItem('bookingFormData', JSON.stringify(formData)); } catch { /* ignore */ }
  }, [formData]);

  // Custom dropdown state for Tour Guide Language
  const [languageOpen, setLanguageOpen] = useState(false);
  const languageRef = useRef(null);

  // Close dropdown on outside click
  useEffect(()=>{
    const handleClickOutside = (e)=>{
      if(languageRef.current && !languageRef.current.contains(e.target)){
        setLanguageOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return ()=> document.removeEventListener('mousedown', handleClickOutside);
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Basic minimal validation (ensure required fields filled could be added later)
    // Navigate to review step with all data
    navigate('/booking/review', { state: { packageId: formData.packageId || packageId, bookingData: formData } });
  };

  // Determine if all required fields are filled (children can be 0)
  const isComplete = (
    formData.fullName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.mobile.trim() !== '' &&
    formData.travelDate !== '' &&
    formData.adults !== '' && formData.adults !== null &&
    formData.children !== '' && formData.children !== null &&
    formData.language !== ''
  );

  return (
    <>
    <Navbar />
    <div style={{
      minHeight: '100vh',
      // backgroundColor: '#f5f5f5',
      padding: '3rem 1rem',
      display: 'flex',
      flexDirection: 'column', // Added to stack title and form vertically
  alignItems: 'center',
  justifyContent: 'flex-start'
    }}>
      {/* --- CHANGE 1: "Book The Tour" is now outside the form card --- */}
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#00A79D',
        textAlign: 'center',
        marginBottom: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        Ready to Explore? Book Your Tour Now
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
          {expired ? 'Session expired. Form reset.' : `Time left: ${formatTime(timeLeft)}`}
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
          <strong style={{fontWeight:600}}>Hurry!</strong>
          <span>Your booking session will expire in {timeLeft} second{timeLeft!==1?'s':''}. Complete this step to keep your data.</span>
        </div>
      )}
      {/* Step Progress Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '2.5rem',
        gap: '2rem'
      }}>
        {/* Step 1 Active */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem' }}>
          <div style={circleStyleActive}>1</div>
          <span style={labelStyleActive}>Booking Details</span>
        </div>
        <div style={lineStyleInactive}></div>
        {/* Step 2 Inactive */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem' }}>
          <div style={circleStyleInactive}>2</div>
          <span style={labelStyleInactive}>Review & Confirm</span>
        </div>
        <div style={lineStyleInactive}></div>
        {/* Step 3 Inactive */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem' }}>
          <div style={circleStyleInactive}>3</div>
          <span style={labelStyleInactive}>Payment</span>
        </div>
      </div>
      {packageId && (
        <div style={{
          background:'#E6FAF9',
          border:'1px solid #b6e9e4',
          color:'#007f78',
          padding:'10px 16px',
          borderRadius:12,
          fontSize:14,
          fontFamily:'system-ui,-apple-system,sans-serif',
          marginBottom:'1.5rem',
          maxWidth:800,
          width:'100%'
        }}>
          Booking for Package ID: <strong>{packageId}</strong>
        </div>
      )}
      
      <div style={{
        // --- CHANGE 2: Increased the width of the form ---
        maxWidth: '800px', 
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        padding: '2.5rem' // Adjusted padding for the new size
      }}>
        
        {/* Changed the wrapping div to a form tag for better semantics */}
        <form 
          onSubmit={handleSubmit} 
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {/* Hidden package id if present */}
          {packageId && (
            <input type="hidden" name="packageId" value={packageId} />
          )}
          {/* Full Name */}
          <div>
            <label style={{
              display: 'block', color: '#333', fontWeight: '500', marginBottom: '0.5rem', fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              Full Name <span style={{color:'#d93025'}}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <User style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#00A79D',
                width: '20px',
                height: '20px'
              }} />
              <input
                type="text"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={handleInputChange('fullName')}
                style={{
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
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00A79D';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 167, 157, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={{display:'block',color:'#333',fontWeight:'500',marginBottom:'0.5rem',fontFamily:'system-ui, -apple-system, sans-serif'}}>
              Email Address <span style={{color:'#d93025'}}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <Mail style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#00A79D',
                width: '20px',
                height: '20px'
              }} />
              <input
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleInputChange('email')}
                style={{
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
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00A79D';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 167, 157, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label style={{display:'block',color:'#333',fontWeight:'500',marginBottom:'0.5rem',fontFamily:'system-ui, -apple-system, sans-serif'}}>
              Mobile Number <span style={{color:'#d93025'}}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <Phone style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#00A79D',
                width: '20px',
                height: '20px'
              }} />
              <input
                type="tel"
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={handleInputChange('mobile')}
                style={{
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
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00A79D';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 167, 157, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Travel Date */}
          <div>
            <label style={{display:'block',color:'#333',fontWeight:'500',marginBottom:'0.5rem',fontFamily:'system-ui, -apple-system, sans-serif'}}>
              Travel Date <span style={{color:'#d93025'}}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <Calendar style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#00A79D',
                width: '20px',
                height: '20px'
              }} />
              <input
                type="date"
                value={formData.travelDate}
                onChange={handleInputChange('travelDate')}
                style={{
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
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00A79D';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 167, 157, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Adults */}
          <div>
            <label style={{display:'block',color:'#333',fontWeight:'500',marginBottom:'0.5rem',fontFamily:'system-ui, -apple-system, sans-serif'}}>
              Number of adult travellers <span style={{color:'#d93025'}}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <Users style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#00A79D',
                width: '20px',
                height: '20px'
              }} />
              <input
                type="number"
                min="0"
                placeholder="Enter the adults count"
                value={formData.adults}
                onChange={handleInputChange('adults')}
                style={{
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
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00A79D';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 167, 157, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Children */}
          <div>
            <label style={{display:'block',color:'#333',fontWeight:'500',marginBottom:'0.5rem',fontFamily:'system-ui, -apple-system, sans-serif'}}>
              Number of child travellers (Under 13 years) <span style={{color:'#d93025'}}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <Baby style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#00A79D',
                width: '20px',
                height: '20px'
              }} />
              <input
                type="number"
                min="0"
                placeholder="Enter the child count"
                value={formData.children}
                onChange={handleInputChange('children')}
                style={{
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
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00A79D';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 167, 157, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e9ecef';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Language (Custom Dropdown) */}
          <div>
            <label style={{display:'block',color:'#333',fontWeight:'500',marginBottom:'0.5rem',fontFamily:'system-ui, -apple-system, sans-serif'}}>
              Tour Guide Language <span style={{color:'#d93025'}}>*</span>
            </label>
            <div ref={languageRef} style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={()=> setLanguageOpen(o=>!o)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  paddingLeft: '48px',
                  paddingRight: '40px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  backgroundColor: '#f8f9fa',
                  border: '2px solid #e9ecef',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onFocus={(e)=>{
                  e.target.style.borderColor = '#00A79D';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 167, 157, 0.1)';
                }}
                onBlur={(e)=>{
                  // Keep border color if menu open
                  if(!languageOpen){
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                <Globe style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#00A79D',
                  width: '20px',
                  height: '20px'
                }} />
                <span style={{ color: formData.language ? '#333' : '#777' }}>
                  {formData.language || 'Select the Guide Language'}
                </span>
                <span style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: 12,
                  color: '#555',
                  transition: 'transform 0.2s',
                  display: 'inline-block',
                  transformOrigin: 'center'
                }}>
                  {languageOpen ? '▲' : '▼'}
                </span>
              </button>
              {languageOpen && (
                <ul
                  role="listbox"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    margin: 0,
                    padding: '4px 0',
                    listStyle: 'none',
                    background: 'white',
                    border: '1px solid #d9e2e1',
                    borderRadius: '12px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                    maxHeight: 240,
                    overflowY: 'auto',
                    zIndex: 20
                  }}
                >
                  {languages.map(lang => {
                    const selected = formData.language === lang;
                    return (
                      <li key={lang}>
                        <button
                          type="button"
                          onClick={()=>{
                            setFormData(f=>({...f, language: lang}));
                            setLanguageOpen(false);
                          }}
                          style={{
                            display:'block',
                            width:'100%',
                            textAlign:'left',
                            background: selected ? '#00A79D' : 'transparent',
                            color: selected ? 'white' : '#333',
                            border: 'none',
                            padding: '10px 16px 10px 48px',
                            fontSize: 15,
                            fontFamily:'system-ui,-apple-system,sans-serif',
                            cursor:'pointer',
                            position:'relative'
                          }}
                          onMouseEnter={(e)=>{
                            if(!selected){ e.target.style.background='#E6FAF9'; }
                          }}
                          onMouseLeave={(e)=>{
                            if(!selected){ e.target.style.background='transparent'; }
                          }}
                        >
                          <Globe style={{
                            position:'absolute',
                            left:16,
                            top:'50%',
                            transform:'translateY(-50%)',
                            width:18,
                            height:18,
                            color: selected ? 'white' : '#00A79D'
                          }} />
                          {lang}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            <button
              type="button"
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
              disabled={!isComplete || expired}
              style={{
                flex: 1,
                padding: '12px 24px',
                backgroundColor: (!expired && isComplete) ? '#00A79D' : '#9ccfcb',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                cursor: (!expired && isComplete) ? 'pointer' : 'not-allowed',
                boxShadow: (!expired && isComplete) ? '0 4px 15px rgba(0, 167, 157, 0.3)' : 'none',
                transition: 'all 0.2s ease',
                opacity: (!expired && isComplete) ? 1 : 0.75
              }}
              onMouseEnter={(e) => {
                if(!isComplete || expired) return;
                e.target.style.backgroundColor = '#008A80';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 167, 157, 0.4)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                if(!isComplete || expired) return;
                e.target.style.backgroundColor = '#00A79D';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 167, 157, 0.3)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
  </div>
  <Footer_Combination />
  </>
  );
}

export default BookingFormPage;

// Inline styles for stepper (placed after export to keep component clean)
const circleBase = (bg, color) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: bg,
  color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '18px',
  fontFamily: 'system-ui, -apple-system, sans-serif'
});
const circleStyleActive = circleBase('#00A79D', 'white');
const circleStyleInactive = circleBase('#e0e0e0', '#999');
const labelStyleActive = { fontSize:'14px', color:'#00A79D', fontWeight:'500', fontFamily:'system-ui, -apple-system, sans-serif' };
const labelStyleInactive = { fontSize:'14px', color:'#999', fontWeight:'500', fontFamily:'system-ui, -apple-system, sans-serif' };
const lineStyleInactive = { width:'60px', height:'2px', backgroundColor:'#e0e0e0' };

