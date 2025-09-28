import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';
import {
  Calendar,
  Users,
  Baby,
  Globe,
  MapPin,
  Clock,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { useCurrency } from '../../contexts/CurrencyContext.jsx';

const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * PackageBookingSummary
 * Dynamic variant of the static TourSummary. It displays:
 *  - Selected package data (fetched by packageId)
 *  - Entered booking form data (passed via location.state.bookingData)
 *  - Price formatting via currency context
 *  - Step indicator (Step 2: Review & Confirm)
 *
 * Expects navigation from BookingFormPage using:
 * navigate('/booking/review', { state: { packageId, bookingData: formData } });
 */
export default function PackageBookingSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { format } = useCurrency();

  const packageId = location.state?.packageId || ( ()=>{ try { return (JSON.parse(sessionStorage.getItem('bookingFormData')||'{}')).packageId || null; } catch { return null; } })();
  const bookingData = location.state?.bookingData || ( ()=>{ try { return JSON.parse(sessionStorage.getItem('bookingFormData')||'{}'); } catch { return {}; } })();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(!!packageId);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!packageId) return;
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${base}/api/v1/tour-packages/${packageId}`);
        if (!res.ok) throw new Error('Package not found');
        const data = await res.json();
        if (active) setPkg(data);
      } catch (e) {
        if (active) setError(e.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [packageId]);

  const dayCount = pkg?.day_count || pkg?.duration_days || null;
  const title = pkg?.title || 'Selected Tour Package';
  const subtitle = pkg?.short_description || pkg?.description || 'Review your entered details before confirming.';

  const adultsCount = Number(bookingData.adults) || 0;
  const childrenCount = Number(bookingData.children) || 0;
  const requestedTotal = adultsCount + childrenCount;
  const includedCount = Number(pkg?.person_count) || 0;
  const rawPerPerson = pkg?.price_per_person || (pkg?.package_price && includedCount > 0 ? pkg.package_price / includedCount : 0);
  let pricingMode = 'per-person';
  let basePrice = 0;
  let adultCost = 0;
  let childCost = 0;
  if (includedCount > 0 && pkg?.package_price && requestedTotal === includedCount) {
    // Use flat package price
    pricingMode = 'package';
    basePrice = pkg.package_price;
  } else {
    // Compute per-person with discount for children (80% of per-person price)
    adultCost = adultsCount * rawPerPerson;
    childCost = childrenCount * (0.8 * rawPerPerson);
    basePrice = adultCost + childCost;
  }
  const tax = basePrice ? Math.round(basePrice * 0.12 * 100)/100 : 0; // 12%
  const total = basePrice + tax;

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
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#00A79D',
        textAlign: 'center',
        marginBottom: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        Review Your Booking
      </h1>

      {/* Progress Indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3rem',
        gap: '2rem'
      }}>
        {/* Step 1 */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: '0.5rem' }}>
          <div style={circleActive}>1</div>
          <span style={labelActive}>Booking Details</span>
        </div>
        <div style={lineActive} />
        {/* Step 2 */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: '0.5rem' }}>
          <div style={circleActive}>2</div>
          <span style={labelActive}>Review & Confirm</span>
        </div>
        <div style={lineInactive} />
        {/* Step 3 */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: '0.5rem' }}>
          <div style={circleInactive}>3</div>
          <span style={labelInactive}>Payment</span>
        </div>
      </div>

      <div style={{
        maxWidth: '800px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        padding: '2.5rem'
      }}>
        {/* Package visual header */}
        <div style={{
          width: '100%',
          height: '250px',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '2rem',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: pkg?.photo
            ? `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${pkg.photo})`
            : 'linear-gradient(135deg, #004f4b 0%, #006b64 40%, #008a80 70%, #00a79d 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          {/* Optional subtle overlay ring effect */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: pkg?.photo ? 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.08), transparent 60%)' : 'none'
          }} />
          <div style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ textAlign: 'center', color: 'white' }}>
              <MapPin size={48} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {loading ? 'Loading package...' : title}
              </h3>
              <p style={{ fontSize: '1rem', margin: '0.5rem 0 0 0', opacity: 0.9, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {loading ? 'Please wait' : subtitle.slice(0, 80) + (subtitle.length > 80 ? '...' : '')}
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div style={{
            background:'#fff6f6',
            border:'1px solid #f5c2c7',
            color:'#b02a37',
            padding:'12px 16px',
            borderRadius:12,
            marginBottom:'1.5rem',
            fontSize:14
          }}>Failed to load package details: {error}</div>
        )}

        {/* Booking Info */}
        <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
          <div>
            <h3 style={sectionTitle}>Booking Information</h3>
            <div style={infoBox}>
              <div style={gridContainer}>
                <InfoRow label="Guest Name" value={bookingData.fullName || '—'} />
                <InfoRow label="Email" value={bookingData.email || '—'} />
                <InfoRow label="Mobile" value={bookingData.mobile || '—'} />
                <InfoRow label="Guide Language" value={bookingData.language || '—'} />
              </div>
            </div>
          </div>

          {/* Tour Details */}
          <div>
            <div style={detailGrid}>
              <DetailCard icon={<Calendar style={iconStyle} />} label="Travel Date" value={formatDate(bookingData.travelDate)} />
              <DetailCard icon={<Users style={iconStyle} />} label="Adults" value={bookingData.adults ? `${bookingData.adults} Traveler${bookingData.adults>1?'s':''}` : '0'} />
              <DetailCard icon={<Baby style={iconStyle} />} label="Children" value={bookingData.children ? `${bookingData.children} Child${bookingData.children>1?'ren':''}` : '0'} />
              <DetailCard icon={<Clock style={iconStyle} />} label="Duration" value={dayCount ? `${dayCount} Day${dayCount>1?'s':''}` : 'N/A'} />
            </div>
          </div>

    {/* Pricing (Service Fee removed as requested) */}
          <div style={pricingBox}>
            <DollarSign style={pricingIcon} />
            <div style={{ paddingLeft: '32px' }}>
              <h3 style={priceTitle}>Price Breakdown</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                {pricingMode === 'package' ? (
                  <PriceRow label={`Package (${includedCount} persons)`} value={basePrice ? format(basePrice) : '—'} />
                ) : (
                  <>
                    <PriceRow label={`Adults (${adultsCount} x ${format(rawPerPerson)})`} value={adultCost ? format(adultCost) : format(0)} />
                    {childrenCount > 0 && (
                      <PriceRow label={`Children (${childrenCount} x ${format(0.8 * rawPerPerson)})`} value={childCost ? format(childCost) : format(0)} />
                    )}
                    <PriceRow label="Subtotal" value={format(basePrice)} />
                  </>
                )}
                <PriceRow label="Taxes (12%)" value={basePrice ? format(tax) : format(0)} />
                <div style={{ borderTop:'2px solid #00A79D', paddingTop:'0.75rem', marginTop:'0.5rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:'1.25rem', fontWeight:'bold', color:'#00A79D', fontFamily:'system-ui, -apple-system, sans-serif' }}>Total Amount</span>
                  <span style={{ fontSize:'1.25rem', fontWeight:'bold', color:'#00A79D', fontFamily:'system-ui, -apple-system, sans-serif' }}>{basePrice ? format(total) : '—'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div style={policyBox}>
            <AlertCircle style={policyIcon} />
            <div style={{ paddingLeft:'32px' }}>
              <h4 style={policyTitle}>Cancellation Policy</h4>
              <p style={policyText}>
                Free cancellation up to 48 hours before the selected travel date. Later cancellations may incur up to 50% charge of the total amount.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display:'flex', gap:'1rem', marginTop:'2rem' }}>
          <button
            type="button"
            onClick={() => navigate('/booking', { state: { packageId, bookingData } })}
            style={prevBtn}
            onMouseEnter={(e)=>hoverPrev(e,true)}
            onMouseLeave={(e)=>hoverPrev(e,false)}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => navigate('/booking/payment', { state: { packageId, bookingData: { ...bookingData, totalAmount: total } } })}
            style={nextBtn}
            onMouseEnter={(e)=>hoverNext(e,true)}
            onMouseLeave={(e)=>hoverNext(e,false)}
            disabled={!packageId}
          >
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
    <Footer_Combination />
    </>
  );
}

// ---------- Helper Components / Styles ----------
const circleActive = baseCircle('#00A79D','white');
const circleInactive = baseCircle('#e0e0e0','#999');

function baseCircle(bg,color){
  return {
    width:'40px',height:'40px',borderRadius:'50%',backgroundColor:bg,color,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',fontSize:'18px',fontFamily:'system-ui, -apple-system, sans-serif'
  };
}
const labelActive = { fontSize:'14px',color:'#00A79D',fontWeight:'500',fontFamily:'system-ui, -apple-system, sans-serif' };
const labelInactive = { fontSize:'14px',color:'#999',fontWeight:'500',fontFamily:'system-ui, -apple-system, sans-serif' };
const lineActive = { width:'60px', height:'2px', backgroundColor:'#00A79D' };
const lineInactive = { width:'60px', height:'2px', backgroundColor:'#e0e0e0' };

const sectionTitle = { fontSize:'1.25rem', fontWeight:'bold', color:'#333', marginBottom:'1rem', fontFamily:'system-ui, -apple-system, sans-serif' };
const infoBox = { padding:'1rem', backgroundColor:'#f8f9fa', border:'2px solid #e9ecef', borderRadius:'12px', marginBottom:'1rem' };
const gridContainer = { display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(250px, 1fr))', gap:'1rem' };

function InfoRow({ label, value }){
  return (
    <div>
      <strong style={{ color:'#00A79D', fontFamily:'system-ui, -apple-system, sans-serif' }}>{label}:</strong>
      <span style={{ marginLeft:'0.5rem', color:'#333', fontFamily:'system-ui, -apple-system, sans-serif' }}>{value}</span>
    </div>
  );
}

const detailGrid = { display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))', gap:'1rem' };
const iconStyle = { position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'#00A79D', width:'20px', height:'20px' };

function DetailCard({ icon, label, value }){
  return (
    <div style={{ backgroundColor:'#f8f9fa', border:'2px solid #e9ecef', borderRadius:'12px', padding:'12px 16px', position:'relative' }}>
      {icon}
      <div style={{ paddingLeft:'32px' }}>
        <div style={{ fontSize:'14px', color:'#666', fontWeight:'500', fontFamily:'system-ui, -apple-system, sans-serif' }}>{label}</div>
        <div style={{ fontSize:'16px', color:'#333', fontFamily:'system-ui, -apple-system, sans-serif' }}>{value}</div>
      </div>
    </div>
  );
}

const pricingBox = { backgroundColor:'#f8f9fa', border:'2px solid #e9ecef', borderRadius:'12px', padding:'1.5rem', position:'relative' };
const pricingIcon = { position:'absolute', left:'12px', top:'20px', color:'#00A79D', width:'20px', height:'20px' };
const priceTitle = { fontSize:'1.125rem', fontWeight:'bold', color:'#333', marginBottom:'1rem', fontFamily:'system-ui, -apple-system, sans-serif' };

function PriceRow({ label, value }){
  return (
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <span style={{ color:'#333', fontFamily:'system-ui, -apple-system, sans-serif', fontSize:'16px' }}>{label}</span>
      <span style={{ color:'#333', fontFamily:'system-ui, -apple-system, sans-serif', fontSize:'16px', fontWeight:'500' }}>{value}</span>
    </div>
  );
}

const policyBox = { backgroundColor:'#fffbf0', border:'2px solid #fed7aa', borderRadius:'12px', padding:'1rem', position:'relative' };
const policyIcon = { position:'absolute', left:'12px', top:'16px', color:'#ea580c', width:'20px', height:'20px' };
const policyTitle = { fontSize:'1rem', fontWeight:'600', color:'#ea580c', marginBottom:'0.5rem', fontFamily:'system-ui, -apple-system, sans-serif' };
const policyText = { fontSize:'14px', color:'#9a3412', fontFamily:'system-ui, -apple-system, sans-serif', margin:0, lineHeight:1.5 };

const prevBtn = { flex:1, padding:'12px 24px', border:'2px solid #ccc', color:'#666', borderRadius:'12px', fontSize:'16px', fontWeight:'500', fontFamily:'system-ui, -apple-system, sans-serif', backgroundColor:'transparent', cursor:'pointer', transition:'all 0.2s ease' };
const nextBtn = { flex:1, padding:'12px 24px', backgroundColor:'#00A79D', color:'white', border:'none', borderRadius:'12px', fontSize:'16px', fontWeight:'bold', fontFamily:'system-ui, -apple-system, sans-serif', cursor:'pointer', boxShadow:'0 4px 15px rgba(0, 167, 157, 0.3)', transition:'all 0.2s ease', opacity:1 };

function hoverPrev(e, enter){
  if(enter){
    e.target.style.borderColor = '#999';
    e.target.style.backgroundColor = '#f5f5f5';
  } else {
    e.target.style.borderColor = '#ccc';
    e.target.style.backgroundColor = 'transparent';
  }
}
function hoverNext(e, enter){
  if(enter){
    e.target.style.backgroundColor = '#008A80';
    e.target.style.boxShadow = '0 6px 20px rgba(0, 167, 157, 0.4)';
    e.target.style.transform = 'translateY(-2px)';
  } else {
    e.target.style.backgroundColor = '#00A79D';
    e.target.style.boxShadow = '0 4px 15px rgba(0, 167, 157, 0.3)';
    e.target.style.transform = 'translateY(0)';
  }
}

function formatDate(val){
  if(!val) return '—';
  try {
    const d = new Date(val);
    if(isNaN(d.getTime())) return val;
    return d.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'numeric' });
  } catch { return val; }
}
