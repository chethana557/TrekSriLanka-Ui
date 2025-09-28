import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavBar from '../../../components/adminPages/AdminNavBar.jsx';
import Footer_Combination from '../../../components/footerCombination/Footer_Combination.jsx';
import ChatbotWidget from '../../../components/chatBot/ChatbotWidget.jsx';
import { Tag, MapPin, Calendar, DollarSign, Hash, X, Users } from 'lucide-react';
import { LOCATION_NAMES } from '../../../utils/locationData.js';

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

const SelectInput = ({ label, value, onChange, options, helpText, icon: Icon }) => {
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
        <select
          value={value}
          onChange={onChange}
          style={{ ...inputStyles, paddingLeft: Icon ? '45px' : inputStyles.paddingLeft || '16px' }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      {helpText && (
        <p style={{ fontSize: '12px', color: '#666', marginTop: '0.25rem', marginLeft: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>{helpText}</p>
      )}
    </div>
  );
};

function AddTourPackagePage() {
  const navigate = useNavigate();
  const fileInputRef = React.useRef(null);
  // Rich text templates (HTML) used as illustrative "text holders" for overview & itinerary
  const OVERVIEW_TEMPLATE = `
    <p><strong>Colombo</strong> – The bustling capital with colonial landmarks and vibrant markets.</p>
    <p><strong>Galle Face Green</strong> – A scenic oceanfront promenade in Colombo.</p>
    <p><strong>Gangaramaya Temple</strong> – A famous Buddhist temple in Colombo.</p>
    <p><strong>Anuradhapura</strong> – The first ancient capital with sacred stupas and ruins.</p>
    <p><strong>Jaya Sri Maha Bodhi</strong> – The world's oldest recorded tree in Anuradhapura.</p>
    <p><strong>Ruwanwelisaya Stupa</strong> – A magnificent Buddhist stupa in Anuradhapura.</p>
    <p><strong>Mihintale</strong> – The birthplace of Buddhism in Sri Lanka.</p>
    <p><strong>Sigiriya Rock Fortress</strong> – A UNESCO World Heritage site and royal palace.</p>
    <p><strong>Pidurangala Rock</strong> – A scenic hike near Sigiriya with panoramic views.</p>
    <p><strong>Dambulla Cave Temple</strong> – The largest and best-preserved cave temple in Sri Lanka.</p>
  `;
  const ITINERARY_TEMPLATE = `
    <p><strong>Day 1-2: Colombo</strong></p>
    <ul>
      <li>Arrival in Colombo, Sri Lanka's capital city.</li>
      <li>City tour covering historic landmarks, markets, and colonial architecture.</li>
      <li>Overnight stay in Colombo.</li>
    </ul>
    <p><strong>Day 3-4: Anuradhapura</strong></p>
    <ul>
      <li>Travel to the ancient kingdom of Anuradhapura.</li>
      <li>Visit sacred stupas, ancient monasteries, and the revered Sri Maha Bodhi tree.</li>
      <li>Explore Mihintale, the birthplace of Buddhism.</li>
    </ul>
    <p><strong>Day 5: Sigiriya</strong></p>
    <ul>
      <li>Climb the Sigiriya Rock Fortress, an ancient royal citadel.</li>
      <li>Explore the Dambulla Cave Temple with stunning Buddhist murals.</li>
    </ul>
    <p><strong>Day 6-7: Trincomalee</strong></p>
    <ul>
      <li>Relax on the pristine beaches of Trincomalee.</li>
      <li>Visit Koneswaram Temple, a revered Hindu site.</li>
      <li>Explore Fort Frederick.</li>
    </ul>
    <p><strong>Day 8-9: Jaffna</strong></p>
    <ul>
      <li>Discover unique northern culture and cuisine.</li>
      <li>Explore historic temples and landmarks.</li>
    </ul>
    <p><strong>Day 10: Kandy</strong></p>
    <ul>
      <li>Travel to the hill capital, Kandy.</li>
      <li>Visit the Temple of the Tooth Relic.</li>
      <li>Enjoy an evening cultural dance show.</li>
    </ul>
    <p><strong>Day 11: Return to Colombo</strong></p>
    <ul>
      <li>Travel back to Colombo for departure.</li>
      <li>Optional shopping & sightseeing before flight.</li>
    </ul>
  `;
  const [form, setForm] = useState({
    title: '',
    tour_type: '',
    day_count: '',
    person_count: '',
    price_per_person: '',
    package_price: '',
    short_description: '',
  overview: '',
  itinerary: '',
    highlights: '',
    facilities: ''
  });
  const [selectedLocations, setSelectedLocations] = useState([]); // array of display names
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [locationQuery, setLocationQuery] = useState('');
  const locationBoxRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (locationBoxRef.current && !locationBoxRef.current.contains(e.target)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  const [photo, setPhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const tourTypeOptions = [
    'Adventure',
    'Cultural',
    'Beach & Relaxation',
    'Wildlife Safari',
    'City Tours',
    'Mountain Trekking',
    'Food & Wine',
    'Photography',
    'Historical',
    'Eco Tours'
  ];

  const onChange = (field) => (e) => {
    if (errorMessage) setErrorMessage('');
    setForm({ ...form, [field]: e.target.value });
  };

  const canSubmit = () => {
    return (
      form.title.trim() &&
      form.tour_type &&
      selectedLocations.length > 0 &&
      Number(form.day_count) > 0 &&
      Number(form.person_count) > 0 &&
      Number(form.price_per_person) >= 0 &&
      Number(form.package_price) >= 0 &&
      photo
    );
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
    }
  };

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const removePhoto = () => {
    setPhoto(null);
    if (fileInputRef.current) {
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
      // Build multipart form data for text + file
      const fd = new FormData();
      fd.append('title', form.title.trim());
      fd.append('tour_type', form.tour_type);
  fd.append('locations', selectedLocations.join(', ')); // backend splits by comma
      fd.append('day_count', String(Number(form.day_count)));
  fd.append('person_count', String(Number(form.person_count)));
      fd.append('price_per_person', String(Number(form.price_per_person)));
      fd.append('package_price', String(Number(form.package_price)));
  if (form.short_description.trim()) fd.append('short_description', form.short_description.trim());
  if (form.overview.trim()) fd.append('overview', form.overview.trim());
  if (form.itinerary.trim()) fd.append('itinerary', form.itinerary.trim());
  if (form.highlights.trim()) fd.append('highlights', form.highlights.trim());
  if (form.facilities.trim()) fd.append('facilities', form.facilities.trim());
      fd.append('photo', photo);
      
      const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const res = await fetch(`${base}/api/v1/tour-packages/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: fd
      });
      if (!res.ok) {
        let message = 'Failed to create package';
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
      navigate('/admin/tour-packages');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to create package');
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
              Add New Tour Package
            </h1>
            <p style={{ color: '#666', fontSize: '15px', marginTop: '6px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Create a new tour package. Default status is inactive.
            </p>
          </div>

          {errorMessage && (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '12px 16px', color: '#dc2626', fontSize: '14px', fontFamily: 'system-ui, -apple-system, sans-serif', marginBottom: '1rem' }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <TextInput label="Package Title" value={form.title} onChange={onChange('title')} placeholder="Enter package title" icon={Tag} />
            <SelectInput 
              label="Tour Type" 
              value={form.tour_type} 
              onChange={onChange('tour_type')} 
              options={tourTypeOptions}
              helpText="Select the type of tour package."
              icon={Tag}
            />
            {/* Locations Multi-Select (Custom dropdown opens downward) */}
            <div ref={locationBoxRef} style={{ position: 'relative' }}>
              <label style={labelStyles}>Locations</label>
              <div
                onClick={() => setShowLocationDropdown(true)}
                style={{
                  ...inputStyles,
                  minHeight: '54px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  cursor: 'text'
                }}
              >
                {selectedLocations.map(loc => (
                  <span key={loc} style={{
                    background: '#00A79D',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    {loc}
                    <button type="button" onClick={(e) => { e.stopPropagation(); setSelectedLocations(selectedLocations.filter(l => l !== loc)); }} style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#fff',
                      cursor: 'pointer',
                      fontSize: '14px',
                      lineHeight: 1,
                      padding: 0
                    }}>×</button>
                  </span>
                ))}
                <input
                  type="text"
                  placeholder={selectedLocations.length ? 'Add more...' : 'Add location...'}
                  value={locationQuery}
                  onChange={(e) => { setLocationQuery(e.target.value); setShowLocationDropdown(true); }}
                  onFocus={() => setShowLocationDropdown(true)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    flex: '1 1 160px',
                    minWidth: '140px',
                    background: 'transparent',
                    fontSize: '14px'
                  }}
                />
              </div>
              {showLocationDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#fff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '12px',
                  marginTop: '4px',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                  zIndex: 20,
                  maxHeight: '260px',
                  overflowY: 'auto'
                }}>
                  {LOCATION_NAMES
                    .filter(n => !selectedLocations.includes(n))
                    .filter(n => n.toLowerCase().includes(locationQuery.toLowerCase()))
                    .map(name => (
                      <button
                        type="button"
                        key={name}
                        onClick={() => {
                          setSelectedLocations([...selectedLocations, name]);
                          setLocationQuery('');
                          // keep open for multiple selections
                        }}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          background: 'transparent',
                          border: 'none',
                          padding: '10px 14px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontFamily: 'system-ui, -apple-system, sans-serif'
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {name}
                      </button>
                    ))}
                  {LOCATION_NAMES
                    .filter(n => !selectedLocations.includes(n))
                    .filter(n => n.toLowerCase().includes(locationQuery.toLowerCase())).length === 0 && (
                      <div style={{ padding: '10px 14px', fontSize: '13px', color: '#666' }}>No matches</div>
                    )}
                  <div style={{ borderTop: '1px solid #f0f0f0', padding: '6px 10px', textAlign: 'right' }}>
                    <button type="button" onClick={() => setShowLocationDropdown(false)} style={{
                      background: '#00A79D',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}>Done</button>
                  </div>
                </div>
              )}
              <p style={{ fontSize: '12px', color: selectedLocations.length ? '#666' : '#d32f2f', marginTop: '0.25rem', marginLeft: '8px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {selectedLocations.length ? 'Select multiple locations the tour will cover.' : 'Select at least one location.'}
              </p>
            </div>
            <TextInput label="Day Count" type="number" value={form.day_count} onChange={onChange('day_count')} placeholder="Number of days" icon={Hash} />
            <TextInput label="Person Count" type="number" value={form.person_count} onChange={onChange('person_count')} placeholder="Number of persons" icon={Users} />
            <TextInput label="Price Per Person" type="number" value={form.price_per_person} onChange={onChange('price_per_person')} placeholder="Price per person" icon={Users} />
            <TextInput label="Package Price" type="number" value={form.package_price} onChange={onChange('package_price')} placeholder="Total package price" icon={DollarSign} />
            <TextInput label="Short Description" value={form.short_description} onChange={onChange('short_description')} placeholder="Brief summary of the package" icon={Tag} />
            {/* Tour Overview Rich Text with template holder */}
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <label style={labelStyles}>Tour Overview</label>
                <button type="button" onClick={()=>{
                  if(!form.overview || window.confirm('Replace current overview with sample template?')){
                    setForm(f=>({...f, overview: OVERVIEW_TEMPLATE.trim()}));
                  }
                }} style={{ background:'#00A79D', color:'#fff', border:'none', borderRadius:6, padding:'4px 10px', fontSize:11, cursor:'pointer', fontWeight:600 }}>Insert Sample</button>
              </div>
              <RichEditor value={form.overview} onChange={(val)=>setForm(f=>({...f, overview: val}))} placeholder="Describe the overall experience..." templateHtml={OVERVIEW_TEMPLATE} />
            </div>
            {/* Itinerary Rich Text with template holder */}
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <label style={labelStyles}>Itinerary</label>
                <button type="button" onClick={()=>{
                  if(!form.itinerary || window.confirm('Replace current itinerary with sample template?')){
                    setForm(f=>({...f, itinerary: ITINERARY_TEMPLATE.trim()}));
                  }
                }} style={{ background:'#00A79D', color:'#fff', border:'none', borderRadius:6, padding:'4px 10px', fontSize:11, cursor:'pointer', fontWeight:600 }}>Insert Sample</button>
              </div>
              <RichEditor value={form.itinerary} onChange={(val)=>setForm(f=>({...f, itinerary: val}))} placeholder="Day-by-day itinerary..." templateHtml={ITINERARY_TEMPLATE} />
              <p style={{ fontSize:'12px', color:'#666', marginTop:'4px', marginLeft:'8px' }}>Use the list button for bullet points. Bold/Italic supported. You can insert the sample then adjust.</p>
            </div>
            <TextInput label="Highlights" value={form.highlights} onChange={onChange('highlights')} placeholder="Comma separated highlights (e.g., Safari, Tea Factory, Whale Watching)" helpText="Separate highlights with commas." icon={Tag} />
            <TextInput label="Facilities" value={form.facilities} onChange={onChange('facilities')} placeholder="Comma separated facilities (e.g., Hotel, Transport, Guide)" helpText="Separate facilities with commas." icon={Tag} />

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={labelStyles}>Package Photo</label>
                <button type="button" onClick={openFilePicker} style={{
                  backgroundColor: '#00A79D',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 16px',
                  fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  cursor: 'pointer'
                }}>Add Photo</button>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={onFileChange} style={{ display: 'none' }} />
              <div style={{ marginTop: '10px' }}>
                {photo ? (
                  <div style={{
                    position: 'relative',
                    height: '200px',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    overflow: 'hidden',
                    backgroundColor: '#fafafa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img src={URL.createObjectURL(photo)} alt="package-photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button type="button" onClick={removePhoto} style={{
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
                ) : (
                  <div style={{
                    height: '200px',
                    borderRadius: '8px',
                    border: '1px dashed #e0e0e0',
                    backgroundColor: '#fafafa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#aaa',
                    fontSize: '14px'
                  }}>
                    No photo selected
                  </div>
                )}
              </div>
              {!photo && (
                <p style={{ fontSize: '12px', color: '#d32f2f', marginTop: '6px' }}>Please select a photo.</p>
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
              {isLoading ? 'Creating Package...' : 'Create Package'}
            </button>
          </form>
        </div>
      </div>
      <ChatbotWidget />
      <Footer_Combination />
    </div>
  );
}

// Simple inline rich text editor (contenteditable) for bold, italic, bullet list
function RichEditor({ value, onChange, placeholder, templateHtml }) {
  const ref = useRef(null);
  useEffect(()=>{
    if(ref.current && value !== ref.current.innerHTML){
      ref.current.innerHTML = value || '';
    }
  }, [value]);
  const exec = (cmd) => {
    document.execCommand(cmd, false, null);
    if(ref.current) onChange(ref.current.innerHTML);
  };
  const handleInput = () => {
    if(ref.current) onChange(ref.current.innerHTML);
  };
  return (
    <div style={{ border:'1px solid #e0e0e0', borderRadius:'12px', background:'#fff' }}>
      <div style={{ display:'flex', gap:6, padding:'6px 8px', borderBottom:'1px solid #eee', background:'#f8f9fa', borderTopLeftRadius:'12px', borderTopRightRadius:'12px' }}>
        <button type="button" onClick={()=>exec('bold')} style={toolbarBtn}>B</button>
        <button type="button" onClick={()=>exec('italic')} style={toolbarBtn}><em>I</em></button>
        <button type="button" onClick={()=>exec('insertUnorderedList')} style={toolbarBtn}>• List</button>
        {templateHtml && (
          <button type="button" onClick={()=>{
            if(!value || window.confirm('Replace current content with template?')){
              if(ref.current){ ref.current.innerHTML = templateHtml.trim(); }
              onChange(templateHtml.trim());
            }
          }} style={toolbarBtn}>Template</button>
        )}
        <button type="button" onClick={()=>{ if(ref.current && !ref.current.innerHTML){ ref.current.innerHTML=''; } }} style={{...toolbarBtn, marginLeft:'auto'}}>Clear</button>
      </div>
      <div
        ref={ref}
        contentEditable
        onInput={handleInput}
        data-placeholder={placeholder}
        style={{
          minHeight:120,
          padding:'10px 14px',
          outline:'none',
          fontFamily:'system-ui,-apple-system,sans-serif',
          fontSize:14,
        }}
        suppressContentEditableWarning
      />
      {(!value) && templateHtml && (
        <div style={{ pointerEvents:'none', marginTop:-120, padding:'10px 14px', opacity:0.28, fontSize:12, fontFamily:'system-ui,-apple-system,sans-serif', userSelect:'none' }} dangerouslySetInnerHTML={{ __html: templateHtml }} />
      )}
    </div>
  );
}

const toolbarBtn = {
  background:'#00A79D',
  color:'#fff',
  border:'none',
  borderRadius:6,
  padding:'4px 10px',
  fontSize:12,
  cursor:'pointer',
  fontWeight:600
};

export default AddTourPackagePage;






