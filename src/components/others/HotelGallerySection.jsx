import React, { useState } from 'react';
import { Star, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample hotel images (you can replace these with actual hotel images)
const hotelImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'Hotel terrace with ocean view'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'Luxury hotel lobby'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'Hotel bedroom'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'Hotel dining area'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    alt: 'Ocean view from hotel'
  }
];

const styles = {
  container: {
    padding: '2rem 1rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  galleryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    marginBottom: '2rem'
  },
  mainImage: {
    gridColumn: 'span 2',
    gridRow: 'span 2',
    height: '400px',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: '8px',
    transition: 'transform 0.3s ease'
  },
  topRightImage: {
    gridColumn: 'span 2',
    height: '195px',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: '8px',
    transition: 'transform 0.3s ease'
  },
  bottomRightGrid: {
    gridColumn: 'span 2',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px'
  },
  smallImage: {
    height: '190px',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: '8px',
    transition: 'transform 0.3s ease'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  photoOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.25rem',
    fontWeight: 'bold'
  },
  bottomSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  starsContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  star: {
    width: '24px',
    height: '24px'
  },
  starFilled: {
    color: '#FFD700',
    fill: '#FFD700'
  },
  starEmpty: {
    color: '#E5E7EB'
  },
  ratingText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#374151',
    marginLeft: '0.5rem'
  },
  reserveButton: {
    backgroundColor: '#00A79D',
    color: 'white',
    padding: '12px 32px',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '1.125rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: 'translateY(0)'
  },
  modal: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem'
  },
  modalButton: {
    position: 'absolute',
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    borderRadius: '50%',
    padding: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  },
  closeButton: {
    top: '1rem',
    right: '1rem'
  },
  prevButton: {
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  nextButton: {
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  modalImage: {
    maxWidth: '90vw',
    maxHeight: '90vh',
    objectFit: 'contain',
    borderRadius: '8px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
  },
  // Mobile responsive styles
  mobileGalleryGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '8px',
    marginBottom: '2rem'
  },
  mobileMainImage: {
    height: '250px',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: '8px',
    transition: 'transform 0.3s ease'
  },
  mobileSmallImagesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px'
  },
  mobileSmallImage: {
    height: '120px',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: '8px',
    transition: 'transform 0.3s ease'
  },
  mobileBottomSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem'
  }
};

