import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbars/Navbar.jsx';
import Footer_Combination from '../../components/footerCombination/Footer_Combination.jsx';
import DestinationMainSection from '../../components/destination/DestinationMainSection.jsx';
import { Box, Typography, Grid, Chip, Divider, CircularProgress, Button } from '@mui/material';
import SriLankaMap from '../../components/tourPackages/SriLankaMap.jsx';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckIcon from '@mui/icons-material/Check';
import { useCurrency } from '../../contexts/CurrencyContext.jsx';
import { LOCATION_COORDS, deriveKey } from '../../utils/locationData.js';

const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export default function TourPackageDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { format } = useCurrency();

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${base}/api/v1/tour-packages/${id}`);
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
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', height:'50vh' }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (error || !pkg) {
    return (
      <>
        <Navbar />
        <Box sx={{ maxWidth:1200, mx:'auto', p:4 }}>
          <Typography variant='h5' color='error' gutterBottom>{error || 'Package not found'}</Typography>
          <Button variant='outlined' onClick={()=>navigate(-1)}>Go Back</Button>
        </Box>
      </>
    );
  }

  const locations = Array.isArray(pkg.locations) ? pkg.locations : [];
  const mappedLocations = locations.map(name => {
    const key = deriveKey(name);
    const c = LOCATION_COORDS[key];
    return { name, ...(c || {}) };
  });
  const highlights = Array.isArray(pkg.highlights) ? pkg.highlights : [];
  const inclusions = Array.isArray(pkg.facilities) ? pkg.facilities : [];

  return (
    <>
      <Navbar />
      <DestinationMainSection image={pkg.photo} />
      <Box sx={{ maxWidth: 1200, mx:'auto', p:3 }}>
        <Typography variant='h4' sx={{ fontWeight:'bold', mb:2 }}>{pkg.title}</Typography>
        <Box sx={{ display:'flex', flexWrap:'wrap', gap:1.5, mb:2 }}>
          <Chip icon={<LocationOnIcon />} label={`${locations.length} locations`} />
          {pkg.day_count && <Chip icon={<ScheduleIcon />} label={`${pkg.day_count} Days`} />}
          {pkg.person_count && <Chip icon={<GroupIcon />} label={`${pkg.person_count} Persons`} />}
          {pkg.booking_count !== undefined && <Chip label={`${pkg.booking_count} Bookings`} />}
        </Box>
        <Typography variant='body1' sx={{ mb:3 }}>{pkg.short_description || pkg.description || ''}</Typography>
        <Divider sx={{ my:3 }} />
        {/* Highlights */}
        {highlights.length > 0 && (
          <Box sx={{ mb:4 }}>
            <Typography variant='h6' sx={{ fontWeight:'bold', mb:1 }}>Highlights</Typography>
            <Box sx={{ display:'flex', flexWrap:'wrap', gap:1 }}>
              {highlights.map((h,i)=>(
                <Chip key={i} label={h} size='small' sx={{ bgcolor:'#00A79D', color:'#fff', fontWeight:'bold', '& .MuiChip-label':{ fontWeight:'bold' } }} />
              ))}
            </Box>
          </Box>
        )}
        {/* Facilities / Inclusions */}
        {inclusions.length > 0 && (
          <Box sx={{ mb:4 }}>
            <Typography variant='h6' sx={{ fontWeight:'bold', mb:1 }}>Facilities</Typography>
            <Box sx={{ display:'flex', flexWrap:'wrap', gap:1 }}>
              {inclusions.map((inc,i)=>(
                <Chip key={i} label={inc} size='small' sx={{ bgcolor:'#00A79D', color:'#fff', fontWeight:'bold', '& .MuiChip-label':{ fontWeight:'bold' } }} />
              ))}
            </Box>
          </Box>
        )}
        {/* Locations Map */}
        {mappedLocations.length > 0 && (
          <Box sx={{ mb:5 }}>
            <Typography variant='h6' sx={{ fontWeight:'bold', mb:1 }}>Locations Map</Typography>
            <SriLankaMap locations={mappedLocations} height={500} drawRoute numbered />
            <Typography variant='caption' sx={{ mt:1, display:'block' }}>Marker coordinates are approximate; provide precise lat/lng in backend for accuracy.</Typography>
          </Box>
        )}
        {/* Overview */}
        {pkg.overview && (
          <Box sx={{ mb:5 }}>
            <Typography variant='h6' sx={{ fontWeight:'bold', mb:1 }}>Tour Overview</Typography>
            <Box
              sx={{
                p:2.5,
                border:'1px solid #e0e0e0',
                borderRadius:2,
                background:'#fafafa',
                fontSize:14,
                lineHeight:1.55,
                '& ul':{ pl:3, mb:1 },
                '& li':{ mb:0.5 },
                '& b,strong':{ color:'#007f78' }
              }}
              // Basic sanitization: strip script tags before dangerouslySetInnerHTML
              dangerouslySetInnerHTML={{ __html: String(pkg.overview).replace(/<script[^>]*>[\s\S]*?<\/script>/gi,'') }}
            />
          </Box>
        )}
        {/* Itinerary */}
        {pkg.itinerary && (
          <Box sx={{ mb:5 }}>
            <Typography variant='h6' sx={{ fontWeight:'bold', mb:1 }}>Itinerary</Typography>
            <Box
              sx={{
                p:2.5,
                border:'1px solid #e0e0e0',
                borderRadius:2,
                background:'#fff',
                fontSize:14,
                lineHeight:1.55,
                boxShadow:'0 2px 6px rgba(0,0,0,0.04)',
                '& ul':{ pl:3, mb:2 },
                '& li':{ mb:0.5 },
                '& b,strong':{ color:'#007f78' }
              }}
              dangerouslySetInnerHTML={{ __html: String(pkg.itinerary).replace(/<script[^>]*>[\s\S]*?<\/script>/gi,'') }}
            />
          </Box>
        )}
        {/* Pricing Section */}
        <Box sx={{
          mb:4,
            p:4,
            borderRadius:3,
            position:'relative',
            background:'linear-gradient(135deg, #E6FAF9 0%, #FFFFFF 60%)',
            border:'1px solid #c8ebe9',
            boxShadow:'0 4px 18px rgba(0,0,0,0.06)'
        }}>
          <Box sx={{ position:'absolute', inset:0, pointerEvents:'none', borderRadius:3,
            background:'radial-gradient(circle at 85% 15%, rgba(0,167,157,0.15), transparent 60%)' }} />
          <Typography variant='h6' sx={{ fontWeight:'bold', color:'#007f78', mb:1, position:'relative' }}>Pricing</Typography>
          {pkg.package_price && (
            <Typography variant='h4' sx={{ fontWeight:700, color:'#00A79D', lineHeight:1, position:'relative' }}>{format(pkg.package_price)}</Typography>
          )}
          {pkg.price_per_person && (
            <Typography variant='body2' sx={{ mt:1, position:'relative', fontWeight:500 }}>{format(pkg.price_per_person)} / person</Typography>
          )}
          {pkg.person_count && (
            <Typography variant='caption' sx={{ display:'block', mt:0.5, position:'relative' }}>{pkg.person_count} total persons</Typography>
          )}
          <Divider sx={{ my:2, borderColor:'rgba(0,167,157,0.25)', position:'relative' }} />
          <Button fullWidth variant='contained' sx={{
            bgcolor:'#00A79D',
            fontWeight:700,
            py:1.4,
            fontSize:16,
            borderRadius:2,
            letterSpacing:0.5,
            boxShadow:'0 4px 12px rgba(0,167,157,0.35)',
            '&:hover':{ bgcolor:'#008a82', boxShadow:'0 6px 16px rgba(0,167,157,0.45)' }
          }} onClick={()=>{
            const token = localStorage.getItem('access_token');
            if(!token){
              navigate('/login', { state:{ redirect: `/packages/${id}` } });
              return;
            }
            navigate('/booking', { state:{ packageId: pkg._id || pkg.id } });
          }}>Reserve Now</Button>
        </Box>
      </Box>
      <Footer_Combination />
    </>
  );
}
