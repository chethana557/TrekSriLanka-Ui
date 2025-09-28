import React, { useState } from 'react';
import { Box, Typography, Button, Chip, Card, CardContent } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import mapImage from '../../assets/common/map.png'; 

import Mannar from '../../assets/common/mannar2.jpg'; 
import Anuradhapura from '../../assets/common/anuradhapura2.png';
import Trincomalee from '../../assets/common/trincomalee2.png';
import Kalpitiya from '../../assets/common/kalpitiya2.jpg';
import Sigiriya from '../../assets/common/sigiriya2.jpg';
import Pasikuda from '../../assets/common/pasikuda2.jpg';
import Chilaw from '../../assets/common/chilaw2.jpg';
import Kandy from '../../assets/common/kandy2.jpg';
import NuwaraEliya from '../../assets/common/nuwaraeliya2.jpg';
import Ella from '../../assets/common/ella2.jpg';
import Batticaloa from '../../assets/common/batticaloa2.jpg';
import ArugamBay from '../../assets/common/arugambay2.webp';
import Yala from '../../assets/common/yala2.jpg';
import Negombo from '../../assets/common/negambo2.webp';
import Bentota from '../../assets/common/bentota2.jpg';
import Hambantota from '../../assets/common/hambantota2.jpg';
import Galle from '../../assets/common/galle2.webp';
import Tangalle from '../../assets/common/tangalle2.jpg';
import Mirissa from '../../assets/common/mirissa2.jpg';
import Hikkaduwa from '../../assets/common/hikkaduwa2.jpg';
import Jaffna from '../../assets/common/jaffna2.jpg';

