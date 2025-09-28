import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from '../../../components/adminPages/AdminNavBar.jsx';
import Footer_Combination from '../../../components/footerCombination/Footer_Combination.jsx';
import ChatbotWidget from '../../../components/chatBot/ChatbotWidget.jsx';
import { Tag, MapPin, Calendar, DollarSign, Clock, Info, Camera, X } from 'lucide-react';

// Reuse signup-like styles
const inputStyles = {
  width: '100%',
  paddingTop: '12px',
  paddingBottom: '12px',
  backgroundColor: '#f8f9fa',
  border: '1px solid #e9ecef',
  borderRadius: '25px',
  fontSize: '15px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  outline: 'none',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box'
};

const textareaStyles = {
  width: '100%',
  paddingTop: '12px',
  paddingBottom: '12px',
  paddingLeft: '16px',
  paddingRight: '16px',
  backgroundColor: '#f8f9fa',
  border: '1px solid #e9ecef',
  borderRadius: '25px',
  fontSize: '15px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  outline: 'none',
  transition: 'all 0.2s ease',
  boxSizing: 'border-box',
  resize: 'vertical',
  minHeight: '100px'
};

const labelStyles = {
  display: 'block',
  color: '#333',
  fontWeight: '500',
  marginBottom: '0.5rem',
  fontSize: '14px',
  fontFamily: 'system-ui, -apple-system, sans-serif'
};

const iconStyles = {
  position: 'absolute',
  left: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#00A79D',
  width: '18px',
  height: '18px'
};

