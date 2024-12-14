import Map from '../components/Map';
import "../input.css";

export default function Events() {

    let addressList = [];
    let nameList = [];
    let linkList = [];

    Airtable();

    function buttonSubmit () {
        const eventName = document.getElementById('name');
        const eventAddress = document.getElementById('address');
        const eventLink = document.getElementById('link');

        console.log("buttonSubmit is running");

        createRecord();

        eventName.value = " ";
        eventAddress.value = " ";
        eventLink.value = " ";

    }

    //Getting Airtable records code
    function Airtable() {
        var Airtable = require('airtable');
        var base = new Airtable({apiKey: ''}).base('');

        base('Data').select({
            maxRecords: 25,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.

        records.forEach(function(record) {
            nameList.push(record.get('Name'));
            addressList.push(record.get('Address'));
            linkList.push(record.get('Link'));

        });

        console.log("Links:", linkList); // Log links to verify they are retrieved correctly

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();

        }, function done(err) {
            if (err) { console.error(err); return; }
            addEvent();

        });
    }
    
    function addEvent () {
      console.log("add event is running");
        const markerContainer = document.getElementById('markerContainer');

        markerContainer.innerHTML = " ";
        
        let i = 0;

        if (markerContainer) {
          console.log("markercontainer exixts");
            while (i < addressList.length) {
                const newDiv = document.createElement('div');
                const link = document.createElement('a');
                const text = document.createElement('p');
                link.href = linkList[i];
                link.target = '_blank';
                text.innerHTML += nameList[i] + ": " + addressList[i] + "<br>";

                link.appendChild(text);
                newDiv.appendChild(link);

                markerContainer.appendChild(newDiv);
                newDiv.classList.add("bg-white", "m-3", "rounded-lg", "p-2");

                i = i + 1;
            };
        } else {
            console.error("markerContainer is not defined");
        }
    }

    //Creating airtable records

    function createRecord() {
        var Airtable = require('airtable');
        var base = new Airtable({apiKey: '.'}).base('');
        const eventName = document.getElementById('name').value;
        const eventAddress = document.getElementById('address').value;
        const eventLink = document.getElementById('link').value;

        console.log(eventName, eventAddress, eventLink);

        base('Data').create([
            {
              "fields": {
                "Name": eventName,
                "Address": eventAddress,
                "Latitude": 0,
                "Longitude": 0,
                "Link": eventLink
              }
            }
          ], function(err, records) {
            if (err) {
              console.error(err);
              return;
            }
            records.forEach(function (record) {
              console.log(record.getId());
            });
          });

          nameList.push(eventName);
          addressList.push(eventAddress);
          linkList.push(eventLink);

        addEvent();
    }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-full">

      <div id="map" className="m-2 flex items-center justify-center w-full">
        <Map />
      </div>

      <div className='flex justify-center items-center flex-col w-full'>
      <div id="heading">
        <h1 className='text-black text-xl font-bold'>Nearby Cleanups</h1>
      </div>
        <div id="markerContainer" className='bg-slate-300 m-2 scroll-auto p-12 rounded-xl w-full h-1/3 md:w-2/3 flex flex-col justify-center items-center'>
            <p id="lat" className='overflow-y-scroll'></p>
            <p id="lng" className='overflow-y-scroll'></p>
        </div>
        <div id="createMarkerContainer" className='bg-slate-300 scroll-auto p-12 m-2 rounded-xl w-full h-1/3 md:w-2/3 flex flex-col justify-center items-center'>
            <h1 className='text-white text-xl font-bold mb-3'>Create your own Cleanup Event</h1>
            <div id="nameInput" className='m-2 flex justify-center items-center'>
                <h1 className='mr-3'>Event Name: </h1>
                <input id="name" placeholder='Cleanup Name' className='rounded-lg p-3'></input>
            </div>
            <div id="addressInput" className='m-2 flex justify-center items-center'>
                <h1 className='mr-3'>Event Address: </h1>
                <input id="address" placeholder='Event Address' className='rounded-lg p-3'></input>
            </div>
            <div id="linkInput" className='m-2 flex justify-center items-center'>
                <h1 className='mr-3'>Event Website: </h1>
                <input id="link" placeholder='Event Website' className='rounded-lg p-3'></input>
            </div>
            <div id="button" className='flex justify-center items-center'>
                <button className='mr-3 text-white bg-green-800 transition duration-200 hover:bg-green-900 p-3 px-20 rounded-xl' onClick={() =>  { buttonSubmit(); }}>Submit</button>
            </div>

        </div>
      </div>
    </div>
  
  );

}