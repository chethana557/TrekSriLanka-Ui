import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import mapImage from '../assets/map.png';
import Kalpitiya from '../assets/kandy.png';
import Jaffna from '../assets/kandy.png';
import Bentota from '../assets/kandy.png';
import Trincomalee from '../assets/kandy.png';
import Mannar from '../assets/kandy.png';
import Anuradhapura from '../assets/kandy.png';
import Hikkaduwa from '../assets/kandy.png';
import Sigiriya from '../assets/kandy.png';
import Pasikuda from '../assets/kandy.png';
import Chilaw from '../assets/kandy.png';
import Kandy from '../assets/kandy.png';
import NuwaraEliya from '../assets/kandy.png';
import Ella from '../assets/kandy.png';
import Batticaloa from '../assets/kandy.png';
import ArugamBay from '../assets/kandy.png';
import Yala from '../assets/kandy.png';
import Negombo from '../assets/kandy.png';
import Mirissa from '../assets/kandy.png';
import Tangalle from '../assets/kandy.png';
import Galle from '../assets/kandy.png';
import Hambantota from '../assets/kandy.png';


// Sample destinations data
const destinations = [
  {
    id: 1,
    name: 'Mannar',
    position: { top: '18%', left: '22%' },
    description: 'Known for its pristine beaches and historic sites.',
    image: Mannar,
    details: 'Mannar is an island connected to mainland Sri Lanka by a causeway. Famous for Adam\'s Bridge and beautiful beaches.'
  },
  {
    id: 2,
    name: 'Anuradhapura',
    position: { top: '31%', left: '38%' },
    description: 'Ancient city with well-preserved ruins and sacred sites.',
    image: Anuradhapura,
    details: 'Anuradhapura is one of the ancient capitals of Sri Lanka, famous for its well-preserved ruins of an ancient Sri Lankan civilization.'
  },
  {
    id: 3,
    name: 'Trincomalee',
    position: { top: '34%', left: '55%' },
    description: 'Famous for natural harbor and beautiful beaches.',
    image: Trincomalee,
    details: 'Trincomalee is known for its deep-water natural harbor and picturesque beaches like Uppuveli and Nilaveli.'
  },
  {
    id: 4,
    name: 'Kalpitiya',
    position: { top: '34%', left: '12%' },
    description: 'Known for dolphin watching and kite surfing.',
    image: Kalpitiya,
    details: 'Kalpitiya is a peninsula set between the Puttalam lagoon and the Indian Ocean, famous for its marine sanctuary with dolphins, whales, and reef sharks.'
  },
  {
    id: 5,
    name: 'Sigiriya',
    position: { top: '37%', left: '45%' },
    description: 'Ancient rock fortress with spectacular views.',
    image: Sigiriya,
    details: 'Sigiriya is an ancient rock fortress and palace with remarkable frescoes, known as the 8th Wonder of the World by locals.'
  },
  {
    id: 6,
    name: 'Pasikuda',
    position: { top: '37%', left: '65%' },
    description: 'Beautiful bay with shallow waters and pristine beaches.',
    image: Pasikuda,
    details: 'Pasikuda is famous for its shallow coastline allowing visitors to walk far into the sea, perfect for swimming and diving.'
  },
  {
    id: 7,
    name: 'Chilaw',
    position: { top: '44%', left: '12%' },
    description: 'Coastal town known for fishing and coconut plantations.',
    image: Chilaw,
    details: 'Chilaw is a small town on the west coast of Sri Lanka known for fishing, coconut plantations, and the Munneswaram Temple.'
  },
  {
    id: 8,
    name: 'Kandy',
    position: { top: '51%', left: '42%' },
    description: 'Cultural capital featuring the Temple of the Tooth.',
    image: Kandy,
    details: 'Kandy is the cultural capital of Sri Lanka, home to the Temple of the Tooth Relic and surrounded by hills and tea plantations.'
  },
  {
    id: 9,
    name: 'Nuwara Eliya',
    position: { top: '58%', left: '50%' },
    description: 'Tea country with cool climate and colonial architecture.',
    image: NuwaraEliya,
    details: 'Nuwara Eliya is known as "Little England" for its cool climate and colonial architecture, famous for tea plantations and waterfalls.'
  },
  {
    id: 10,
    name: 'Ella',
    position: { top: '65%', left: '55%' },
    description: 'Mountain village with hiking trails and scenic views.',
    image: Ella,
    details: 'Ella is famous for its scenic railway, Nine Arch Bridge, and stunning views through Ella Gap. Popular for hiking and relaxation.'
  },
  {
    id: 11,
    name: 'Batticaloa',
    position: { top: '48%', left: '70%' },
    description: 'Eastern coastal city with lagoons and beaches.',
    image: Batticaloa,
    details: 'Batticaloa is known for its lagoons, beaches, and the famous "singing fish" - a natural phenomenon where fish make musical sounds at night.'
  },
  {
    id: 12,
    name: 'Arugam Bay',
    position: { top: '63%', left: '72%' },
    description: 'World-famous surfing destination.',
    image: ArugamBay,
    details: 'Arugam Bay is internationally renowned for surfing and is considered one of the top surf spots in the world.'
  },
  {
    id: 13,
    name: 'Yala',
    position: { top: '75%', left: '65%' },
    description: 'National park with the highest leopard density in the world.',
    image: Yala,
    details: 'Yala National Park has the highest density of leopards in the world and is home to elephants, sloth bears, and numerous bird species.'
  },
  {
    id: 14,
    name: 'Negombo',
    position: { top: '45%', left: '15%' },
    description: 'Beach town close to the airport with colonial influence.',
    image: Negombo,
    details: 'Negombo has a strong fishing industry and a beach that is a major tourist attraction. Known for its Dutch and Portuguese colonial history.'
  },
  {
    id: 15,
    name: 'Bentota',
    position: { top: '60%', left: '12%' },
    description: 'Resort town with golden beaches and water sports.',
    image: Bentota,
    details: 'Bentota is famous for its golden beaches, water sports, and Ayurvedic spa treatments. Paradise for beach lovers and water enthusiasts.'
  },
  {
    id: 16,
    name: 'Hambantota',
    position: { top: '78%', left: '60%' },
    description: 'Southern coastal city with wildlife parks.',
    image: Hambantota,
    details: 'Hambantota is known for its natural harbor, wildlife parks, and salt pans. Home to Bundala National Park, a haven for migratory birds.'
  },
  {
    id: 17,
    name: 'Galle',
    position: { top: '82%', left: '35%' },
    description: 'Historic fort city with Dutch colonial architecture.',
    image: Galle,
    details: 'Galle is famous for its Dutch colonial buildings, ancient Galle Fort (UNESCO World Heritage site), and beautiful beaches like Unawatuna.'
  },
  {
    id: 18,
    name: 'Tangalle',
    position: { top: '83%', left: '50%' },
    description: 'Coastal town with pristine beaches and lagoons.',
    image: Tangalle,
    details: 'Tangalle offers some of Sri Lanka\'s most unspoiled beaches with opportunities for diving, snorkeling, and watching sea turtles nest.'
  },
  {
    id: 19,
    name: 'Mirissa',
    position: { top: '85%', left: '43%' },
    description: 'Beach paradise and whale watching hotspot.',
    image: Mirissa,
    details: 'Mirissa is famous for whale watching, beautiful beaches, and nightlife. One of the best places to spot blue whales and sperm whales.'
  },
  {
    id: 20,
    name: 'Hikkaduwa',
    position: { top: '75%', left: '25%' },
    description: 'Beach town with coral sanctuary and vibrant nightlife.',
    image: Hikkaduwa,
    details: 'Hikkaduwa is known for its coral sanctuary, surfing spots, and vibrant beach atmosphere. Popular for its annual beach festival.'
  },
  {
    id: 21,
    name: 'Jaffna',
    position: { top: '2%', left: '28%' },
    description: 'Beach town with coral sanctuary and vibrant nightlife.',
    image: Jaffna,
    details: 'Hikkaduwa is known for its coral sanctuary, surfing spots, and vibrant beach atmosphere. Popular for its annual beach festival.'
  }
];

