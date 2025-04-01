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
    apiKey: 'patA7l6ioAXtH6tVq.6379921665d2512b9a7db1f4ea8d335fac1f590a88ae0780205cc873d2967957'
  }).base('appjMaG4kkysB4JLI');
  
  // Function to fetch records from Airtable (runs on component mount)
  useEffect(() => {
    setLoading(true);
    
    base('Data')
      .select({
        maxRecords: 25,
        view: "Grid view"
      })
      .eachPage(
        function page(records, fetchNextPage) {
          const formattedRecords = records.map(record => ({
            id: record.id,
            name: record.get('Name'),
            time: record.get('Time'),
            address: record.get('Address'),
            link: record.get('Link'),
            lat: record.get('Lat'),
            lng: record.get('Lng')
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
          id: createdRecords[0].id,
          name: createdRecords[0].fields.Name,
          address: createdRecords[0].fields.Address,
          link: createdRecords[0].fields.Link,
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