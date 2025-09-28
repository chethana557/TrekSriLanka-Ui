import React, { useState, useEffect, useMemo } from 'react';
import { Box } from '@mui/material';
import TourSearchForm from './TourSearchForm.jsx';
import TourSearchResults from './TourSearchResults.jsx';

// Helper to normalize backend package to search card structure
function normalizePackage(p) {
  return {
    id: p._id || p.id,
    name: p.title,
    type: p.tour_type,
    location: Array.isArray(p.locations) ? p.locations.join(', ') : '',
    duration: `${p.day_count} Days`,
    day_count: p.day_count,
    rating: typeof p.rating === 'number' ? p.rating : 0,
    reviews: typeof p.booking_count === 'number' ? p.booking_count : 0, // treat booking_count as reviews metric
    price: p.price_per_person,
    originalPrice: p.package_price,
    package_price: p.package_price,
  person_count: p.person_count,
    image: p.photo || '/vite.svg',
    inclusions: Array.isArray(p.facilities) ? p.facilities : [],
    description: p.short_description || '',
    discount: null,
    featured: (p.status || '').toLowerCase() === 'active',
    budgetValue: p.package_price,
    highlights: Array.isArray(p.highlights) ? p.highlights : []
  };
}

function TourSearch() {
  const [allPackages, setAllPackages] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentSearchParams, setCurrentSearchParams] = useState(null);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  // Fetch packages from backend
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        setLoadingPackages(true);
        const res = await fetch(`${base}/api/v1/tour-packages/`);
        if (!res.ok) throw new Error('Failed to load tour packages');
        const data = await res.json();
  const arr = Array.isArray(data) ? data : [];
  // Keep only Active status packages
  const activeOnly = arr.filter(p => (p.status || '').toLowerCase() === 'active');
  const normalized = activeOnly.map(normalizePackage);
        if (active) setAllPackages(normalized);
      } catch (e) {
        if (active) setAllPackages([]);
      } finally {
        if (active) setLoadingPackages(false);
      }
    })();
    return () => { active = false; };
  }, [base]);

  // Predefined bucket ranges for duration (days) and budget (package price LKR)
  const durationBuckets = [
    { label: '1-3', min: 1, max: 3 },
    { label: '3-5', min: 3, max: 5 },
    { label: '5-8', min: 5, max: 8 },
    { label: '8+', min: 8, max: Infinity }
  ];
  const durationOptions = ['None', ...durationBuckets.map(b => b.label)];

  const budgetBuckets = [
    { label: '0-50000', min: 0, max: 50000 },
    { label: '50000-100000', min: 50000, max: 100000 },
    { label: '100000-150000', min: 100000, max: 150000 },
    { label: '150000+', min: 150000, max: Infinity }
  ];
  const budgetOptions = ['None', ...budgetBuckets.map(b => b.label)];

  const tourTypeOptions = useMemo(() => {
    const setVals = new Set();
    allPackages.forEach(p => { if (p.type) setVals.add(p.type); });
    return ['None', ...Array.from(setVals).sort()];
  }, [allPackages]);

  // Filtering logic: duration -> day_count, budget -> package_price, tourType -> type
  const filterTourPackages = (searchParams) => {
    let filtered = [...allPackages];
    // Duration bucket (day_count)
    if (searchParams.duration && searchParams.duration !== 'None') {
      const bucket = durationBuckets.find(b => b.label === searchParams.duration);
      if (bucket) {
        filtered = filtered.filter(t => typeof t.day_count === 'number' && t.day_count >= bucket.min && t.day_count < bucket.max);
      }
    }
    // Budget bucket (package_price)
    if (searchParams.budget && searchParams.budget !== 'None') {
      const bucket = budgetBuckets.find(b => b.label === searchParams.budget);
      if (bucket) {
        filtered = filtered.filter(t => typeof t.package_price === 'number' && t.package_price >= bucket.min && t.package_price < bucket.max);
      }
    }
    // Tour type exact match
    if (searchParams.tourType && searchParams.tourType !== 'None') {
      filtered = filtered.filter(t => t.type === searchParams.tourType);
    }
    return filtered;
  };

  // Handle search function
  const handleSearch = async (searchParams) => {
    setIsLoading(true);
    setCurrentSearchParams(searchParams);
    const results = filterTourPackages(searchParams);
    setSearchResults(results);
    setIsLoading(false);
    setHasSearched(true);
  };

  // Handle search reset
  const handleResetSearch = () => {
    setSearchResults([]);
    setHasSearched(false);
    setCurrentSearchParams(null);
    setIsLoading(false);
  };

  return (
    <Box>
      {/* Search Form */}
      <TourSearchForm 
  onSearch={handleSearch}
  onReset={handleResetSearch}
  isLoading={isLoading || loadingPackages}
  durationOptions={durationOptions}
  budgetOptions={budgetOptions}
  tourTypeOptions={tourTypeOptions}
      />
      
      {/* Search Results */}
      {hasSearched && (
        <TourSearchResults
          searchResults={searchResults}
          searchParams={currentSearchParams}
          loading={isLoading}
          onNewSearch={handleResetSearch}
        />
      )}
    </Box>
  );
}

export default TourSearch;