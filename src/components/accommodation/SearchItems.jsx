import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import BookingSearchForm from './BookingSearchForm.jsx';
import BookingSearchResults from './BookingSearchResults.jsx';

// Backend base URL
const API_BASE_URL = 'http://localhost:8000/api/v1';

// Transform a hotel document from backend into the shape expected by the search results component
function mapHotelToProperty(hotel) {
  // Derive a representative price (min price in price_range or first room type)
  let price = null;
  if (hotel.price_range && hotel.price_range.min_price) {
    price = hotel.price_range.min_price;
  } else if (hotel.room_types && hotel.room_types.length > 0) {
    const firstRoom = hotel.room_types[0];
    price = firstRoom.price_per_night || null;
  }
  return {
    id: hotel.hotel_id,
    name: hotel.hotel_name,
    type: hotel.accommodation_type || 'Hotel',
    location: hotel.city || '',
    rating: hotel.average_rating || 0, // placeholder if rating aggregation added later
    reviews: hotel.feedback_count || 0, // may enrich later
    price: price || 0,
    originalPrice: price || 0,
    image: (hotel.hotel_photos && hotel.hotel_photos[0]) || '',
    amenities: (hotel.most_popular_facilities || []).map(f => f.name || f),
    description: hotel.hotel_description || '',
    discount: 0,
    featured: false,
    availableDates: [] // real availability not yet integrated here
  };
}

function SearchItems() {
  const [allProperties, setAllProperties] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentSearchParams, setCurrentSearchParams] = useState(null);
  const [initialLoadError, setInitialLoadError] = useState('');

  // Fetch hotels once on mount
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setIsLoading(true);
        setInitialLoadError('');
        const res = await fetch(`${API_BASE_URL}/hotels?is_active=true&is_verified=true`);
        if (!res.ok) throw new Error('Failed to load hotels');
        const data = await res.json();
        const mapped = (data.hotels || []).map(mapHotelToProperty);
        setAllProperties(mapped);
      } catch (e) {
        setInitialLoadError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotels();
  }, []);

  // Filter properties based on search criteria
  const filterProperties = (searchParams) => {
    let filtered = [...allProperties];
    if (searchParams.destination && searchParams.destination.trim() !== '') {
      const destination = searchParams.destination.toLowerCase().trim();
      filtered = filtered.filter(p =>
        (p.location && p.location.toLowerCase().includes(destination)) ||
        (p.name && p.name.toLowerCase().includes(destination))
      );
    }
    if (searchParams.accommodationType && searchParams.accommodationType !== 'All') {
      filtered = filtered.filter(p => p.type === searchParams.accommodationType);
    }
    // Availability filtering placeholder (no dates yet)
    return filtered;
  };

  const handleSearch = async (searchParams) => {
    setIsLoading(true);
    setCurrentSearchParams(searchParams);
    const results = filterProperties(searchParams);
    // Small delay removed for responsiveness
    setSearchResults(results);
    setIsLoading(false);
    setHasSearched(true);
  };

  const handleResetSearch = () => {
    setSearchResults([]);
    setHasSearched(false);
    setCurrentSearchParams(null);
    // Do not clear allProperties; keep cached
  };

  return (
    <Box>
      {/* Search Form */}
      <BookingSearchForm 
        onSearch={handleSearch}
        onReset={handleResetSearch}
        isLoading={isLoading}
      />
      
      {/* Search Results */}
      {hasSearched && (
        <BookingSearchResults
          searchResults={searchResults}
          searchParams={currentSearchParams}
          loading={isLoading}
          onNewSearch={handleResetSearch}
        />
      )}
      {/* Optional: show error on initial load */}
      {initialLoadError && !hasSearched && (
        <div style={{color:'red', textAlign:'center', marginTop:'1rem'}}>{initialLoadError}</div>
      )}
    </Box>
  );
}

export default SearchItems;