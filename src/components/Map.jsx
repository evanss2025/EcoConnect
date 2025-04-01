import "../App.css";
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow} from "@react-google-maps/api";
import React, { useState, useEffect } from 'react';

const containerStyle = {
  width: '600px',
  height: '600px'
};

const center = {
  lat: 42.3601,
  lng: -71.0589
};

function MyComponent() {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDoyto6w4IlV12ZSKLW0Bw-ULWg4kpy4iM"
  })

  const [map, setMap] = React.useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      getCoordsAirtable(setMarkers);
    }, 100);
  
    return () => clearInterval(interval); 
  }, []);
  

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  //Getting Airtable records code
function getCoordsAirtable() {
  var Airtable = require('airtable');
  var base = new Airtable({apiKey: ''}).base('');


  base('Data').select({
    maxRecords: 25,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    const markerData = records.map((record) => ({
      lat: parseFloat(record.get('Lat')),
      lng: parseFloat(record.get('Lng')),
      name: record.get('Name'),
    }));
    setMarkers(markerData);

    fetchNextPage();
  }, function done(err) {
    if (err) {
      console.error(err);
    }
  });
}
  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <MarkerF />
        {markers.map((marker, i) => (
          <MarkerF 
            key={i}
            position={{lat: marker.lat, lng: marker.lng}}
            options={{
              icon: "marker2.png", 
            }}
            onClick={() => handleMarkerClick(marker)}
            
          />   
        ))}

      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div className="flex items-center justify-center font-bold text-md">{selectedMarker.name}</div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : <></>;
}

export default React.memo(MyComponent)