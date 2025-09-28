import React, { useState } from 'react';
import { Star, X, ChevronLeft, ChevronRight } from 'lucide-react';

function normalizeImages(images) {
  if (!images || images.length === 0) {
    return [];
  }
  return images.map((src, idx) => ({ id: idx + 1, src, alt: `Hotel photo ${idx + 1}` }));
}

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

function HotelGallerySection({ images = [], feedbackCount = 0 }) {
  const hotelImages = normalizeImages(images);
  const safeImages = hotelImages.length > 0 ? hotelImages : [
    { id: 1, src: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="%2300A79D"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="48" fill="white" font-family="Arial">No Photos</text></svg>', alt: 'No photos available' }
  ];
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // rating derived from feedbackCount (capped 0-5)
  const rating = Math.min(5, Math.max(0, Number(feedbackCount) || 0));
  // Dynamic photo counting
  const totalPhotos = hotelImages.length; // total real photos passed in
  const displayedPhotos = Math.min(4, safeImages.length); // how many we actually show in grid
  const remainingPhotos = Math.max(0, totalPhotos - displayedPhotos); // count for overlay (if any)

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openModal = (imageIndex) => {
    setCurrentImageIndex(imageIndex);
  if (safeImages[imageIndex]) setSelectedImage(safeImages[imageIndex]);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
  const nextIndex = (currentImageIndex + 1) % safeImages.length;
    setCurrentImageIndex(nextIndex);
  setSelectedImage(safeImages[nextIndex]);
  };

  const prevImage = () => {
  const prevIndex = (currentImageIndex - 1 + safeImages.length) % safeImages.length;
    setCurrentImageIndex(prevIndex);
  setSelectedImage(safeImages[prevIndex]);
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
            {safeImages[0] && (
              <img src={safeImages[0].src} alt={safeImages[0].alt} style={styles.image} />
            )}
          </div>
          
          {/* Small images grid */}
          <div style={styles.mobileSmallImagesGrid}>
            {safeImages.slice(1, 4).map((image, index) => (
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
                {index === 2 && remainingPhotos > 0 && (
                  <div style={styles.photoOverlay}>
                    + {remainingPhotos} Photos
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Bottom Section (rating only, reserve moved below rooms) */}
        <div style={styles.mobileBottomSection}>
          <div style={styles.ratingContainer}>
            <div style={styles.starsContainer}>{renderStars(rating)}</div>
            <span style={styles.ratingText}>{rating.toFixed(1)}</span>
          </div>
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
          {safeImages[0] && <img src={safeImages[0].src} alt={safeImages[0].alt} style={styles.image} />}
        </div>
        
        {/* Top right image */}
        <div 
          style={styles.topRightImage}
          onClick={() => openModal(1)}
          onMouseEnter={(e) => handleImageHover(e, true)}
          onMouseLeave={(e) => handleImageHover(e, false)}
        >
          {safeImages[1] && <img src={safeImages[1].src} alt={safeImages[1].alt} style={styles.image} />}
        </div>
        
        {/* Bottom right images */}
        <div style={styles.bottomRightGrid}>
          <div 
            style={styles.smallImage}
            onClick={() => openModal(2)}
            onMouseEnter={(e) => handleImageHover(e, true)}
            onMouseLeave={(e) => handleImageHover(e, false)}
          >
            {safeImages[2] && <img src={safeImages[2].src} alt={safeImages[2].alt} style={styles.image} />}
          </div>
          
          <div 
            style={styles.smallImage}
            onClick={() => openModal(3)}
            onMouseEnter={(e) => handleImageHover(e, true)}
            onMouseLeave={(e) => handleImageHover(e, false)}
          >
            {safeImages[3] && <img src={safeImages[3].src} alt={safeImages[3].alt} style={styles.image} />}
            {remainingPhotos > 0 && (
              <div style={styles.photoOverlay}>
                + {remainingPhotos} Photos
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rating Section (reserve button relocated beneath room types) */}
      <div style={styles.bottomSection}>
        <div style={styles.ratingContainer}>
          <div style={styles.starsContainer}>{renderStars(rating)}</div>
          <span style={styles.ratingText}>{rating.toFixed(1)}</span>
        </div>
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