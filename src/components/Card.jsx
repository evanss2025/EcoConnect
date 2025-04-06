import { AirtableProvider, useAirtable } from "../components/Airtable";
import { useState } from 'react';


export default function Card({card, onMouseEnter, onMouseLeave}) {
    
    function convertTime(time) {
        if (!time) {
            return "Time not specified";
        }
        
        try {
            let convertedTime = formatAirtableDate(time);
            console.log(convertedTime);

            return (convertedTime);

        } catch (error) {
            console.error("Error formatting time:", error);
            return "Invalid time format";
        }
    }

    function formatAirtableDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleString(); 
      }

    return (
        <div id="main" className="w-full" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            
            <div id="cardback" className="bg-white rounded-xl shadow-md p-8 m-3 font-poppins h-64 w-11/12 flex flex-col text-left justify-center">
                <h1 id="title" className="font-bold text-xl basis-1/6">{card.name}</h1>
                <h2 id="organizer" className="mb-1 basis-1/6"></h2>
                <h2 id="time" className="mb-1 basis-1/6">{convertTime(card.time)}</h2>
                <h2 id="address" className="mb-1 basis-1/6">{card.address}</h2>
                <div className="justify-center items-center flex w-full basis-1/6">
                <a href={card.link} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center">
                    <button id="signup" className=' text-white bg-green-800 transition duration-200 hover:bg-green-900 p-2 px-20 rounded-xl mt-3 w-full text-sm'>Sign up</button>
                </a>
                </div>
            </div>
        </div>
    )

}