const destinations = [
  {
    id: 1,
    name: 'Mannar',
    subtitle: 'A Coastal Paradise',
    position: { top: '18%', left: '22%' },
    description: 'Mannar is an island connected to mainland Sri Lanka by a causeway. Famous for Adam\'s Bridge and beautiful beaches, this historic location offers pristine shores and ancient sites that tell the story of Sri Lanka\'s maritime heritage.',
    image: Mannar,
    details: 'Mannar is an island connected to mainland Sri Lanka by a causeway. Famous for Adam\'s Bridge and beautiful beaches.',
    highlights: ['Adam\'s Bridge', 'Historic Sites', 'Pristine Beaches', 'Maritime Heritage'],
    bestTime: 'October to March',
    activities: ['Beach Walking', 'Historical Tours', 'Photography', 'Bird Watching']
  },
  {
    id: 2,
    name: 'Anuradhapura',
    subtitle: 'Ancient Capital of Kings',
    position: { top: '31%', left: '38%' },
    description: 'Anuradhapura is one of the ancient capitals of Sri Lanka, famous for its well-preserved ruins of an ancient Sri Lankan civilization. This UNESCO World Heritage site showcases magnificent stupas, ancient temples, and the sacred Bodhi Tree.',
    image: Anuradhapura,
    details: 'Anuradhapura is one of the ancient capitals of Sri Lanka, famous for its well-preserved ruins of an ancient Sri Lankan civilization.',
    highlights: ['UNESCO World Heritage', 'Sacred Bodhi Tree', 'Ancient Stupas', 'Buddhist Temples'],
    bestTime: 'November to March',
    activities: ['Temple Visits', 'Historical Tours', 'Cultural Exploration', 'Meditation']
  },
  {
    id: 3,
    name: 'Trincomalee',
    subtitle: 'Harbor of Natural Beauty',
    position: { top: '30%', left: '54%' },
    description: 'Trincomalee is known for its deep-water natural harbor and picturesque beaches like Uppuveli and Nilaveli. This coastal gem offers pristine waters, historical temples, and some of the finest whale watching opportunities in the region.',
    image: Trincomalee,
    details: 'Trincomalee is known for its deep-water natural harbor and picturesque beaches like Uppuveli and Nilaveli.',
    highlights: ['Natural Harbor', 'Uppuveli Beach', 'Nilaveli Beach', 'Whale Watching'],
    bestTime: 'April to September',
    activities: ['Beach Relaxation', 'Whale Watching', 'Snorkeling', 'Temple Visits']
  },
  {
    id: 4,
    name: 'Kalpitiya',
    subtitle: 'Marine Sanctuary Wonder',
    position: { top: '38%', left: '20%' },
    description: 'Kalpitiya is a peninsula set between the Puttalam lagoon and the Indian Ocean, famous for its marine sanctuary with dolphins, whales, and reef sharks. This pristine location offers world-class kite surfing and unforgettable marine wildlife encounters.',
    image: Kalpitiya,
    details: 'Kalpitiya is a peninsula set between the Puttalam lagoon and the Indian Ocean, famous for its marine sanctuary with dolphins, whales, and reef sharks.',
    highlights: ['Marine Sanctuary', 'Dolphin Watching', 'Kite Surfing', 'Reef Sharks'],
    bestTime: 'December to March',
    activities: ['Kite Surfing', 'Dolphin Watching', 'Snorkeling', 'Lagoon Tours']
  },
  {
    id: 5,
    name: 'Sigiriya',
    subtitle: 'The 8th Wonder of the World',
    position: { top: '37%', left: '45%' },
    description: 'Sigiriya is an ancient rock fortress and palace with remarkable frescoes, known as the 8th Wonder of the World by locals. This UNESCO World Heritage site rises dramatically from the central plains, offering breathtaking views and ancient architectural marvels.',
    image: Sigiriya,
    details: 'Sigiriya is an ancient rock fortress and palace with remarkable frescoes, known as the 8th Wonder of the World by locals.',
    highlights: ['Rock Fortress', 'Ancient Frescoes', 'UNESCO Heritage', 'Panoramic Views'],
    bestTime: 'January to March',
    activities: ['Rock Climbing', 'Photography', 'Historical Tours', 'Hiking']
  },
  {
    id: 6,
    name: 'Pasikuda',
    subtitle: 'Shallow Water Paradise',
    position: { top: '37%', left: '58%' },
    description: 'Pasikuda is famous for its shallow coastline allowing visitors to walk far into the sea, perfect for swimming and diving. This pristine bay offers crystal-clear waters, coral reefs, and some of the most beautiful sunrises on the eastern coast.',
    image: Pasikuda,
    details: 'Pasikuda is famous for its shallow coastline allowing visitors to walk far into the sea, perfect for swimming and diving.',
    highlights: ['Shallow Waters', 'Coral Reefs', 'Beautiful Sunrises', 'Clear Waters'],
    bestTime: 'April to September',
    activities: ['Swimming', 'Diving', 'Snorkeling', 'Beach Walking']
  },
  {
    id: 7,
    name: 'Chilaw',
    subtitle: 'Coastal Fishing Heritage',
    position: { top: '49%', left: '21%' },
    description: 'Chilaw is a small town on the west coast of Sri Lanka known for fishing, coconut plantations, and the Munneswaram Temple. This authentic coastal community offers glimpses into traditional Sri Lankan life and beautiful lagoon landscapes.',
    image: Chilaw,
    details: 'Chilaw is a small town on the west coast of Sri Lanka known for fishing, coconut plantations, and the Munneswaram Temple.',
    highlights: ['Fishing Industry', 'Coconut Plantations', 'Munneswaram Temple', 'Traditional Life'],
    bestTime: 'November to March',
    activities: ['Fishing Tours', 'Temple Visits', 'Cultural Tours', 'Lagoon Exploration']
  },
  {
    id: 8,
    name: 'Kandy',
    subtitle: 'Cultural Heart of Sri Lanka',
    position: { top: '51%', left: '42%' },
    description: 'Kandy is the cultural capital of Sri Lanka, home to the Temple of the Tooth Relic and surrounded by hills and tea plantations. This UNESCO World Heritage city offers rich cultural experiences, traditional arts, and stunning mountain scenery.',
    image: Kandy,
    details: 'Kandy is the cultural capital of Sri Lanka, home to the Temple of the Tooth Relic and surrounded by hills and tea plantations.',
    highlights: ['Temple of Tooth Relic', 'Cultural Capital', 'Tea Plantations', 'Traditional Arts'],
    bestTime: 'December to April',
    activities: ['Temple Visits', 'Cultural Shows', 'Tea Plantation Tours', 'Lake Walks']
  },
  {
    id: 9,
    name: 'Nuwara Eliya',
    subtitle: 'Little England in the Hills',
    position: { top: '58%', left: '50%' },
    description: 'Nuwara Eliya is known as "Little England" for its cool climate and colonial architecture, famous for tea plantations and waterfalls. This charming hill station offers misty mountains, pristine lakes, and the finest Ceylon tea experiences.',
    image: NuwaraEliya,
    details: 'Nuwara Eliya is known as "Little England" for its cool climate and colonial architecture, famous for tea plantations and waterfalls.',
    highlights: ['Cool Climate', 'Colonial Architecture', 'Tea Plantations', 'Waterfalls'],
    bestTime: 'December to March',
    activities: ['Tea Factory Tours', 'Hiking', 'Boating', 'Strawberry Picking']
  },
  {
    id: 10,
    name: 'Ella',
    subtitle: 'Mountain Village Paradise',
    position: { top: '65%', left: '55%' },
    description: 'Ella is famous for its scenic railway, Nine Arch Bridge, and stunning views through Ella Gap. This mountain village offers incredible hiking trails, misty mornings, and panoramic vistas that capture the essence of Sri Lanka\'s hill country.',
    image: Ella,
    details: 'Ella is famous for its scenic railway, Nine Arch Bridge, and stunning views through Ella Gap. Popular for hiking and relaxation.',
    highlights: ['Nine Arch Bridge', 'Scenic Railway', 'Ella Gap', 'Mountain Views'],
    bestTime: 'December to March',
    activities: ['Train Rides', 'Hiking', 'Photography', 'Relaxation']
  },
  {
    id: 11,
    name: 'Batticaloa',
    subtitle: 'City of Singing Fish',
    position: { top: '48%', left: '62%' },
    description: 'Batticaloa is known for its lagoons, beaches, and the famous "singing fish" - a natural phenomenon where fish make musical sounds at night. This eastern coastal city offers unique cultural experiences and pristine lagoon ecosystems.',
    image: Batticaloa,
    details: 'Batticaloa is known for its lagoons, beaches, and the famous "singing fish" - a natural phenomenon where fish make musical sounds at night.',
    highlights: ['Singing Fish', 'Lagoons', 'Beaches', 'Cultural Heritage'],
    bestTime: 'April to September',
    activities: ['Lagoon Tours', 'Beach Visits', 'Cultural Tours', 'Night Fishing']
  },
  {
    id: 12,
    name: 'Arugam Bay',
    subtitle: 'World-Class Surfing Haven',
    position: { top: '63%', left: '68%' },
    description: 'Arugam Bay is internationally renowned for surfing and is considered one of the top surf spots in the world. This laid-back coastal town offers perfect waves, vibrant beach culture, and stunning sunsets that attract surfers from around the globe.',
    image: ArugamBay,
    details: 'Arugam Bay is internationally renowned for surfing and is considered one of the top surf spots in the world.',
    highlights: ['World-Class Surfing', 'Perfect Waves', 'Beach Culture', 'Stunning Sunsets'],
    bestTime: 'April to September',
    activities: ['Surfing', 'Beach Relaxation', 'Sunset Watching', 'Yoga']
  },
  {
    id: 13,
    name: 'Yala',
    subtitle: 'Leopard Kingdom',
    position: { top: '78%', left: '65%' },
    description: 'Yala National Park has the highest density of leopards in the world and is home to elephants, sloth bears, and numerous bird species. This pristine wilderness offers incredible wildlife safaris and diverse ecosystems from coastal areas to dense jungle.',
    image: Yala,
    details: 'Yala National Park has the highest density of leopards in the world and is home to elephants, sloth bears, and numerous bird species.',
    highlights: ['Leopard Spotting', 'Elephant Herds', 'Sloth Bears', 'Bird Watching'],
    bestTime: 'February to June',
    activities: ['Wildlife Safari', 'Photography', 'Bird Watching', 'Nature Walks']
  },
  {
    id: 14,
    name: 'Negombo',
    subtitle: 'Gateway to Paradise',
    position: { top: '58%', left: '22%' },
    description: 'Negombo has a strong fishing industry and a beach that is a major tourist attraction. Known for its Dutch and Portuguese colonial history, this vibrant coastal town offers fresh seafood, traditional fishing boats, and beautiful beaches.',
    image: Negombo,
    details: 'Negombo has a strong fishing industry and a beach that is a major tourist attraction. Known for its Dutch and Portuguese colonial history.',
    highlights: ['Fishing Industry', 'Colonial History', 'Fresh Seafood', 'Beach Activities'],
    bestTime: 'December to March',
    activities: ['Fish Market Tours', 'Beach Activities', 'Boat Rides', 'Seafood Dining']
  },
  {
    id: 15,
    name: 'Bentota',
    subtitle: 'Golden Beach Paradise',
    position: {top: '75%', left: '25%' },
    description: 'Bentota is famous for its golden beaches, water sports, and Ayurvedic spa treatments. This tropical paradise offers perfect conditions for water skiing, windsurfing, and relaxation, making it a premier beach destination on the southern coast.',
    image: Bentota,
    details: 'Bentota is famous for its golden beaches, water sports, and Ayurvedic spa treatments. Paradise for beach lovers and water enthusiasts.',
    highlights: ['Golden Beaches', 'Water Sports', 'Ayurvedic Spas', 'River Activities'],
    bestTime: 'November to March',
    activities: ['Water Sports', 'Spa Treatments', 'River Safaris', 'Beach Relaxation']
  },
  {
    id: 16,
    name: 'Hambantota',
    subtitle: 'Natural Harbor Wonder',
    position: { top: '82%', left: '60%' },
    description: 'Hambantota is known for its natural harbor, wildlife parks, and salt pans. Home to Bundala National Park, a haven for migratory birds, this coastal city offers unique landscapes and diverse wildlife experiences.',
    image: Hambantota,
    details: 'Hambantota is known for its natural harbor, wildlife parks, and salt pans. Home to Bundala National Park, a haven for migratory birds.',
    highlights: ['Natural Harbor', 'Bundala National Park', 'Salt Pans', 'Migratory Birds'],
    bestTime: 'December to March',
    activities: ['Bird Watching', 'Safari Tours', 'Salt Pan Visits', 'Harbor Tours']
  },
  {
    id: 17,
    name: 'Galle',
    subtitle: 'UNESCO Heritage Fort City',
    position: { top: '91%', left: '35%' },
    description: 'Galle is famous for its Dutch colonial buildings, ancient Galle Fort (UNESCO World Heritage site), and beautiful beaches like Unawatuna. This historic city offers a perfect blend of colonial architecture, cultural heritage, and tropical beaches.',
    image: Galle,
    details: 'Galle is famous for its Dutch colonial buildings, ancient Galle Fort (UNESCO World Heritage site), and beautiful beaches like Unawatuna.',
    highlights: ['Galle Fort', 'Dutch Architecture', 'UNESCO Heritage', 'Unawatuna Beach'],
    bestTime: 'December to March',
    activities: ['Fort Walking', 'Historical Tours', 'Beach Visits', 'Shopping']
  },
  {
    id: 18,
    name: 'Tangalle',
    subtitle: 'Unspoiled Coastal Beauty',
    position: { top: '87%', left: '50%' },
    description: 'Tangalle offers some of Sri Lanka\'s most unspoiled beaches with opportunities for diving, snorkeling, and watching sea turtles nest. This pristine coastal town provides peaceful beaches, crystal-clear waters, and incredible marine biodiversity.',
    image: Tangalle,
    details: 'Tangalle offers some of Sri Lanka\'s most unspoiled beaches with opportunities for diving, snorkeling, and watching sea turtles nest.',
    highlights: ['Unspoiled Beaches', 'Sea Turtle Nesting', 'Marine Biodiversity', 'Crystal Waters'],
    bestTime: 'December to March',
    activities: ['Turtle Watching', 'Snorkeling', 'Diving', 'Beach Relaxation']
  },
  {
    id: 19,
    name: 'Mirissa',
    subtitle: 'Whale Watching Capital',
    position: { top: '90%', left: '43%' },
    description: 'Mirissa is famous for whale watching, beautiful beaches, and nightlife. One of the best places to spot blue whales and sperm whales, this tropical paradise offers stunning sunsets, vibrant beach culture, and unforgettable marine encounters.',
    image: Mirissa,
    details: 'Mirissa is famous for whale watching, beautiful beaches, and nightlife. One of the best places to spot blue whales and sperm whales.',
    highlights: ['Blue Whale Watching', 'Sperm Whales', 'Beach Nightlife', 'Stunning Sunsets'],
    bestTime: 'December to March',
    activities: ['Whale Watching', 'Beach Parties', 'Sunset Viewing', 'Swimming']
  },
  {
    id: 20,
    name: 'Hikkaduwa',
    subtitle: 'Coral Sanctuary Paradise',
    position: { top: '88%', left: '28%' },
    description: 'Hikkaduwa is known for its coral sanctuary, surfing spots, and vibrant beach atmosphere. This lively coastal town offers excellent snorkeling, colorful coral reefs, and a festive beach culture that comes alive during the annual beach festival.',
    image: Hikkaduwa,
    details: 'Hikkaduwa is known for its coral sanctuary, surfing spots, and vibrant beach atmosphere. Popular for its annual beach festival.',
    highlights: ['Coral Sanctuary', 'Surfing Spots', 'Beach Festival', 'Colorful Reefs'],
    bestTime: 'November to March',
    activities: ['Snorkeling', 'Surfing', 'Glass-Bottom Boat', 'Beach Festival']
  },
  {
    id: 21,
    name: 'Jaffna',
    subtitle: 'Northern Cultural Jewel',
    position: { top: '2%', left: '28%' },
    description: 'Jaffna is the cultural capital of northern Sri Lanka, known for its unique Tamil heritage, ancient temples, and distinctive cuisine. This historic city offers rich cultural experiences, traditional architecture, and a glimpse into the diverse cultural tapestry of Sri Lanka.',
    image: Jaffna,
    details: 'Jaffna is the cultural capital of northern Sri Lanka, known for its unique Tamil heritage, ancient temples, and distinctive cuisine.',
    highlights: ['Tamil Heritage', 'Ancient Temples', 'Traditional Cuisine', 'Cultural Diversity'],
    bestTime: 'December to March',
    activities: ['Cultural Tours', 'Temple Visits', 'Food Tours', 'Traditional Crafts']
  }
];

