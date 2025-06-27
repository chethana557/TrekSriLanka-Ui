import React from 'react';
import { Box, Typography } from '@mui/material';

function DestinationWelcomeSection({ 
  destinationName = "Sigiriya",
  subtitle = "The Majestic Rock Fortress",
  description = [],
  titleColor = '#00A79D'
}) {
  // Default description if none provided
  const defaultDescription = [
    "Sigiriya, also known as Lion Rock, is an ancient rock fortress located in the central Matale District near the town of Dambulla in the Central Province, Sri Lanka. The name refers to a site of historical and archaeological significance that is dominated by a massive column of rock nearly 200 metres (660 ft) high. According to the ancient Sri Lankan chronicle the Culavamsa, this site was selected by King Kassapa (477 – 495 CE) for his new capital. He decorated the sides of the rock with colorful frescoes, made gardens around the rock and built a gateway in the form of an enormous lion. The name of this place is derived from this structure —Sinhagiri, the Lion Rock. The capital and the royal palace was abandoned after the king's death. It was used as a Buddhist monastery until the 14th century. Sigiriya today is a UNESCO World Heritage Site. It is one of the best preserved examples of ancient urban planning.",
    "Built by king Kassyapa in the 5th century AD, Sigiriya served as a royal citadel before later becoming a Buddhist monastery. The fortress is famed for its advanced significance, breathtaking views, and remarkable appearance. The giant lion's paws that once formed the entrance to the summit, the Mirror Wall, once polished to reflect the king's image, still bears ancient inscriptions and poetry from visitors of centuries past.",
    "Visitors can ascend the rock via a series of staircases, passing through lush gardens and ancient ruins before reaching the top, where the foundations of the royal palace remain. The summit offers panoramic views of the surrounding forests and villages, making the climb a rewarding experience.",
    "Sigiriya is located near Dambulla and is easily accessible from major cities like Colombo and Kandy. Nearby attractions include the Dambulla Cave Temple, Pidurangala Rock, and Minneriya National Park, making it a perfect destination for history lovers and adventure seekers."
  ];

  const paragraphs = description.length > 0 ? description : defaultDescription;

  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          color: titleColor, 
          fontWeight: 'bold',
        }}
      >
        <span style={{ fontSize: '1.5em' }}>{destinationName}</span>
      </Typography>

      <Box sx={{ maxWidth: '1100px', mx: 'auto', px: 2 }}>
        <Typography 
          variant="body1" 
          align="center"
          sx={{ 
            fontSize: '2rem', 
            lineHeight: 2, 
            color: '#000000',
            fontWeight: 'bold',
            mb: 3
          }}
        >
          {subtitle}
        </Typography>
        
        {paragraphs.map((paragraph, index) => (
          <Typography 
            key={index}
            variant="body1" 
            align="justify"
            sx={{ 
              fontSize: '1rem', 
              lineHeight: 1.6, 
              color: '#333333',
              mb: index === paragraphs.length - 1 ? 0 : 2
            }}
          >
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export default DestinationWelcomeSection;