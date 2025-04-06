// components/AirtableService.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import Airtable from 'airtable';

// Create context
const AirtableContext = createContext();

// Custom hook to use the Airtable context
export const useAirtable = () => useContext(AirtableContext);

export const AirtableProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Initialize Airtable base
  const base = new Airtable({
    apiKey: ''
  }).base('');
  
  // Function to fetch records from Airtable (runs on component mount)
  useEffect(() => {
    setLoading(true);
    
    base('Data')
      .select({
        maxRecords: 50,
        view: "Grid view"
      })
      .eachPage(
        function page(records, fetchNextPage) {
          const formattedRecords = records.map(record => ({
            name: record.get('name'),
            time: record.get('time'),
            address: record.get('address'),
            link: record.get('link'),
            lat: record.get('lat'),
            lng: record.get('lng')
          }));
          
          setRecords(currentRecords => [...currentRecords, ...formattedRecords]);
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            setError(err.message);
          }
          setLoading(false);
        }
      );
  }, []);
  
  // Function to create a new record
  const createRecord = async (data) => {
    setLoading(true);
    
    try {
      const createdRecords = await base('Data').create([
        {
          fields: data
        }
      ]);
      
      if (createdRecords && createdRecords.length > 0) {
        const newRecord = {
          name: createdRecords[0].fields.name,
          address: createdRecords[0].fields.address,
          time: createdRecords[0].fields.time,
          link: createdRecords[0].fields.link,
          lat: createdRecords[0].fields.Lat || 0,
          lng: createdRecords[0].fields.Lng || 0
        };
        
        setRecords(currentRecords => [...currentRecords, newRecord]);
      }
    } catch (err) {
      console.error("Error creating record:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Create the context value
  const contextValue = {
    records,
    loading,
    error,
    createRecord,
  };
  
  return (
    <AirtableContext.Provider value={contextValue}>
      {children}
    </AirtableContext.Provider>
  );
};