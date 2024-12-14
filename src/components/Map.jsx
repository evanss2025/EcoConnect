import "../App.css";
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindow} from "@react-google-maps/api";
import React, { useState, useEffect } from 'react';
import customMarker from "../components/marker2.png";

let name = " ";

const containerStyle = {
  width: '600px',
  height: '600px'
};

const center = {
  lat: 42.3601,
  lng: -71.0589
};

function MyComponent() {
  const [latitudes, setLatitudes] = useState([]);
  const [longitudes, setLongitudes] = useState([]);
  const [infoWindowPosition, setInfoWindowPosition] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ""
  })

  const [map, setMap] = React.useState(null);

  useEffect(() => {
    getCoordsAirtable(setLatitudes, setLongitudes);
  }, []);

  const MarkerFactory = (lat, lng) => {
    return {lat, lng}
  }

  const Markers = [
    ...latitudes.map((lat, i) => MarkerFactory(lat, longitudes[i]))
  ];

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handleMarkerClick = (position) => {
    setInfoWindowPosition(position);
  };

  //Getting Airtable records code
function getCoordsAirtable() {
  var Airtable = require('airtable');
  var base = new Airtable({apiKey: ''}).base('');


  base('Data').select({
      maxRecords: 25,
      view: "Grid view"
  }).eachPage(function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      let latitudes = [];
      let longitudes = [];

  records.forEach(function(record) {
      latitudes.push(parseFloat(record.get('Latitude')));
      longitudes.push(parseFloat(record.get('Longitude')));
      name = record.get('Name');
  });

  setLatitudes(latitudes);
  setLongitudes(longitudes);


  // To fetch the next page of records, call `fetchNextPage`.
  // If there are more records, `page` will get called again.
  // If there are no more records, `done` will get called.
  fetchNextPage();

  }, function done(err) {
      if (err) { console.error(err); return; }
      //addEvent();

  });
  
}
  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <MarkerF />
        {Markers.map((marker, i) => (
          <MarkerF 
            key={i} 
            position={{lat: marker.lat, lng: marker.lng}}
            options={{
              icon: customMarker, 
            }}
            onClick={() => handleMarkerClick({ lat: marker.lat, lng: marker.lng })}
            
          />   
        ))}

      {infoWindowPosition && (
        <InfoWindow position={infoWindowPosition} onCloseClick={() => setInfoWindowPosition(null)}>
          <div>{name}</div>
        </InfoWindow>
      )}
        
        <>
        </>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)