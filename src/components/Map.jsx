import "../App.css";
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow} from "@react-google-maps/api";
import React, { useState, useEffect } from 'react';

const containerStyle = {
  width: '600px',
  height: '600px'
};

const center = {
  lat: 38.8899,
  lng: -77.0091
};

function MyComponent({hoveredEventName}) {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY
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

  const handleHover = (marker) => {
    setSelectedMarker(marker);
  }

  //Getting Airtable records code
function getCoordsAirtable() {
  var Airtable = require('airtable');
  var base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_API_KEY}).base('appjMaG4kkysB4JLI');


  base('Data').select({
    maxRecords: 25,
    view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
    const markerData = records.map((record) => ({
      lat: parseFloat(record.get('lat')),
      lng: parseFloat(record.get('lng')),
      name: record.get('name'),
      link: record.get('link'),
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
            icon={{
              url: hoveredEventName === marker.name ? "placeholder.png" : "pin.png",
              scaledSize: new window.google.maps.Size(40, 40),
              anchor: new window.google.maps.Point(20, 40),
            }}
              
            onClick={() => handleMarkerClick(marker)}
            
          />   
        ))}

      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div className="flex px-2 items-center justify-center font-bold text-lg">
            <a href= {selectedMarker.link} target="_blank"  className="w-full flex items-center justify-center underline">
              {selectedMarker.name}
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : <></>;
}

export default React.memo(MyComponent)