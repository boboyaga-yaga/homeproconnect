import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Vite
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const providerIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const userIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

interface MapViewProps {
  providerName: string;
  isMoving: boolean;
  userLocation?: [number, number];
}

// Component to handle map updates
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export const MapView = ({ providerName, isMoving, userLocation }: MapViewProps) => {
  // Default to Lagos, Nigeria coordinates
  const defaultUserLocation: [number, number] = userLocation || [6.5244, 3.3792];
  
  // Provider starts further away
  const [providerPosition, setProviderPosition] = useState<[number, number]>([
    defaultUserLocation[0] + 0.015,
    defaultUserLocation[1] + 0.012
  ]);

  // Simulate provider movement towards user
  useEffect(() => {
    if (!isMoving) return;

    const interval = setInterval(() => {
      setProviderPosition((prev) => {
        const latDiff = defaultUserLocation[0] - prev[0];
        const lngDiff = defaultUserLocation[1] - prev[1];
        
        // Stop if close enough
        if (Math.abs(latDiff) < 0.001 && Math.abs(lngDiff) < 0.001) {
          return prev;
        }

        return [
          prev[0] + latDiff * 0.08,
          prev[1] + lngDiff * 0.08
        ];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isMoving, defaultUserLocation]);

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden">
      <MapContainer
        center={defaultUserLocation}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User location marker */}
        <Marker position={defaultUserLocation} icon={userIcon}>
          <Popup>Your Location</Popup>
        </Marker>

        {/* Provider marker */}
        <Marker position={providerPosition} icon={providerIcon}>
          <Popup>{providerName} is on the way!</Popup>
        </Marker>

        <MapUpdater center={providerPosition} />
      </MapContainer>
    </div>
  );
};
