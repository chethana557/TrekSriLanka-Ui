import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';
import HotelMainSection from '../../components/others/HotelMainSection.jsx'
import HotelWelcomeSection from '../../components/others/HotelWelcomeSection.jsx'
import HotelGallerySection from '../../components/others/HotelGallerySection.jsx'
import HotelFacilitiesAndRooms from '../../components/others/HotelFacilitiesAndRooms.jsx';
import { BASE_URL } from '../../api';

function HotelDetailsPage() {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let mounted = true;
  // Scroll to top when hotelId changes
  try { window.scrollTo({ top: 0, behavior: 'instant' }); } catch { try { window.scrollTo(0,0); } catch {} }
    (async () => {
      try {
        setLoading(true);
        // Fetch hotel details and stats in parallel
        const [hotelRes, statsRes] = await Promise.all([
          fetch(`${BASE_URL}/hotels/${hotelId}`),
          fetch(`${BASE_URL}/hotels/${hotelId}/stats`)
        ]);
        if (!hotelRes.ok) throw new Error(`Failed hotel ${hotelRes.status}`);
        const hotelData = await hotelRes.json();
        let statsData = null;
        if (statsRes.ok) {
          statsData = await statsRes.json();
        }
        if (mounted) {
          setHotel(hotelData.hotel);
          setStats(statsData);
        }
      } catch (e) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [hotelId]);

  return (
    <div className="landing-page">
      <Navbar />
      {loading && <div style={{ padding: '2rem', textAlign: 'center' }}>Loading hotel...</div>}
      {error && !loading && <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>Error: {error}</div>}
      {!loading && !error && hotel && (
        <>
          <HotelMainSection image={hotel.hotel_photos?.[0]} />
          <HotelWelcomeSection 
            destinationName={hotel.hotel_name}
            subtitle={hotel.hotel_address}
            description={[hotel.hotel_description]}
          />
          <HotelGallerySection images={hotel.hotel_photos || []} feedbackCount={stats?.feedback_count || 0} />
          <HotelFacilitiesAndRooms hotelId={hotelId} facilities={hotel.most_popular_facilities || []} rooms={hotel.room_types || []} />
        </>
      )}
      <Footer_Combination />
    </div>
  );
}

export default HotelDetailsPage;