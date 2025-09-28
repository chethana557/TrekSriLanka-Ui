import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from '../../../components/adminPages/AdminNavBar.jsx';
import Footer_Combination from '../../../components/footerCombination/Footer_Combination.jsx';
import ChatbotWidget from '../../../components/chatBot/ChatbotWidget.jsx';
import { Camera, Tag, Info, MapPin, X } from 'lucide-react';

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

function AddMainCityPage() {
  const navigate = useNavigate();
  const fileInputRef = React.useRef(null);
  const [form, setForm] = React.useState({ title: '', mini_caption: '', long_description: '' });
  const [photos, setPhotos] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const onChange = (field) => (e) => {
    if (errorMessage) setErrorMessage('');
    setForm({ ...form, [field]: e.target.value });
  };

  const canSubmit = () => form.title.trim() && form.mini_caption.trim() && form.long_description.trim();

  const onFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setPhotos(files);
  };

  const openFilePicker = () => fileInputRef.current?.click();

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current && photos.length <= 1) fileInputRef.current.value = '';
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
      const fd = new FormData();
      fd.append('title', form.title.trim());
      fd.append('mini_caption', form.mini_caption.trim());
      fd.append('long_description', form.long_description.trim());
      photos.forEach((file) => fd.append('photos', file));
      const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const res = await fetch(`${base}/api/v1/main-cities/`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` }, body: fd });
      if (!res.ok) {
        let message = 'Failed to create main city';
        try { const data = await res.json(); if (typeof data?.detail === 'string') message = data.detail; } catch (_) {}
        throw new Error(message);
      }
      navigate('/admin/main-cities');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to create main city');
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
              Add New Main City
            </h1>
            <p style={{ color: '#666', fontSize: '15px', marginTop: '6px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Create a main city with title, mini caption, long description and photos.
            </p>
          </div>

          {errorMessage && (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '12px 16px', color: '#dc2626', fontSize: '14px', fontFamily: 'system-ui, -apple-system, sans-serif', marginBottom: '1rem' }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextInput label="City Title *" value={form.title} onChange={onChange('title')} placeholder="Enter city title" icon={Tag} />
            <TextInput label="City Mini Caption *" value={form.mini_caption} onChange={onChange('mini_caption')} placeholder="Short description/caption" icon={Info} />
            <TextAreaInput label="City Long Description *" value={form.long_description} onChange={onChange('long_description')} placeholder="Detailed description of the city" icon={MapPin} />

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={labelStyles}>City Photos ({photos.length} selected)</label>
                <button type="button" onClick={openFilePicker} style={{ backgroundColor: '#00A79D', color: 'white', border: 'none', borderRadius: '10px', padding: '10px 16px', fontWeight: 600, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', cursor: 'pointer' }}>Add Photos</button>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={onFilesChange} style={{ display: 'none' }} />

              {photos.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px', marginTop: '10px' }}>
                  {photos.map((photo, index) => (
                    <div key={index} style={{ position: 'relative', height: '120px', borderRadius: '8px', border: '1px solid #e0e0e0', overflow: 'hidden', backgroundColor: '#fafafa' }}>
                      <img src={URL.createObjectURL(photo)} alt={`photo-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button type="button" onClick={() => removePhoto(index)} style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <X size={14} color="#fff" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ border: '2px dashed #e0e0e0', borderRadius: '8px', padding: '2rem', textAlign: 'center', backgroundColor: '#fafafa', marginTop: '10px' }}>
                  <Camera size={48} color="#ccc" style={{ marginBottom: '0.5rem' }} />
                  <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>No photos selected. Click "Add Photos" to upload city images.</p>
                </div>
              )}
            </div>

            <button type="submit" disabled={!canSubmit() || isLoading} style={{ width: '100%', padding: '14px', backgroundColor: isLoading ? '#bdc3c7' : (canSubmit() ? '#00A79D' : '#cccccc'), color: 'white', border: 'none', borderRadius: '25px', fontSize: '15px', fontWeight: '600', fontFamily: 'system-ui, -apple-system, sans-serif', cursor: (!canSubmit() || isLoading) ? 'not-allowed' : 'pointer', transition: 'all 0.2s ease', marginTop: '0.5rem' }}>
              {isLoading ? 'Creating City...' : 'Create City'}
            </button>
          </form>
        </div>
      </div>
      <ChatbotWidget />
      <Footer_Combination />
    </div>
  );
}

export default AddMainCityPage;