function HotelGallerySection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const rating = 5.0;
  const totalPhotos = 40;

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openModal = (imageIndex) => {
    setCurrentImageIndex(imageIndex);
    setSelectedImage(hotelImages[imageIndex]);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % hotelImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(hotelImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + hotelImages.length) % hotelImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(hotelImages[prevIndex]);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          style={{
            ...styles.star,
            ...(i < fullStars ? styles.starFilled : styles.starEmpty)
          }}
        />
      );
    }
    return stars;
  };

  const handleImageHover = (e, isHovering) => {
    e.target.style.transform = isHovering ? 'scale(1.05)' : 'scale(1)';
  };

  const handleButtonHover = (e, isHovering) => {
    if (isHovering) {
      e.target.style.backgroundColor = '#008B7A';
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 4px 12px rgba(0, 167, 157, 0.3)';
    } else {
      e.target.style.backgroundColor = '#00A79D';
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = 'none';
    }
  };

  const handleModalButtonHover = (e, isHovering) => {
    e.target.style.backgroundColor = isHovering ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)';
  };

  if (isMobile) {
    return (
      <div style={styles.container}>
        {/* Mobile Gallery Grid */}
        <div style={styles.mobileGalleryGrid}>
          {/* Main large image */}
          <div 
            style={styles.mobileMainImage}
            onClick={() => openModal(0)}
            onMouseEnter={(e) => handleImageHover(e, true)}
            onMouseLeave={(e) => handleImageHover(e, false)}
          >
            <img
              src={hotelImages[0].src}
              alt={hotelImages[0].alt}
              style={styles.image}
            />
          </div>
          
          {/* Small images grid */}
          <div style={styles.mobileSmallImagesGrid}>
            {hotelImages.slice(1, 4).map((image, index) => (
              <div 
                key={image.id}
                style={styles.mobileSmallImage}
                onClick={() => openModal(index + 1)}
                onMouseEnter={(e) => handleImageHover(e, true)}
                onMouseLeave={(e) => handleImageHover(e, false)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  style={styles.image}
                />
                {index === 2 && (
                  <div style={styles.photoOverlay}>
                    + {totalPhotos} Photos
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Bottom Section */}
        <div style={styles.mobileBottomSection}>
          <div style={styles.ratingContainer}>
            <div style={styles.starsContainer}>
              {renderStars(rating)}
            </div>
            <span style={styles.ratingText}>
              {rating.toFixed(1)}
            </span>
          </div>
          <button 
            style={styles.reserveButton}
            onMouseEnter={(e) => handleButtonHover(e, true)}
            onMouseLeave={(e) => handleButtonHover(e, false)}
          >
            Reserve
          </button>
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            style={styles.modal}
            onClick={closeModal}
          >
            <button
              onClick={closeModal}
              style={{...styles.modalButton, ...styles.closeButton}}
              onMouseEnter={(e) => handleModalButtonHover(e, true)}
              onMouseLeave={(e) => handleModalButtonHover(e, false)}
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              style={{...styles.modalButton, ...styles.prevButton}}
              onMouseEnter={(e) => handleModalButtonHover(e, true)}
              onMouseLeave={(e) => handleModalButtonHover(e, false)}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              style={{...styles.modalButton, ...styles.nextButton}}
              onMouseEnter={(e) => handleModalButtonHover(e, true)}
              onMouseLeave={(e) => handleModalButtonHover(e, false)}
            >
              <ChevronRight size={24} />
            </button>

            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              onClick={(e) => e.stopPropagation()}
              style={styles.modalImage}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Desktop Gallery Grid */}
      <div style={styles.galleryGrid}>
        {/* Main large image */}
        <div 
          style={styles.mainImage}
          onClick={() => openModal(0)}
          onMouseEnter={(e) => handleImageHover(e, true)}
          onMouseLeave={(e) => handleImageHover(e, false)}
        >
          <img
            src={hotelImages[0].src}
            alt={hotelImages[0].alt}
            style={styles.image}
          />
        </div>
        
        {/* Top right image */}
        <div 
          style={styles.topRightImage}
          onClick={() => openModal(1)}
          onMouseEnter={(e) => handleImageHover(e, true)}
          onMouseLeave={(e) => handleImageHover(e, false)}
        >
          <img
            src={hotelImages[1].src}
            alt={hotelImages[1].alt}
            style={styles.image}
          />
        </div>
        
        {/* Bottom right images */}
        <div style={styles.bottomRightGrid}>
          <div 
            style={styles.smallImage}
            onClick={() => openModal(2)}
            onMouseEnter={(e) => handleImageHover(e, true)}
            onMouseLeave={(e) => handleImageHover(e, false)}
          >
            <img
              src={hotelImages[2].src}
              alt={hotelImages[2].alt}
              style={styles.image}
            />
          </div>
          
          <div 
            style={styles.smallImage}
            onClick={() => openModal(3)}
            onMouseEnter={(e) => handleImageHover(e, true)}
            onMouseLeave={(e) => handleImageHover(e, false)}
          >
            <img
              src={hotelImages[3].src}
              alt={hotelImages[3].alt}
              style={styles.image}
            />
            <div style={styles.photoOverlay}>
              + {totalPhotos} Photos
            </div>
          </div>
        </div>
      </div>

      {/* Rating and Reserve Section */}
      <div style={styles.bottomSection}>
        <div style={styles.ratingContainer}>
          <div style={styles.starsContainer}>
            {renderStars(rating)}
          </div>
          <span style={styles.ratingText}>
            {rating.toFixed(1)}
          </span>
        </div>

        <button 
          style={styles.reserveButton}
          onMouseEnter={(e) => handleButtonHover(e, true)}
          onMouseLeave={(e) => handleButtonHover(e, false)}
        >
          Reserve
        </button>
      </div>

      {/* Modal for enlarged images */}
      {selectedImage && (
        <div
          style={styles.modal}
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            style={{...styles.modalButton, ...styles.closeButton}}
            onMouseEnter={(e) => handleModalButtonHover(e, true)}
            onMouseLeave={(e) => handleModalButtonHover(e, false)}
          >
            <X size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            style={{...styles.modalButton, ...styles.prevButton}}
            onMouseEnter={(e) => handleModalButtonHover(e, true)}
            onMouseLeave={(e) => handleModalButtonHover(e, false)}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            style={{...styles.modalButton, ...styles.nextButton}}
            onMouseEnter={(e) => handleModalButtonHover(e, true)}
            onMouseLeave={(e) => handleModalButtonHover(e, false)}
          >
            <ChevronRight size={24} />
          </button>

          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClick={(e) => e.stopPropagation()}
            style={styles.modalImage}
          />
        </div>
      )}
    </div>
  );
}

export default HotelGallerySection;