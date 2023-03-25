import React, { useState, useEffect } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);

  const onLoad = (map) => {
    setMap(map);
  };

  const onMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkers([...markers, newMarker]);
  };

  const onClearClick = () => {
    setMarkers([]);
  };

  const onSaveClick = () => {
    // TODO: Save markers to database or state management system
  };

  const mapContainerStyle = {
    height: "400px",
    width: "100%",
  };

  const center = {
    lat: 37.7749,
    lng: -122.4194,
  };

  return (
    <div>
      <GoogleMap
        onLoad={onLoad}
        onClick={onMapClick}
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
      >
        {markers.map((marker) => (
          <Marker key={`${marker.lat}-${marker.lng}`} position={marker} />
        ))}
      </GoogleMap>
      <div>
        <button onClick={onClearClick}>Clear Markers</button>
        <button onClick={onSaveClick}>Save Markers</button>
      </div>
    </div>
  );
};

export default Map;
