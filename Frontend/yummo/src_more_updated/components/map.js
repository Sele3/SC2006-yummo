import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '33%',
  height: '400px',
  borderRadius: '3rem' 
};

export class MapContainer extends Component {
  render() {
    const {latitude, longitude} = this.props;
    return (
    <>
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        center={
          {
            lat: latitude,
            lng: longitude
          }
        }
      >

      <Marker
          position={{ lat: latitude, lng: longitude }}
        />
    </Map>  
    </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEMAP_API_KEY
})(MapContainer);