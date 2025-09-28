import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';
import { Calendar, MapPin, Users, Baby, Bed, Package, CreditCard, CheckCircle, Clock, XCircle } from 'lucide-react';
import { BASE_URL } from '../../api';

function MyBookingsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'hotels', 'packages'
  const [hotelBookings, setHotelBookings] = useState([]);
  const [packageBookings, setPackageBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('access_token');
        if (!token) {
          setError('Please log in to view your bookings');
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        // Fetch both types of bookings in parallel
        const [hotelRes, packageRes] = await Promise.all([
          fetch(`${BASE_URL}/hotel-bookings/`, { headers }).catch(() => ({ ok: false })),
          fetch(`${BASE_URL}/bookings/`, { headers }).catch(() => ({ ok: false }))
        ]);

        let hotelData = [];
        let packageData = [];

        if (hotelRes.ok) {
          const hotelResult = await hotelRes.json();
          hotelData = hotelResult.items || [];
        }

        if (packageRes.ok) {
          const packageResult = await packageRes.json();
          packageData = packageResult.items || [];
        }

        setHotelBookings(hotelData);
        setPackageBookings(packageData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle size={16} style={{ color: '#10b981' }} />;
      case 'pending': return <Clock size={16} style={{ color: '#f59e0b' }} />;
      case 'failed': return <XCircle size={16} style={{ color: '#ef4444' }} />;
      default: return <Clock size={16} style={{ color: '#6b7280' }} />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'success': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'failed': return 'Failed';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const allBookings = [
    ...hotelBookings.map(b => ({ ...b, type: 'hotel' })),
    ...packageBookings.map(b => ({ ...b, type: 'package' }))
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const filteredBookings = activeTab === 'all' ? allBookings :
    activeTab === 'hotels' ? allBookings.filter(b => b.type === 'hotel') :
    allBookings.filter(b => b.type === 'package');

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.2rem', color: '#6b7280' }}>Loading your bookings...</div>
          </div>
        </div>
        <Footer_Combination />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#00A79D',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            My Bookings
          </h1>

          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            borderBottom: '2px solid #e5e7eb',
            paddingBottom: '1rem'
          }}>
            {[
              { key: 'all', label: 'All Bookings', count: allBookings.length },
              { key: 'hotels', label: 'Hotels', count: hotelBookings.length },
              { key: 'packages', label: 'Tour Packages', count: packageBookings.length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: activeTab === tab.key ? '#00A79D' : 'transparent',
                  color: activeTab === tab.key ? 'white' : '#6b7280',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {filteredBookings.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <Package size={48} style={{ color: '#d1d5db', marginBottom: '1rem' }} />
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>No bookings found</h3>
              <p style={{ margin: 0, color: '#6b7280' }}>
                {activeTab === 'all' ? 'You haven\'t made any bookings yet.' :
                 activeTab === 'hotels' ? 'No hotel bookings found.' :
                 'No tour package bookings found.'}
              </p>
              <button
                onClick={() => navigate('/')}
                style={{
                  marginTop: '1.5rem',
                  padding: '0.75rem 1.5rem',
                  background: '#00A79D',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Explore Now
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredBookings.map(booking => (
                <BookingCard key={`${booking.type}-${booking.booking_id}`} booking={booking} navigate={navigate} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer_Combination />
    </>
  );
}

function BookingCard({ booking, navigate }) {
  const isHotel = booking.type === 'hotel';
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'success':
        return { background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' };
      case 'pending':
        return { background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' };
      case 'failed':
        return { background: '#fee2e2', color: '#dc2626', border: '1px solid #fecaca' };
      default:
        return { background: '#f3f4f6', color: '#6b7280', border: '1px solid #d1d5db' };
    }
  };

  const statusStyle = getStatusStyle(booking.payment_status);

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isHotel ? <Bed size={20} style={{ color: '#00A79D' }} /> : <Package size={20} style={{ color: '#00A79D' }} />}
          <h3 style={{ margin: 0, color: '#1f2937', fontSize: '1.1rem' }}>
            {isHotel ? 'Hotel Booking' : 'Tour Package'}
          </h3>
        </div>
        <div style={{
          ...statusStyle,
          padding: '0.25rem 0.75rem',
          borderRadius: '12px',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          {booking.payment_status === 'success' ? 'Confirmed' : 
           booking.payment_status === 'pending' ? 'Pending' : 
           booking.payment_status === 'failed' ? 'Failed' : 'Unknown'}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        <InfoItem
          icon={<Calendar size={16} style={{ color: '#00A79D' }} />}
          label={isHotel ? 'Check-in' : 'Travel Date'}
          value={formatDate(isHotel ? booking.check_in : booking.travel_date)}
        />
        {isHotel && (
          <InfoItem
            icon={<Calendar size={16} style={{ color: '#00A79D' }} />}
            label="Check-out"
            value={formatDate(booking.check_out)}
          />
        )}
        <InfoItem
          icon={<Users size={16} style={{ color: '#00A79D' }} />}
          label="Adults"
          value={booking.adults || '—'}
        />
        <InfoItem
          icon={<Baby size={16} style={{ color: '#00A79D' }} />}
          label="Children"
          value={booking.children || '0'}
        />
        <InfoItem
          icon={<CreditCard size={16} style={{ color: '#00A79D' }} />}
          label="Total Amount"
          value={booking.total_amount ? `$${booking.total_amount.toFixed(2)}` : '—'}
        />
      </div>

      {isHotel && (
        <div style={{ marginBottom: '1rem' }}>
          <InfoItem
            icon={<Bed size={16} style={{ color: '#00A79D' }} />}
            label="Room Type"
            value={booking.room_type_name || '—'}
          />
        </div>
      )}

      {!isHotel && booking.guide_language && (
        <div style={{ marginBottom: '1rem' }}>
          <InfoItem
            icon={<MapPin size={16} style={{ color: '#00A79D' }} />}
            label="Guide Language"
            value={booking.guide_language}
          />
        </div>
      )}

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '1rem',
        borderTop: '1px solid #e5e7eb',
        fontSize: '0.875rem',
        color: '#6b7280'
      }}>
        <span>Booking ID: {booking.booking_id}</span>
        <span>Booked: {formatDate(booking.created_at)}</span>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      {icon}
      <div>
        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{label}</div>
        <div style={{ fontSize: '0.875rem', color: '#1f2937', fontWeight: '500' }}>{value}</div>
      </div>
    </div>
  );
}

export default MyBookingsPage;