// Featured destination - could be updated dynamically but using Nine Arch Bridge as example
const featuredDestination = {
  name: 'Nine Arch Bridge',
  subtitle: 'A Timeless Marvel in Ella',
  description: 'The Nine Arches Bridge, located in Ella, Sri Lanka, is a stunning colonial-era railway bridge built entirely of stone and bricks without steel. Surrounded by lush greenery, it is a popular tourist attraction known for its picturesque views and architectural beauty.',
  image: Jaffna, // Use actual bridge image in real implementation
  highlights: ['Colonial Architecture', 'Stone & Brick Construction', 'Scenic Views', 'Photo Opportunities'],
  bestTime: 'December to March',
  activities: ['Photography', 'Train Spotting', 'Hiking', 'Sightseeing']
};

function SriLankaExplorer({ onSelect }) {
  const [selectedDestination, setSelectedDestination] = useState(destinations.find(dest => dest.name === 'Ella'));
  
  const handlePinClick = (destination) => {
    setSelectedDestination(destination);
    if (typeof onSelect === 'function') onSelect(destination.name);
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
    }}>
      {/* Left side - Title and Content Area */}
      <Box sx={{ 
        width: { xs: '100%', md: '50%' }, 
        p: 8,
        display: 'flex',
        flexDirection: 'column'
      }}>
      {/* Title section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          mb: 4,
          px: 2, // padding for small screens
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: '#00A79D',
            fontWeight: 'bold',
            fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
            lineHeight: 1.2,
          }}
        >
          Explore Sri Lanka Like<br />
            Never Before!<br />
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mt: 2,
            color: '#333',
            maxWidth: '600px',
            fontSize: { xs: '0.9rem', md: '1rem' },
          }}
        >
          Discover hidden gems and iconic landmarks across the island. Click on any city to
          uncover must-visit spots, local experiences, and insider travel tips - your next
          adventure starts here!
        </Typography>
      </Box>

        
        {/* Enhanced Content area */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'white',
          borderRadius: '16px',
          p: 4
        }}>
          {selectedDestination ? (
            // Enhanced selected destination content
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ color: '#00A79D', mr: 1 }} />
                <Typography 
                  variant="h4" 
                  component="h2" 
                  sx={{ color: '#00A79D', fontWeight: 'bold' }}
                >
                  {selectedDestination.name}
                </Typography>
              </Box>
              
              <Typography 
                variant="h6" 
                component="h3" 
                sx={{ mb: 3, color: '#666', fontStyle: 'italic' }}
              >
                {selectedDestination.subtitle}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mb: 3 }}>
                <Box 
                  component="img"
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  sx={{
                    width: { xs: '100%', sm: '50%' },
                    height: { xs: '200px', sm: '280px' },
                    objectFit: 'cover',
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
                  }}
                />
                
                <Box sx={{ width: { xs: '100%', sm: '50%' }, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {selectedDestination.description}
                  </Typography>
                  
                  <Card sx={{ mb: 2, bgcolor: '#f8f9fa', boxShadow: 'none' }}>
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#00A79D' }}>
                        Best Time to Visit
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {selectedDestination.bestTime}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
              
              {/* Activities Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#333', fontWeight: 'bold' }}>
                  Popular Activities
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selectedDestination.activities.map((activity, index) => (
                    <Chip
                      key={index}
                      label={activity}
                      variant="outlined"
                      sx={{
                        borderColor: '#00A79D',
                        color: '#00A79D',
                        '&:hover': {
                          bgcolor: 'rgba(0, 167, 157, 0.1)'
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
              
              {/* Plan Your Visit button removed per request */}
            </>
          ) : (
            // Enhanced featured destination content
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ color: '#00A79D', mr: 1 }} />
                <Typography 
                  variant="h4" 
                  component="h2" 
                  sx={{ color: '#00A79D', fontWeight: 'bold' }}
                >
                  {featuredDestination.name}
                </Typography>
              </Box>
              
              <Typography 
                variant="h6" 
                component="h3" 
                sx={{ mb: 3, color: '#666', fontStyle: 'italic' }}
              >
                {featuredDestination.subtitle}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mb: 3 }}>
                <Box 
                  component="img"
                  src={featuredDestination.image}
                  alt={featuredDestination.name}
                  sx={{
                    width: { xs: '100%', sm: '50%' },
                    height: { xs: '200px', sm: '280px' },
                    objectFit: 'cover',
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
                  }}
                />
                
                <Box sx={{ width: { xs: '100%', sm: '50%' }, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {featuredDestination.description}
                  </Typography>
                  
                  <Card sx={{ mb: 2, bgcolor: '#f8f9fa', boxShadow: 'none' }}>
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, color: '#00A79D' }}>
                        Best Time to Visit
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {featuredDestination.bestTime}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
              
              {/* Activities Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#333', fontWeight: 'bold' }}>
                  Popular Activities
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {featuredDestination.activities.map((activity, index) => (
                    <Chip
                      key={index}
                      label={activity}
                      variant="outlined"
                      sx={{
                        borderColor: '#00A79D',
                        color: '#00A79D',
                        '&:hover': {
                          bgcolor: 'rgba(0, 167, 157, 0.1)'
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
              
              {/* Plan Your Visit button removed per request */}
            </>
          )}
        </Box>
      </Box>
      
      {/* Right side - Map Area */}
      <Box sx={{ 
        width: { xs: '100%', md: '50%' },
        height: { xs: '50vh', md: '100vh' },
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Map image */}
        <Box 
          component="img"
          src={mapImage}
          alt="Sri Lanka Map"
          sx={{
            width: { xs: '100%', md: '90%' },
            maxWidth: 720, // maximum width in pixels
            height: 'auto',
            ml:10,
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
        
        {/* Map pins */}
        {destinations.map((destination) => (
          <Box
            key={destination.id}
            onClick={() => handlePinClick(destination)}
            sx={{
              position: 'absolute',
              top: destination.position.top,
              left: destination.position.left,
              width: '24px',
              height: '24px',
              backgroundColor: selectedDestination?.id === destination.id ? '#FFD700' : '#FF0000',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: selectedDestination?.id === destination.id ? '8px solid #FFD700' : '8px solid #FF0000'
              },
              '&:hover': {
                width: '28px',
                height: '28px',
                transition: 'all 0.2s ease'
              }
            }}
          />
        ))}
        
        {/* Location Labels */}
        {destinations.map((destination) => (
          <Typography
            key={`label-${destination.id}`}
            variant="subtitle2"
            sx={{
              position: 'absolute',
              top: `calc(${destination.position.top} + 12px)`,
              left: destination.position.left,
              transform: 'translate(-50%, 0)',
              color: selectedDestination?.id === destination.id ? '#000' : '#333',
              fontWeight: selectedDestination?.id === destination.id ? 'bold' : 'normal',
              fontSize: '0.75rem',
              textShadow: '0px 0px 2px #fff',
              pointerEvents: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            {destination.name}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export default SriLankaExplorer;