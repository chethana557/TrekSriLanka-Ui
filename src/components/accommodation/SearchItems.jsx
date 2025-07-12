import React, { useState } from 'react';
import { Box } from '@mui/material';
import BookingSearchForm from './BookingSearchForm.jsx';
import BookingSearchResults from './BookingSearchResults.jsx';

// Mock database of properties
const mockProperties = [
  {
    id: 1,
    name: "Cinnamon Grand Colombo",
    type: "Hotel",
    location: "Colombo",
    rating: 4.5,
    reviews: 1250,
    price: 15500,
    originalPrice: 18000,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    amenities: ['Wifi', 'Pool', 'Restaurant', 'Parking', 'Gym', 'Spa'],
    description: "Luxury hotel in the heart of Colombo with world-class amenities and service.",
    discount: 14,
    featured: true,
    availableDates: ['2025-02-20', '2025-02-21', '2025-02-22', '2025-03-01']
  },
  {
    id: 2,
    name: "Heritance Kandalama",
    type: "Resort",
    location: "Dambulla",
    rating: 4.8,
    reviews: 890,
    price: 22000,
    originalPrice: 25000,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    amenities: ['Wifi', 'Pool', 'Restaurant', 'Spa'],
    description: "Eco-luxury resort overlooking Kandalama Lake with stunning architecture.",
    discount: 12,
    featured: false,
    availableDates: ['2025-02-20', '2025-02-25', '2025-03-01', '2025-03-15']
  },
  {
    id: 3,
    name: "Villa Bentota Beach",
    type: "Villa",
    location: "Bentota",
    rating: 4.2,
    reviews: 340,
    price: 8500,
    originalPrice: 10000,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
    amenities: ['Wifi', 'Pool', 'Parking'],
    description: "Private beachfront villa perfect for families and groups.",
    discount: 15,
    featured: false,
    availableDates: ['2025-02-20', '2025-02-21', '2025-02-28', '2025-03-10']
  },
  {
    id: 4,
    name: "Tea Gardens Homestay",
    type: "Homestay",
    location: "Ella",
    rating: 4.6,
    reviews: 567,
    price: 3500,
    originalPrice: 4000,
    image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=400&h=300&fit=crop",
    amenities: ['Wifi', 'Restaurant'],
    description: "Authentic Sri Lankan experience among the tea plantations.",
    discount: 13,
    featured: true,
    availableDates: ['2025-02-20', '2025-02-22', '2025-03-01', '2025-03-05']
  },
  {
    id: 5,
    name: "Galle Fort Hotel",
    type: "Hotel",
    location: "Galle",
    rating: 4.4,
    reviews: 890,
    price: 12000,
    originalPrice: 14000,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
    amenities: ['Wifi', 'Restaurant', 'Parking'],
    description: "Historic boutique hotel within the UNESCO World Heritage Galle Fort.",
    discount: 14,
    featured: false,
    availableDates: ['2025-02-20', '2025-02-24', '2025-03-01', '2025-03-12']
  },
  {
    id: 6,
    name: "Sigiriya Rock Retreat",
    type: "Resort",
    location: "Sigiriya",
    rating: 4.7,
    reviews: 445,
    price: 18500,
    originalPrice: 21000,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    amenities: ['Wifi', 'Pool', 'Restaurant', 'Spa', 'Parking'],
    description: "Luxury resort with views of the iconic Sigiriya Rock Fortress.",
    discount: 12,
    featured: true,
    availableDates: ['2025-02-20', '2025-02-26', '2025-03-01', '2025-03-08']
  },
  {
    id: 7,
    name: "Colombo City Apartment",
    type: "Apartment",
    location: "Colombo",
    rating: 4.0,
    reviews: 234,
    price: 6500,
    originalPrice: 7500,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    amenities: ['Wifi', 'Parking'],
    description: "Modern apartment in the heart of Colombo with city views.",
    discount: 13,
    featured: false,
    availableDates: ['2025-02-20', '2025-02-23', '2025-03-01', '2025-03-07']
  },
  {
    id: 8,
    name: "Mirissa Beach Guesthouse",
    type: "Guesthouse",
    location: "Mirissa",
    rating: 4.3,
    reviews: 456,
    price: 4500,
    originalPrice: 5200,
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
    amenities: ['Wifi', 'Restaurant'],
    description: "Cozy guesthouse steps away from the beautiful Mirissa Beach.",
    discount: 13,
    featured: false,
    availableDates: ['2025-02-20', '2025-02-25', '2025-03-01', '2025-03-14']
  },
  {
    id: 9,
    name: "Nuwara Eliya Hill Country Cottage",
    type: "Cottage",
    location: "Nuwara Eliya",
    rating: 4.5,
    reviews: 321,
    price: 7800,
    originalPrice: 9000,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    amenities: ['Wifi', 'Restaurant', 'Parking'],
    description: "Charming cottage in the cool climate of Nuwara Eliya hill country.",
    discount: 13,
    featured: true,
    availableDates: ['2025-02-20', '2025-02-27', '2025-03-01', '2025-03-11']
  },
  {
    id: 10,
    name: "Anuradhapura Heritage Hotel",
    type: "Hotel",
    location: "Anuradhapura",
    rating: 4.1,
    reviews: 278,
    price: 9500,
    originalPrice: 11000,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    amenities: ['Wifi', 'Pool', 'Restaurant', 'Parking'],
    description: "Historic hotel near ancient ruins with traditional Sri Lankan architecture.",
    discount: 14,
    featured: false,
    availableDates: ['2025-02-20', '2025-02-28', '2025-03-01', '2025-03-16']
  }
];

function SearchItems() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentSearchParams, setCurrentSearchParams] = useState(null);

  // Function to filter properties based on search criteria
  const filterProperties = (searchParams) => {
    let filtered = [...mockProperties];

    // Filter by destination (location)
    if (searchParams.destination && searchParams.destination.trim() !== '') {
      const destination = searchParams.destination.toLowerCase().trim();
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(destination) ||
        property.name.toLowerCase().includes(destination)
      );
    }

    // Filter by accommodation type
    if (searchParams.accommodationType && searchParams.accommodationType !== 'All') {
      filtered = filtered.filter(property => 
        property.type === searchParams.accommodationType
      );
    }

    // Filter by check-in date availability
    if (searchParams.checkInDate) {
      filtered = filtered.filter(property => 
        property.availableDates.includes(searchParams.checkInDate)
      );
    }

    return filtered;
  };

  // Handle search function
  const handleSearch = async (searchParams) => {
    setIsLoading(true);
    setCurrentSearchParams(searchParams);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = filterProperties(searchParams);
      setSearchResults(results);
      setIsLoading(false);
      setHasSearched(true);
    }, 1000);
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
    </Box>
  );
}

export default SearchItems;