import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../api';

export default function HotelCreateForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hotel_name: '',
    hotel_address: '',
    hotel_description: '',
    contact_number: '',
    email: '',
    website: '',
  city: '',
  accommodation_type: '',
  additional_services: '',
  restricted_services: ''
  });
  const [showAccommodationMenu, setShowAccommodationMenu] = useState(false);
  const accommodationWrapperRef = useRef(null);

  const accommodationOptions = [
    'Hotel','Resort','Apartment','Villa','Guest House','Hostel','Boutique','Lodge'
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accommodationWrapperRef.current && !accommodationWrapperRef.current.contains(e.target)) {
        setShowAccommodationMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [facilities, setFacilities] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [hotelPhotos, setHotelPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: 'info', message: '' });
  const [showFacilityDialog, setShowFacilityDialog] = useState(false);
  const [showRoomDialog, setShowRoomDialog] = useState(false);

  const hotelFileInputRef = useRef(null);

  // Facility dialog state
  const [newFacility, setNewFacility] = useState({
    name: '',
    icon: ''
  });

  // Available facility icons
  const facilityIcons = [
    { value: '🏊‍♂️', label: '🏊‍♂️ Swimming Pool' },
    { value: '🍽️', label: '🍽️ Restaurant' },
    { value: '💪', label: '💪 Fitness Center' },
    { value: '🅿️', label: '🅿️ Parking' },
    { value: '📶', label: '📶 WiFi' },
    { value: '❄️', label: '❄️ Air Conditioning' },
    { value: '🧖‍♀️', label: '🧖‍♀️ Spa' },
    { value: '🏪', label: '🏪 Room Service' },
    { value: '🚗', label: '🚗 Airport Shuttle' },
    { value: '🏋️', label: '🏋️ Gym' },
    { value: '🍷', label: '🍷 Bar' },
    { value: '🎯', label: '🎯 Conference Room' },
    { value: '👨‍💼', label: '👨‍💼 Business Center' },
    { value: '🧺', label: '🧺 Laundry Service' },
    { value: '🛎️', label: '🛎️ Concierge' },
    { value: '🔥', label: '🔥 Fireplace' },
    { value: '🌿', label: '🌿 Garden' },
    { value: '🎪', label: '🎪 Kids Club' },
    { value: '🛁', label: '🛁 Jacuzzi' },
    { value: '🎮', label: '🎮 Game Room' }
  ];

  // Room type dialog state
  const [newRoomType, setNewRoomType] = useState({
    room_name: '',
    bed_count: 1,
    guest_count: 1,
    room_count: 1,
    available_facilities: [],
    price_per_night: '',
    room_size: '',
    photos: []
  });

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: 'info', message: '' }), 6000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    const requiredFields = [
      'hotel_name',
      'hotel_address', 
      'hotel_description',
      'contact_number',
      'email',
      'website',
      'city'
    ];
    
    // Check if all required form fields are filled
    const allFieldsFilled = requiredFields.every(field => 
      formData[field] && formData[field].trim() !== ''
    );
    
    // Check if at least one room type is added
    const hasRoomTypes = roomTypes.length > 0;
    
    // Check if at least one facility is added
    const hasFacilities = facilities.length > 0;
    
    // Check if hotel description is at least 10 characters
    const validDescription = formData.hotel_description && 
      formData.hotel_description.length >= 10;
    
    return allFieldsFilled && hasRoomTypes && hasFacilities && validDescription;
  };

  const handleAddFacility = () => {
    if (!newFacility.name.trim()) {
      showAlert('error', 'Facility name is required');
      return;
    }
    if (!newFacility.icon) {
      showAlert('error', 'Please select an icon');
      return;
    }

    setFacilities(prev => [...prev, { ...newFacility }]);
    setNewFacility({ name: '', icon: '' });
    setShowFacilityDialog(false);
    showAlert('success', 'Facility added successfully');
  };

  const handleRemoveFacility = (index) => {
    setFacilities(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddRoomType = () => {
    if (!newRoomType.room_name.trim()) {
      showAlert('error', 'Room name is required');
      return;
    }

    if (newRoomType.bed_count < 1 || newRoomType.guest_count < 1) {
      showAlert('error', 'Bed count and guest count must be at least 1');
      return;
    }

    setRoomTypes(prev => [...prev, { ...newRoomType }]);
    setNewRoomType({
      room_name: '',
      bed_count: 1,
      guest_count: 1,
      room_count: 1,
      available_facilities: [],
      price_per_night: '',
      room_size: '',
      photos: []
    });
    setShowRoomDialog(false);
    showAlert('success', 'Room type added successfully');
  };

  const handleRemoveRoomType = (index) => {
    setRoomTypes(prev => prev.filter((_, i) => i !== index));
  };

  const handleHotelPhotosChange = (e) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        showAlert('warning', `${file.name} is not a valid image file`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        showAlert('warning', `${file.name} is too large. Maximum size is 10MB`);
        return false;
      }
      return true;
    });

    setHotelPhotos(prev => [...prev, ...validFiles]);
  };

  const removeHotelPhoto = (index) => {
    setHotelPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleRoomPhotosChange = (files, roomIndex) => {
    const validFiles = Array.from(files).filter(file => {
      if (!file.type.startsWith('image/')) {
        showAlert('warning', `${file.name} is not a valid image file`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        showAlert('warning', `${file.name} is too large. Maximum size is 10MB`);
        return false;
      }
      return true;
    });

    setRoomTypes(prev => prev.map((room, index) => 
      index === roomIndex 
        ? { ...room, photos: [...room.photos, ...validFiles] }
        : room
    ));
  };

  const removeRoomPhoto = (roomIndex, photoIndex) => {
    setRoomTypes(prev => prev.map((room, index) => 
      index === roomIndex 
        ? { ...room, photos: room.photos.filter((_, i) => i !== photoIndex) }
        : room
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.hotel_name.trim() || !formData.hotel_address.trim() || !formData.hotel_description.trim()) {
      showAlert('error', 'Hotel name, address, and description are required');
      return;
    }

    if (roomTypes.length === 0) {
      showAlert('error', 'At least one room type is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Add basic hotel info
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add facilities and room types as JSON strings
      formDataToSend.append('most_popular_facilities', JSON.stringify(facilities));
      formDataToSend.append('room_types', JSON.stringify(roomTypes));
      // Transform services to JSON arrays (they will be overwritten if already appended above)
      if (formData.accommodation_type) {
        formDataToSend.set('accommodation_type', formData.accommodation_type);
      }
      const additionalServicesArray = formData.additional_services
        ? formData.additional_services.split(',').map(s => s.trim()).filter(Boolean)
        : [];
      const restrictedServicesArray = formData.restricted_services
        ? formData.restricted_services.split(',').map(s => s.trim()).filter(Boolean)
        : [];
      formDataToSend.append('additional_services', JSON.stringify(additionalServicesArray));
      formDataToSend.append('restricted_services', JSON.stringify(restrictedServicesArray));

      // Add hotel photos
      hotelPhotos.forEach(file => {
        formDataToSend.append('hotel_photos', file);
      });

      // Add room photos and create mapping
      const roomPhotosMapping = {};
      let photoIndex = 0;
      
      roomTypes.forEach((room) => {
        const roomPhotoIndices = [];
        room.photos.forEach(file => {
          formDataToSend.append('room_photos', file);
          roomPhotoIndices.push(photoIndex);
          photoIndex++;
        });
        if (roomPhotoIndices.length > 0) {
          roomPhotosMapping[room.room_name] = roomPhotoIndices;
        }
      });
      
      formDataToSend.append('room_photos_mapping', JSON.stringify(roomPhotosMapping));

      const response = await fetch(`${BASE_URL}/hotels/`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create hotel');
      }

      const result = await response.json();
      showAlert('success', `Hotel "${result.hotel_name}" submitted successfully! It will be reviewed and activated soon.`);
      
      // Keep loading animation and navigate to home after successful submission
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error('Error creating hotel:', error);
      showAlert('error', error.message || 'Failed to create hotel. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact Us Form Styles
  const containerStyle = {
    padding: '2rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const formContainerStyle = {
    maxWidth: '900px',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    padding: '2rem'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#00A79D',
    textAlign: 'left',
    marginBottom: '1.5rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const labelStyle = {
    display: 'block',
    color: '#333',
    fontWeight: '500',
    marginBottom: '0.5rem',
    fontSize: '14px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    backgroundColor: '#00A79D',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0, 167, 157, 0.3)',
    marginRight: '10px',
    marginBottom: '10px'
  };

  const chipStyle = {
    display: 'inline-block',
    backgroundColor: '#e9ecef',
    border: '1px solid #dee2e6',
    borderRadius: '16px',
    padding: '4px 12px',
    fontSize: '12px',
    margin: '4px',
    cursor: 'pointer'
  };

  const alertStyle = {
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '14px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = '#00A79D';
    e.target.style.boxShadow = '0 0 0 2px rgba(0, 167, 157, 0.1)';
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = '#e9ecef';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2 style={titleStyle}>Request to Add Your Hotel</h2>
        
        {alert.show && (
          <div style={{
            ...alertStyle,
            backgroundColor: alert.type === 'error' ? '#fee' : alert.type === 'success' ? '#efe' : '#eef',
            color: alert.type === 'error' ? '#c33' : alert.type === 'success' ? '#363' : '#336',
            border: `1px solid ${alert.type === 'error' ? '#fcc' : alert.type === 'success' ? '#cfc' : '#ccf'}`
          }}>
            {alert.message}
          </div>
        )}

        {isSubmitting && (
          <div style={{
            ...alertStyle,
            backgroundColor: '#e3f2fd',
            color: '#1976d2',
            border: '1px solid #bbdefb'
          }}>
            Submitting your hotel... Please wait.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Basic Hotel Information */}
          <div>
            <label style={labelStyle}>Hotel Name *</label>
            <input
              type="text"
              placeholder="Enter hotel name"
              value={formData.hotel_name}
              onChange={(e) => handleInputChange('hotel_name', e.target.value)}
              style={inputStyle}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Hotel Address *</label>
            <textarea
              placeholder="Enter full hotel address"
              value={formData.hotel_address}
              onChange={(e) => handleInputChange('hotel_address', e.target.value)}
              style={{...inputStyle, minHeight: '80px', resize: 'vertical'}}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Hotel Description *</label>
            <textarea
              placeholder="Describe your hotel, amenities, and what makes it special"
              value={formData.hotel_description}
              onChange={(e) => handleInputChange('hotel_description', e.target.value)}
              style={{...inputStyle, minHeight: '120px', resize: 'vertical'}}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
            <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
              {formData.hotel_description.length}/2000 characters (minimum 10)
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <label style={labelStyle}>Contact Number *</label>
              <input
                type="tel"
                placeholder="+1-555-123-4567"
                value={formData.contact_number}
                onChange={(e) => handleInputChange('contact_number', e.target.value)}
                style={inputStyle}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
            </div>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <label style={labelStyle}>Email *</label>
              <input
                type="email"
                placeholder="hotel@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={inputStyle}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <label style={labelStyle}>Website *</label>
              <input
                type="url"
                placeholder="https://www.yourhotel.com"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                style={inputStyle}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
            </div>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <label style={labelStyle}>City *</label>
              <input
                type="text"
                placeholder="City name"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                style={inputStyle}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
            </div>
          </div>

          {/* Accommodation & Services */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '250px', position: 'relative' }} ref={accommodationWrapperRef}>
              <label style={labelStyle}>Accommodation Type</label>
              <div
                role="button"
                tabIndex={0}
                onClick={() => setShowAccommodationMenu(o => !o)}
                onKeyDown={(e) => { if (e.key === 'Enter') setShowAccommodationMenu(o => !o); }}
                style={{
                  ...inputStyle,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}
              >
                <span style={{ color: formData.accommodation_type ? '#000' : '#666' }}>
                  {formData.accommodation_type || 'Select type'}
                </span>
                <span style={{ fontSize: '12px', marginLeft: '8px', transform: showAccommodationMenu ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▼</span>
              </div>
              {showAccommodationMenu && (
                <ul style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: '4px 0',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#ffffff',
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  zIndex: 20,
                  maxHeight: '240px',
                  overflowY: 'auto'
                }}>
                  {accommodationOptions.map(opt => (
                    <li
                      key={opt}
                      onClick={() => { handleInputChange('accommodation_type', opt); setShowAccommodationMenu(false); }}
                      style={{
                        padding: '8px 14px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        background: opt === formData.accommodation_type ? '#00A79D10' : 'transparent'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = opt === formData.accommodation_type ? '#00A79D20' : '#f1f3f5'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = opt === formData.accommodation_type ? '#00A79D10' : 'transparent'; }}
                    >
                      {opt}
                    </li>
                  ))}
                  {!accommodationOptions.length && (
                    <li style={{ padding: '8px 14px', fontSize: '13px', color: '#666' }}>No options</li>
                  )}
                </ul>
              )}
            </div>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <label style={labelStyle}>Additional Services (comma separated)</label>
              <input
                type="text"
                placeholder="e.g., Airport Pickup, Late Checkout"
                value={formData.additional_services}
                onChange={(e) => handleInputChange('additional_services', e.target.value)}
                style={inputStyle}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>Separated by commas</div>
            </div>
            <div style={{ flex: '1', minWidth: '250px' }}>
              <label style={labelStyle}>Restricted Services (comma separated)</label>
              <input
                type="text"
                placeholder="e.g., No Pets, No Smoking"
                value={formData.restricted_services}
                onChange={(e) => handleInputChange('restricted_services', e.target.value)}
                style={inputStyle}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
            </div>
          </div>

          {/* Facilities */}
          <div>
            <label style={labelStyle}>Popular Facilities *</label>
            <div style={{ marginBottom: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setShowFacilityDialog(true)}
                style={buttonStyle}
              >
                Add Facility
              </button>
            </div>
            <div>
              {facilities.map((facility, index) => (
                <span
                  key={index}
                  style={{...chipStyle, backgroundColor: '#e8f5e8'}}
                  onClick={() => handleRemoveFacility(index)}
                >
                  {facility.icon || '🏨'} {facility.name} ×
                </span>
              ))}
              {facilities.length === 0 && (
                <div style={{ fontSize: '14px', color: '#dc3545', fontStyle: 'italic' }}>
                  At least one facility is required. Click "Add Facility" to get started.
                </div>
              )}
            </div>
          </div>

          {/* Room Types */}
          <div>
            <label style={labelStyle}>Room Types *</label>
            <div style={{ marginBottom: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setShowRoomDialog(true)}
                style={buttonStyle}
              >
                Add Room Type
              </button>
            </div>
            <div>
              {roomTypes.map((room, index) => (
                <div key={index} style={{
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '8px',
                  backgroundColor: '#f8f9fa'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>{room.room_name}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        Rooms: {room.room_count} | Beds: {room.bed_count} | Guests: {room.guest_count}
                        {room.price_per_night && ` | $${room.price_per_night}/night`}
                        {room.room_size && ` | ${room.room_size}`}
                      </div>
                      {room.photos.length > 0 && (
                        <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                          Photos: {room.photos.length} uploaded
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveRoomType(index)}
                      style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              {roomTypes.length === 0 && (
                <div style={{ fontSize: '14px', color: '#dc3545', fontStyle: 'italic' }}>
                  At least one room type is required. Click "Add Room Type" to get started.
                </div>
              )}
            </div>
          </div>

          {/* Hotel Photos */}
          <div>
            <label style={labelStyle}>Hotel Photos</label>
            <input
              ref={hotelFileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleHotelPhotosChange}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              onClick={() => hotelFileInputRef.current?.click()}
              style={buttonStyle}
            >
              Upload Photos
            </button>
            <div>
              {hotelPhotos.map((file, index) => (
                <span
                  key={index}
                  style={{...chipStyle, backgroundColor: '#fff3cd'}}
                  onClick={() => removeHotelPhoto(index)}
                >
                  {file.name} ×
                </span>
              ))}
              {hotelPhotos.length > 0 && (
                <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                  {hotelPhotos.length} photo(s) selected
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid()}
              style={{
                ...buttonStyle,
                fontSize: '16px',
                padding: '14px 28px',
                opacity: (isSubmitting || !isFormValid()) ? 0.5 : 1,
                cursor: (isSubmitting || !isFormValid()) ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: (isSubmitting || !isFormValid()) ? '#999' : '#00A79D'
              }}
            >
              {isSubmitting && (
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid transparent',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}
                />
              )}
              {isSubmitting ? 'Submitting...' : 'Submit Hotel Details'}
            </button>
          </div>

          {/* CSS Animation for Spinner */}
                <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .facility-icon-dropdown {
            direction: ltr !important;
          }
          
          .facility-icon-dropdown option {
            direction: ltr;
            text-align: left;
          }
        `}
      </style>
        </form>

        {/* Facility Dialog */}
        {showFacilityDialog && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '10vh',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              width: '90%',
              maxWidth: '500px'
            }}>
              <h3 style={titleStyle}>Add Facility</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Facility Name *</label>
                  <input
                    type="text"
                    placeholder="e.g., Swimming Pool"
                    value={newFacility.name}
                    onChange={(e) => setNewFacility(prev => ({ ...prev, name: e.target.value }))}
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    required
                  />
                </div>
                <div>
                  <label style={labelStyle}>Icon *</label>
                  <select
                    value={newFacility.icon}
                    onChange={(e) => setNewFacility(prev => ({ ...prev, icon: e.target.value }))}
                    className="facility-icon-dropdown"
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 4 5\'><path fill=\'%23666\' d=\'M2 0L0 2h4zm0 5L0 3h4z\'/></svg>")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                      backgroundSize: '12px'
                    }}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    required
                  >
                    <option value="">Select an icon</option>
                    {facilityIcons.map((iconOption) => (
                      <option key={iconOption.value} value={iconOption.value}>
                        {iconOption.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setShowFacilityDialog(false)}
                    style={{
                      ...buttonStyle,
                      backgroundColor: '#6c757d'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddFacility}
                    style={buttonStyle}
                  >
                    Add Facility
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Room Type Dialog */}
        {showRoomDialog && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              width: '90%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}>
              <h3 style={titleStyle}>Add Room Type</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={labelStyle}>Room Name *</label>
                  <input
                    type="text"
                    placeholder="e.g., Deluxe Suite"
                    value={newRoomType.room_name}
                    onChange={(e) => setNewRoomType(prev => ({ ...prev, room_name: e.target.value }))}
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Bed Count *</label>
                    <input
                      type="number"
                      min="1"
                      value={newRoomType.bed_count}
                      onChange={(e) => setNewRoomType(prev => ({ ...prev, bed_count: parseInt(e.target.value) || 1 }))}
                      style={inputStyle}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Guest Count *</label>
                    <input
                      type="number"
                      min="1"
                      value={newRoomType.guest_count}
                      onChange={(e) => setNewRoomType(prev => ({ ...prev, guest_count: parseInt(e.target.value) || 1 }))}
                      style={inputStyle}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Room Count *</label>
                    <input
                      type="number"
                      min="1"
                      value={newRoomType.room_count}
                      onChange={(e) => setNewRoomType(prev => ({ ...prev, room_count: parseInt(e.target.value) || 1 }))}
                      style={inputStyle}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Price per Night</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={newRoomType.price_per_night}
                      onChange={(e) => setNewRoomType(prev => ({ ...prev, price_per_night: e.target.value }))}
                      style={inputStyle}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Room Size</label>
                  <input
                    type="text"
                    placeholder="25 sqm"
                    value={newRoomType.room_size}
                    onChange={(e) => setNewRoomType(prev => ({ ...prev, room_size: e.target.value }))}
                    style={inputStyle}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                </div>
                
                {/* Room Photos Section */}
                <div>
                  <label style={labelStyle}>Room Photos ({newRoomType.photos.length})</label>
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.multiple = true;
                      input.onchange = (e) => {
                        const files = Array.from(e.target.files || []).filter(file => {
                          if (!file.type.startsWith('image/')) {
                            showAlert('warning', `${file.name} is not a valid image file`);
                            return false;
                          }
                          if (file.size > 10 * 1024 * 1024) { // 10MB limit
                            showAlert('warning', `${file.name} is too large. Maximum size is 10MB`);
                            return false;
                          }
                          return true;
                        });
                        setNewRoomType(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
                      };
                      input.click();
                    }}
                    style={{...buttonStyle, marginBottom: '0.5rem'}}
                  >
                    Add Photos
                  </button>
                  <div>
                    {newRoomType.photos.map((photo, index) => (
                      <span
                        key={index}
                        style={{...chipStyle, backgroundColor: '#fff3cd'}}
                        onClick={() => {
                          setNewRoomType(prev => ({
                            ...prev,
                            photos: prev.photos.filter((_, i) => i !== index)
                          }));
                        }}
                      >
                        {photo.name} ×
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setShowRoomDialog(false)}
                    style={{
                      ...buttonStyle,
                      backgroundColor: '#6c757d'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddRoomType}
                    style={buttonStyle}
                  >
                    Add Room Type
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