const TextInput = ({ label, type = 'text', placeholder, value, onChange, helpText, icon: Icon }) => {
  const handleFocus = (e) => {
    e.target.style.borderColor = '#00A79D';
    e.target.style.boxShadow = '0 0 0 3px rgba(0, 167, 157, 0.1)';
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = '#e9ecef';
    e.target.style.boxShadow = 'none';
  };
  return (
    <div>
      <label style={labelStyles}>{label}</label>
      <div style={{ position: 'relative' }}>
        {Icon && <Icon style={iconStyles} />}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{ ...inputStyles, paddingLeft: Icon ? '45px' : inputStyles.paddingLeft || '16px' }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {helpText && (
        <p style={{ fontSize: '12px', color: '#666', marginTop: '0.25rem', marginLeft: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{helpText}</p>
      )}
    </div>
  );
};

const TextAreaInput = ({ label, placeholder, value, onChange, helpText, icon: Icon }) => {
  const handleFocus = (e) => {
    e.target.style.borderColor = '#00A79D';
    e.target.style.boxShadow = '0 0 0 3px rgba(0, 167, 157, 0.1)';
  };
  const handleBlur = (e) => {
    e.target.style.borderColor = '#e9ecef';
    e.target.style.boxShadow = 'none';
  };
  return (
    <div>
      <label style={labelStyles}>{label}</label>
      <div style={{ position: 'relative' }}>
        {Icon && <Icon style={iconStyles} />}
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{ ...textareaStyles, paddingLeft: Icon ? '45px' : textareaStyles.paddingLeft || '16px' }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {helpText && (
        <p style={{ fontSize: '12px', color: '#666', marginTop: '0.25rem', marginLeft: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{helpText}</p>
      )}
    </div>
  );
};

function AddDestinationPage() {
  const navigate = useNavigate();
  const fileInputRef = React.useRef(null);
  const [form, setForm] = useState({
    title: '',
    mini_caption: '',
    long_description: '',
    best_time_to_visit: '',
    how_to_get_there: '',
    entrance_fees: '',
  opening_hours: '',
    things_to_do: ''
  ,
  nearest_town: ''
  });
  const [photos, setPhotos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (field) => (e) => {
    if (errorMessage) setErrorMessage('');
    setForm({ ...form, [field]: e.target.value });
  };

  const canSubmit = () => {
    return (
      form.title.trim() &&
      form.mini_caption.trim() &&
      form.long_description.trim()
    );
  };

  const onFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setPhotos(files);
  };

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    // also clear the input if removing all
    if (fileInputRef.current && photos.length <= 1) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    if (!canSubmit()) {
      setErrorMessage('Please fill all required fields.');
      return;
    }
    const token = localStorage.getItem('access_token');
    if (!token) {
      setErrorMessage('Authentication required. Please login again.');
      return;
    }
    setIsLoading(true);
    try {
      // Build multipart form data for text + files
      const fd = new FormData();
      fd.append('title', form.title.trim());
      fd.append('mini_caption', form.mini_caption.trim());
      fd.append('long_description', form.long_description.trim());
      fd.append('best_time_to_visit', form.best_time_to_visit.trim());
      fd.append('how_to_get_there', form.how_to_get_there.trim());
      fd.append('entrance_fees', form.entrance_fees.trim());
      fd.append('opening_hours', form.opening_hours.trim());
      fd.append('things_to_do', form.things_to_do.trim());
  fd.append('nearest_town', form.nearest_town.trim());
      photos.forEach((file) => fd.append('photos', file));
      
      const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const res = await fetch(`${base}/api/v1/destinations/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: fd
      });
      if (!res.ok) {
        let message = 'Failed to create destination';
        try {
          const data = await res.json();
          if (Array.isArray(data?.detail)) {
            message = data.detail.map((d) => d.msg || d.message || JSON.stringify(d)).join('\n');
          } else if (typeof data?.detail === 'string') {
            message = data.detail;
          }
        } catch (_) {
          // ignore
        }
        throw new Error(message);
      }
      navigate('/admin/destinations');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to create destination');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AdminNavBar />
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#00A79D', margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Add New Destination
            </h1>
            <p style={{ color: '#666', fontSize: '15px', marginTop: '6px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Create a new tourist destination with detailed information and photos.
            </p>
          </div>

          {errorMessage && (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '12px 16px', color: '#dc2626', fontSize: '14px', fontFamily: 'system-ui, -apple-system, sans-serif', marginBottom: '1rem' }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextInput 
              label="Destination Title *" 
              value={form.title} 
              onChange={onChange('title')} 
              placeholder="Enter destination title" 
              icon={Tag} 
            />
            <TextInput 
              label="Mini Caption *" 
              value={form.mini_caption} 
              onChange={onChange('mini_caption')} 
              placeholder="Short description/caption" 
              icon={Info} 
            />
            <TextAreaInput 
              label="Long Description *" 
              value={form.long_description} 
              onChange={onChange('long_description')} 
              placeholder="Detailed description of the destination" 
              icon={MapPin} 
            />
            <TextInput 
              label="Best Time to Visit" 
              value={form.best_time_to_visit} 
              onChange={onChange('best_time_to_visit')} 
              placeholder="e.g., February to April" 
              icon={Calendar} 
            />
            <TextInput 
              label="Nearest Town / City" 
              value={form.nearest_town} 
              onChange={onChange('nearest_town')} 
              placeholder="e.g., Galle, Kandy" 
              icon={MapPin} 
            />
            <TextInput 
              label="Opening Hours" 
              value={form.opening_hours} 
              onChange={onChange('opening_hours')} 
              placeholder="e.g., 7:00 AM to 5:30 PM" 
              icon={Clock} 
            />
            <TextInput 
              label="Entrance Fees" 
              value={form.entrance_fees} 
              onChange={onChange('entrance_fees')} 
              placeholder="e.g., $30 USD for foreigners" 
              icon={DollarSign} 
            />
            <TextAreaInput 
              label="How to Get There" 
              value={form.how_to_get_there} 
              onChange={onChange('how_to_get_there')} 
              placeholder="Transportation information" 
              icon={MapPin} 
            />
            <TextAreaInput 
              label="Things to Do" 
              value={form.things_to_do} 
              onChange={onChange('things_to_do')} 
              placeholder="List of activities and attractions" 
              icon={Info} 
            />

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={labelStyles}>Destination Photos ({photos.length} selected)</label>
                <button type="button" onClick={openFilePicker} style={{
                  backgroundColor: '#00A79D',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 16px',
                  fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  cursor: 'pointer'
                }}>Add Photos</button>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={onFilesChange} style={{ display: 'none' }} />
              
              {photos.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px', marginTop: '10px' }}>
                  {photos.map((photo, index) => (
                    <div key={index} style={{
                      position: 'relative',
                      height: '120px',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0',
                      overflow: 'hidden',
                      backgroundColor: '#fafafa'
                    }}>
                      <img src={URL.createObjectURL(photo)} alt={`photo-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button type="button" onClick={() => removePhoto(index)} style={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        background: 'rgba(0,0,0,0.6)',
                        border: 'none',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}>
                        <X size={14} color="#fff" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  border: '2px dashed #e0e0e0',
                  borderRadius: '8px',
                  padding: '2rem',
                  textAlign: 'center',
                  backgroundColor: '#fafafa',
                  marginTop: '10px'
                }}>
                  <Camera size={48} color="#ccc" style={{ marginBottom: '0.5rem' }} />
                  <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>No photos selected. Click "Add Photos" to upload destination images.</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!canSubmit() || isLoading}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: isLoading ? '#bdc3c7' : (canSubmit() ? '#00A79D' : '#cccccc'),
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '15px',
                fontWeight: '600',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                cursor: (!canSubmit() || isLoading) ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                marginTop: '0.5rem'
              }}
            >
              {isLoading ? 'Creating Destination...' : 'Create Destination'}
            </button>
          </form>
        </div>
      </div>
      <ChatbotWidget />
      <Footer_Combination />
    </div>
  );
}

export default AddDestinationPage;
