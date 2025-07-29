'use client';

import React from 'react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 40.7128,  // Example: New York City latitude
  lng: -74.0060, // Example: New York City longitude
};

export default function GoogleMapComponent() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      <MarkerF position={center} />
    </GoogleMap>
  );
}