// Featured destination - could be updated dynamically but using Nine Arch Bridge as example
const featuredDestination = {
  name: 'Nine Arch Bridge',
  subtitle: 'A Timeless Marvel in Ella',
  description: 'The Nine Arches Bridge, located in Ella, Sri Lanka, is a stunning colonial-era railway bridge built entirely of stone and bricks without steel. Surrounded by lush greenery, it is a popular tourist attraction known for its picturesque views and architectural beauty.',
  image: 'https://via.placeholder.com/400x300' // Use actual bridge image in real implementation
};

function SriLankaExplorer() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  
  const handlePinClick = (destination) => {
    setSelectedDestination(destination);
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
          Explore <br />
          Sri Lanka Like <br />
          Never Before!
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
          uncover must-visit spots, local experiences, and insider travel tips—your next
          adventure starts here!
        </Typography>
      </Box>

        
        {/* Content area - either featured destination or selected destination */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          bgcolor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          p: 3
        }}>
          {selectedDestination ? (
            // Selected destination content
            <>
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ color: '#00A79D', fontWeight: 'bold', mb: 1 }}
              >
                {selectedDestination.name}
              </Typography>
              
              <Box 
                component="img"
                src={selectedDestination.image}
                alt={selectedDestination.name}
                sx={{
                  width: '100%',
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  mb: 2
                }}
              />
              
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedDestination.details}
              </Typography>
              
              {/* <Button 
                variant="outlined" 
                endIcon={<ArrowForwardIcon />}
                sx={{ 
                  alignSelf: 'flex-end',
                  color: '#00A79D',
                  borderColor: '#00A79D',
                  '&:hover': {
                    borderColor: '#00897B',
                    backgroundColor: 'rgba(0, 167, 157, 0.1)'
                  }
                }}
              >
                Explore More
              </Button> */}
            </>
          ) : (
            // Featured destination content
            <>
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ color: '#00A79D', fontWeight: 'bold', mb: 1 }}
              >
                {featuredDestination.name}
              </Typography>
              
              <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                {featuredDestination.subtitle}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                <Box 
                  component="img"
                  src={featuredDestination.image}
                  alt={featuredDestination.name}
                  sx={{
                    width: { xs: '100%', sm: '45%' },
                    height: { xs: '80px', sm: '240px' },
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
                
                <Box sx={{ width: { xs: '100%', sm: '55%' }, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {featuredDestination.description}
                  </Typography>
                  
                  <Button 
                    variant="outlined" 
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      alignSelf: 'flex-end',
                      marginTop: 'auto',
                      color: '#00A79D',
                      borderColor: '#00A79D',
                      '&:hover': {
                        borderColor: '#00897B',
                        backgroundColor: 'rgba(0, 167, 157, 0.1)'
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
              </Box>
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