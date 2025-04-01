import "../input.css";
import ReactDOM from 'react-dom';
import Map from '../components/Map';
import Event from "../components/Event";
import Button from "../components/Button";
import Card from "../components/Card";
import { AirtableProvider, useAirtable } from "../components/Airtable";
import React, { useState, useEffect } from 'react';


export default function Events() {

  return (
    <AirtableProvider>
      <EventsContent />
    </AirtableProvider>
  );
}

function EventsContent() {
  const [hoveredEventName, setHoveredEventName] = useState(null);
  const { records, createRecord, loading } = useAirtable();

  const handleCardHover = (eventName) => {
    setHoveredEventName(eventName);
    console.log("hovering " + eventName);
  };
  
  // Handler to clear hover state
  const handleCardLeave = () => {
    setHoveredEventName(null);
    console.log("not hovering");
  };

  function buttonSubmit() {
    const eventName = document.getElementById('name');
    const eventAddress = document.getElementById('address');
    const eventLink = document.getElementById('link');

    console.log("buttonSubmit is running");

    // Use the createRecord function from context
    createRecord({
      Name: eventName.value,
      Address: eventAddress.value,
      Lat: 0,
      Lng: 0,
      Link: eventLink.value
    });

    // Clear the form inputs
    eventName.value = "";
    eventAddress.value = "";
    eventLink.value = "";
  }

  return (
    <div id="react-container" className="flex flex-col md:flex-row items-center justify-center w-full h-full font-poppins">
      <div id="map" className="m-2 flex items-center justify-center w-1/2">
        <Map 
          hoveredEventName={hoveredEventName}
        />
      </div>

      <div className='flex justify-center items-center flex-col w-full'>
        <div id="heading">
          <h1 className='text-black text-2xl font-bold'>Nearby Cleanups</h1>
        </div>
          <div id="markerContainer" className= 'grid grid-cols-2 m-2 scroll-auto p-12 rounded-xl w-full h-[600px] justify-center items-center overflow-y-scroll'>
            {loading ? (
              <p>Loading events...</p>
            ) : (
              records.map((record) => (
                <div key={record.id} className= "m-3 rounded-lg p-2 w-full">
                  <Card 
                    card={{
                      name: record.name, 
                      time: record.time, 
                      address: record.address, 
                      link: record.link,
                    }}
                    onMouseEnter={() => handleCardHover(record.name)}
                    onMouseLeave={handleCardLeave}
                  />
                </div>
              ))
            )}
          </div>
        {/* <Event />
        <Button onClick={buttonSubmit} /> */}
      </div>
    </div>
  );
}