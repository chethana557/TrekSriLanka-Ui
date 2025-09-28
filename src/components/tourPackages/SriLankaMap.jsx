import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Default icon fix for leaflet in many bundlers
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import marker from 'leaflet/dist/images/marker-icon.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: marker,
  iconRetinaUrl: marker2x,
  shadowUrl: shadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Expect locations as array of objects: { name, lat, lng, description }
export default function SriLankaMap({ locations = [], height = 400 }) {
  // Fallback center of Sri Lanka
  const center = [7.8731, 80.7718];
  const first = locations.find(l => typeof l.lat === 'number' && typeof l.lng === 'number');
  const mapCenter = first ? [first.lat, first.lng] : center;

  return (
    <div style={{ width: '100%', height, borderRadius: 12, overflow: 'hidden' }}>
      <MapContainer center={mapCenter} zoom={7} style={{ height: '100%', width: '100%' }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {locations.filter(l => typeof l.lat === 'number' && typeof l.lng === 'number').map((loc, idx) => (
          <Marker position={[loc.lat, loc.lng]} key={idx}>
            <Popup>
              <strong>{loc.name || 'Location'}</strong><br />
              {loc.description || ''}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
