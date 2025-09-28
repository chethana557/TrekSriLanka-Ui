import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from '../../../components/adminPages/AdminNavBar.jsx';
import Footer_Combination from '../../../components/footerCombination/Footer_Combination.jsx';
import ChatbotWidget from '../../../components/chatBot/ChatbotWidget.jsx';
import { Tag, MapPin, Calendar, DollarSign, Percent, Hash, X } from 'lucide-react';

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

function AddSeasonalOfferPage() {
  const navigate = useNavigate();
  const fileInputRef = React.useRef(null);
  const [form, setForm] = useState({
    title: '',
    locations: '',
    day_count: '',
    package_price: '',
    valid_date: '',
    off_percentage: ''
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
      form.locations.trim() &&
      Number(form.day_count) > 0 &&
      Number(form.package_price) >= 0 &&
      form.valid_date &&
      Number(form.off_percentage) >= 0 && Number(form.off_percentage) <= 100 &&
      photos.length === 4
    );
  };

  const onFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    const selected = files.slice(0, 4);
    setPhotos(selected);
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
      setErrorMessage('Please fill all required fields with valid values.');
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
      fd.append('locations', form.locations); // backend splits by comma
      fd.append('day_count', String(Number(form.day_count)));
      fd.append('package_price', String(Number(form.package_price)));
      fd.append('valid_date', form.valid_date);
      fd.append('off_percentage', String(Number(form.off_percentage)));
      photos.forEach((file) => fd.append('photos', file));
      const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const res = await fetch(`${base}/api/v1/seasonal-offers/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: fd
      });
      if (!res.ok) {
        let message = 'Failed to create offer';
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
      navigate('/admin/seasonal-offers');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to create offer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AdminNavBar />
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
        <div style={{ maxWidth: '600px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#00A79D', margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Add New Seasonal Offer
            </h1>
            <p style={{ color: '#666', fontSize: '15px', marginTop: '6px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Create a new seasonal promotion. Default status is pending.
            </p>
          </div>

          {errorMessage && (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '12px 16px', color: '#dc2626', fontSize: '14px', fontFamily: 'system-ui, -apple-system, sans-serif', marginBottom: '1rem' }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextInput label="Offer Title" value={form.title} onChange={onChange('title')} placeholder="Enter offer title" icon={Tag} />
            <TextInput label="Locations" value={form.locations} onChange={onChange('locations')} placeholder="Comma separated (e.g., Kandy, Ella, Mirissa)" helpText="Enter one or more locations, separated by commas." icon={MapPin} />
            <TextInput label="Day Count" type="number" value={form.day_count} onChange={onChange('day_count')} placeholder="Number of days" icon={Hash} />
            <TextInput label="Package Price" type="number" value={form.package_price} onChange={onChange('package_price')} placeholder="Total price" icon={DollarSign} />
            <TextInput label="Valid Date" type="date" value={form.valid_date} onChange={onChange('valid_date')} placeholder="" icon={Calendar} />
            <TextInput label="Off Percentage" type="number" value={form.off_percentage} onChange={onChange('off_percentage')} placeholder="0 - 100" icon={Percent} />

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={labelStyles}>Offer Photos ({photos.length}/4)</label>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: '10px' }}>
                {[0,1,2,3].map((i) => (
                  <div key={i} style={{
                    position: 'relative',
                    height: '90px',
                    borderRadius: '8px',
                    border: '1px dashed #e0e0e0',
                    overflow: 'hidden',
                    backgroundColor: '#fafafa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {photos[i] ? (
                      <>
                        <img src={URL.createObjectURL(photos[i])} alt={`photo-${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button type="button" onClick={() => removePhoto(i)} style={{
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
                      </>
                    ) : (
                      <span style={{ color: '#aaa', fontSize: '12px' }}>Photo {i+1}</span>
                    )}
                  </div>
                ))}
              </div>
              {photos.length !== 4 && (
                <p style={{ fontSize: '12px', color: '#d32f2f', marginTop: '6px' }}>Please select exactly 4 photos.</p>
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
              {isLoading ? 'Creating Offer...' : 'Create Offer'}
            </button>
          </form>
        </div>
      </div>
      <ChatbotWidget />
      <Footer_Combination />
    </div>
  );
}

export default AddSeasonalOfferPage;


