import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';
import HotelRoomFeatures from '../../components/others/HotelRoomFeatures.jsx';
import { BASE_URL } from '../../api';

function RoomDetailsPage() {
  const { hotelId, roomIndex } = useParams();
  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
  // Scroll to top when navigating between rooms/hotels
  try { window.scrollTo({ top: 0, behavior: 'instant' }); } catch { try { window.scrollTo(0,0); } catch {} }
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/hotels/${hotelId}`);
        if (!res.ok) throw new Error(`Failed ${res.status}`);
        const data = await res.json();
        if (!data?.hotel) throw new Error('Hotel not found');
        const rooms = data.hotel.room_types || [];
        const idx = parseInt(roomIndex, 10);
        if (idx < 0 || idx >= rooms.length) throw new Error('Room not found');
        if (mounted) {
          setHotel(data.hotel);
          setRoom(rooms[idx]);
        }
      } catch (e) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [hotelId, roomIndex]);

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1rem' }}>
        {loading && <div>Loading room...</div>}
        {error && !loading && <div style={{ color: 'red' }}>Error: {error}</div>}
        {!loading && !error && room && (
          <>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.25rem', textAlign: 'center' }}>{room.room_name || room.type}</h1>
            {/* Photo Slider */}
            <RoomPhotoSlider images={(room.photos && room.photos.length ? room.photos : (hotel?.hotel_photos || [])).slice(0,20)} />
            <HotelRoomFeatures 
              room={room} 
              additionalServices={hotel?.additional_services || []} 
              restrictedServices={hotel?.restricted_services || []}
            />
          </>
        )}
      </div>
      <Footer_Combination />
    </div>
  );
}

export default RoomDetailsPage;

// --- Inline component for room photo slider ---
function RoomPhotoSlider({ images = [] }) {
  const [index, setIndex] = useState(0);
  const safeImages = images.filter(Boolean);

  const go = useCallback((dir) => {
    if (!safeImages.length) return;
    setIndex(i => (i + dir + safeImages.length) % safeImages.length);
  }, [safeImages.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [go]);

  if (!safeImages.length) {
    return (
      <div style={{ height: '320px', borderRadius: '16px', background: '#00A79D', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>No Photos</div>
    );
  }

  const mainSrc = typeof safeImages[index] === 'string' ? safeImages[index] : safeImages[index]?.url || safeImages[index];

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div style={{ position: 'relative', height: '320px', borderRadius: '16px', overflow: 'hidden', background: '#f1f5f9', boxShadow: '0 4px 18px rgba(0,0,0,0.07)' }}>
        <img src={mainSrc} alt={`Photo ${index+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity .5s ease' }} />
        {safeImages.length > 1 && (
          <>
            <button onClick={() => go(-1)} style={navBtnStyle('left')} aria-label="Previous image">&#10094;</button>
            <button onClick={() => go(1)} style={navBtnStyle('right')} aria-label="Next image">&#10095;</button>
          </>
        )}
        <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px' }}>
          {safeImages.map((_, i) => (
            <span key={i} style={{ width: i===index? '11px':'8px', height: i===index? '11px':'8px', borderRadius: '50%', background: i===index? '#00A79D':'rgba(255,255,255,0.7)', border: '2px solid white', cursor: 'pointer', boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }} onClick={() => setIndex(i)} />
          ))}
        </div>
      </div>
      {safeImages.length > 1 && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
          {safeImages.slice(0,10).map((img, i) => {
            const thumb = typeof img === 'string' ? img : img?.url || img;
            return (
              <div key={i} onClick={() => setIndex(i)} style={{ width: '90px', height: '60px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', border: i===index ? '2px solid #00A79D':'1px solid #e5e7eb', boxShadow: i===index? '0 2px 6px rgba(0,167,157,0.3)':'none' }}>
                <img src={thumb} alt={`Thumb ${i+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function navBtnStyle(side){
  return {
    position: 'absolute',
    top: '50%',
    [side]: '12px',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.45)',
    color: 'white',
    border: 'none',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(2px)',
    transition: 'background .25s',
  };
}