import React, { useState } from 'react';
import { Box } from '@mui/material';
import TourSearchForm from './TourSearchForm.jsx';
import TourSearchResults from './TourSearchResults.jsx';

// Mock database of tour packages
const mockTourPackages = [
  {
    id: 1,
    name: "Cultural Triangle Explorer",
    type: "Cultural",
    location: "Kandy, Sigiriya, Anuradhapura",
    duration: "4-7 Days",
    rating: 4.8,
    reviews: 245,
    price: 85000,
    originalPrice: 95000,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    inclusions: ['Transport', 'Guide', 'Meals', 'Accommodation'],
    description: "Explore Sri Lanka's ancient kingdoms and UNESCO World Heritage sites including Sigiriya Rock Fortress.",
    discount: 11,
    featured: true,
    budget: '$1000-$2500',
    highlights: ['Sigiriya Rock', 'Temple of Tooth', 'Ancient Ruins', 'Local Cuisine']
  },
  {
    id: 2,
    name: "Hill Country Tea Trail",
    type: "Cultural",
    location: "Ella, Nuwara Eliya, Haputale",
    duration: "4-7 Days",
    rating: 4.6,
    reviews: 189,
    price: 65000,
    originalPrice: 75000,
    image: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?w=400&h=300&fit=crop",
    inclusions: ['Transport', 'Guide', 'Meals', 'Tea Factory Tours'],
    description: "Journey through misty mountains and lush tea plantations in Sri Lanka's cool hill country.",
    discount: 13,
    featured: false,
    budget: '$500-$1000',
    highlights: ['Nine Arch Bridge', 'Tea Plantations', 'Train Rides', 'Cool Climate']
  },
  {
    id: 3,
    name: "Adventure Safari & Beach",
    type: "Adventure",
    location: "Yala, Mirissa, Galle",
    duration: "4-7 Days",
    rating: 4.7,
    reviews: 312,
    price: 95000,
    originalPrice: 110000,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
    inclusions: ['Transport', 'Guide', 'Safari Jeep', 'Whale Watching'],
    description: "Wildlife safari in Yala National Park followed by whale watching and beach relaxation.",
    discount: 14,
    featured: true,
    budget: '$1000-$2500',
    highlights: ['Leopard Safari', 'Whale Watching', 'Beach Time', 'Galle Fort']
  },
  {
    id: 4,
    name: "Southern Coast Paradise",
    type: "Beach & Relaxation",
    location: "Unawatuna, Mirissa, Weligama",
    duration: "1-3 Days",
    rating: 4.4,
    reviews: 156,
    price: 35000,
    originalPrice: 40000,
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
    inclusions: ['Transport', 'Beach Activities', 'Surfing Lessons'],
    description: "Relax on pristine beaches, try surfing, and enjoy fresh seafood along the southern coast.",
    discount: 13,
    featured: false,
    budget: 'Under $500',
    highlights: ['Surfing', 'Beach Relaxation', 'Fresh Seafood', 'Sunset Views']
  },
  {
    id: 5,
    name: "Wildlife & Nature Expedition",
    type: "Wildlife Safari",
    location: "Yala, Udawalawe, Sinharaja",
    duration: "4-7 Days",
    rating: 4.9,
    reviews: 278,
    price: 120000,
    originalPrice: 135000,
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&h=300&fit=crop",
    inclusions: ['Transport', 'Expert Guide', 'Park Fees', 'Equipment'],
    description: "Ultimate wildlife experience across multiple national parks and rainforest reserves.",
    discount: 11,
    featured: true,
    budget: '$2500-$5000',
    highlights: ['Leopards', 'Elephants', 'Rainforest Trek', 'Bird Watching']
  },
  {
    id: 6,
    name: "Colombo City Discovery",
    type: "City Tours",
    location: "Colombo",
    duration: "1-3 Days",
    rating: 4.2,
    reviews: 89,
    price: 25000,
    originalPrice: 30000,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    inclusions: ['Transport', 'Guide', 'Museum Tickets', 'Local Food'],
    description: "Explore the vibrant capital city with visits to markets, temples, and modern attractions.",
    discount: 17,
    featured: false,
    budget: 'Under $500',
    highlights: ['Pettah Market', 'Gangaramaya Temple', 'Colonial Buildings', 'Street Food']
  },
  {
    id: 7,
    name: "Mountain Trekking Adventure",
    type: "Mountain Trekking",
    location: "Adams Peak, Horton Plains",
    duration: "1-3 Days",
    rating: 4.5,
    reviews: 167,
    price: 45000,
    originalPrice: 50000,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    inclusions: ['Transport', 'Trekking Guide', 'Equipment', 'Permits'],
    description: "Challenge yourself with scenic mountain treks including the sacred Adams Peak pilgrimage.",
    discount: 10,
    featured: false,
    budget: 'Under $500',
    highlights: ['Adams Peak Summit', 'Worlds End', 'Cloud Forest', 'Sunrise Views']
  },
  {
    id: 8,
    name: "Culinary Journey",
    type: "Food & Wine",
    location: "Kandy, Galle, Colombo",
    duration: "4-7 Days",
    rating: 4.6,
    reviews: 134,
    price: 75000,
    originalPrice: 85000,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    inclusions: ['Transport', 'Cooking Classes', 'Market Tours', 'Meals'],
    description: "Discover authentic Sri Lankan flavors through cooking classes and local food experiences.",
    discount: 12,
    featured: true,
    budget: '$500-$1000',
    highlights: ['Cooking Classes', 'Spice Gardens', 'Local Markets', 'Traditional Meals']
  },
  {
    id: 9,
    name: "Photography Expedition",
    type: "Photography",
    location: "Ella, Sigiriya, Galle",
    duration: "1-2 Weeks",
    rating: 4.7,
    reviews: 98,
    price: 150000,
    originalPrice: 170000,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    inclusions: ['Transport', 'Photo Guide', 'Equipment', 'Workshops'],
    description: "Capture Sri Lanka's stunning landscapes and culture with professional photography guidance.",
    discount: 12,
    featured: false,
    budget: '$2500-$5000',
    highlights: ['Sunrise Shoots', 'Cultural Portraits', 'Landscape Photography', 'Wildlife Photos']
  },
  {
    id: 10,
    name: "Historical Heritage Tour",
    type: "Historical",
    location: "Polonnaruwa, Anuradhapura, Dambulla",
    duration: "4-7 Days",
    rating: 4.8,
    reviews: 203,
    price: 80000,
    originalPrice: 90000,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
    inclusions: ['Transport', 'Historian Guide', 'Site Tickets', 'Cultural Shows'],
    description: "Deep dive into Sri Lanka's rich history visiting ancient capitals and archaeological sites.",
    discount: 11,
    featured: true,
    budget: '$1000-$2500',
    highlights: ['Ancient Capitals', 'Buddhist Temples', 'Archaeological Sites', 'Cultural Heritage']
  }
];

function TourSearch() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentSearchParams, setCurrentSearchParams] = useState(null);

  // Function to filter tour packages based on search criteria
  const filterTourPackages = (searchParams) => {
    let filtered = [...mockTourPackages];

    // Filter by duration
    if (searchParams.duration && searchParams.duration !== 'None') {
      filtered = filtered.filter(tour => tour.duration === searchParams.duration);
    }

    // Filter by budget
    if (searchParams.budget && searchParams.budget !== 'None') {
      filtered = filtered.filter(tour => tour.budget === searchParams.budget);
    }

    // Filter by tour type
    if (searchParams.tourType && searchParams.tourType !== 'None') {
      filtered = filtered.filter(tour => tour.type === searchParams.tourType);
    }

    return filtered;
  };

  // Handle search function
  const handleSearch = async (searchParams) => {
    setIsLoading(true);
    setCurrentSearchParams(searchParams);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = filterTourPackages(searchParams);
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
      <TourSearchForm 
        onSearch={handleSearch}
        onReset={handleResetSearch}
        isLoading={isLoading}
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