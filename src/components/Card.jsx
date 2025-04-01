import { AirtableProvider, useAirtable } from "../components/Airtable";
import { useState } from 'react';


export default function Card({card, onMouseEnter, onMouseLeave}) {
    
    function convertTime(time) {
        let year = time.substring(0, 4);
        let month = time.substring(5, 7);
        let day = time.substring(8, 10);
        let clock = time.substring(11, 16);
        
        convertMonth(month);

        return (month + " " + day + ", " + year + ", " + clock);
    }

    function convertMonth(month) {
        if (month == "12") {
            month = "December";
        } else if (month == 11) {
            month = "November";
        } else if (month == "10") {
            month = "October";
        } else if (month == "09") {
            month = "September";
        } else if (month == "08") {
            month = "August";
        } else if (month == "07") {
            month = "July";
        } else if (month == "06") {
            month = "June";
        } else if (month == "05") {
            month = "May";
        } else if (month == "04") {
            month = "April";
        } else if (month == "03") {
            month = "March";
        } else if (month == "02") {
            month = "February";
        } else if (month == "01") {
            month = "January";
        }

        return month;
    }
    return (
        <div id="main" className="w-full" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            
            <div id="cardback" className="bg-white rounded-xl shadow-md p-8 m-3 font-poppins w-full flex flex-col text-left">
                <h1 id="title" className="font-bold text-xl">{card.name}</h1>
                <h2 id="organizer" className="mb-1"></h2>
                <h2 id="time" className="mb-1">{convertTime(card.time)}</h2>
                <h2 id="address" className="mb-1">{card.address}</h2>
                <div id="tags" className="flex">
                    <p className="bg-green-200 rounded-lg p-2 px-2 mr-2 text-sm">Morning</p>
                    <p className="bg-green-200 rounded-lg p-2 px-2 mr-2 text-sm">Beginner Friendly</p>
                </div>
                <div className="justify-center items-center flex w-full">
                <a href={card.link} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center">
                    <button id="signup" className=' text-white bg-green-800 transition duration-200 hover:bg-green-900 p-2 px-20 rounded-xl mt-3 w-full text-sm'>Sign up</button>
                </a>
                </div>
            </div>
        </div>
    )

}