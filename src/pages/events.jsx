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
  const createDiv = document.getElementById("createEvent");
  const constant = document.getElementById("constant");
  const createButton = document.getElementById("createButton");

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

  function buttonSubmit(data) {
    const {name, time, address, link } = data;
      
    let formattedTime = null;
    if (time) {
      formattedTime = new Date(time).toISOString();
    }
  
    console.log("Formatted time:", formattedTime);
  
    createRecord({
      name,
      address,
      time: formattedTime,
      lat: 0,
      lng: 0,
      link
    });
  
    close();
  }  

  function create() {
    createDiv.classList.remove("hidden");
    constant.classList.add("blur-sm");
    createButton.classList.add("hidden");
  }

  function close() {
    createDiv.classList.add("hidden");
    constant.classList.remove("blur-sm");
    createButton.classList.remove("hidden");


  }

  return (
    <div id="react-container" className="flex flex-col md:flex-row items-center justify-center w-full h-full font-poppins">
      <div id="constant" className="flex flex-col md:flex-row items-center justify-center w-full h-full font-poppins">
        <div id="map" className="m-2 flex items-center justify-center w-full md:w-1/2">
          <Map 
            hoveredEventName={hoveredEventName}
          />
        </div>

        <div className='flex justify-center items-center text-center flex-col w-full'>
          <div id="heading">
            <h1 className='text-black text-2xl md:text-3xl font-bold mt-2 text-center'>Nearby Cleanups</h1>
          </div>
            <div id="markerContainer" className= 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 scroll-auto p-3 rounded-xl w-full md:h-[600px] justify-center items-center overflow-y-scroll overflow-x-hidden'>
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
            <div id="createButton" onClick={create}>
              <div className="p-4 rounded-full bg-green-800 fixed bottom-8 right-14 w-[70px] h-[70px] flex justify-center items-center transition duration-500 hover:scale-125">
                <p className="text-white text-3xl">+</p>
              </div>
            </div>
        </div>
      </div>
        <div id="createEvent" className="hidden flex fixed top-1/4 sm:top-1/3 md:top-1/4 justify-center items-center">
          <Event 
            onClick={close}
            onClickButton={buttonSubmit}
          />
        </div>
    </div>
  );
}