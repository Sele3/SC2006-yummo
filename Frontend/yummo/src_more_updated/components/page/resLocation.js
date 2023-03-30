const Locations = ({ markers }) => {
    return (
      <ul>
        {markers.map((marker, index) => (
          <li key={index}>
            {`Latitude: ${marker.lat}, Longitude: ${marker.lng}`}
          </li>
        ))}
      </ul>
    );
  };
  
  export default Locations;
  