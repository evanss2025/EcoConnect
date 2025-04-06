import Button from "../components/Button";

export default function Event({ onClick, onClickButton }) {

    function check(input) {
        console.log(input);
    }

    function checkInput() {
        const name = document.getElementById("name").value || "";
        const time = document.getElementById("timeData").value || "";
        const address = document.getElementById("addressData").value || "";
        const link = document.getElementById("link").value || "";

        const nameError = document.getElementById("nameError");

        console.log({ name, time, address, link }); // Log all values

        nameError.classList.add("hidden");

        console.log(address);

        if (!name.trim()) {
            nameError.classList.remove("hidden");
            return;
        }

        const data = {
            name,
            time,
            address,
            link,
        };

        onClickButton(data); 
    }

    return (
        <div id="createMarkerContainer" className='bg-slate-300 scroll-auto p-14 m-2 rounded-xl flex flex-col justify-center items-center relative w-full'>
            <div id="close">
                <button onClick={onClick} className="absolute top-3 right-3 text-xl text-black font-bold">x</button>
            </div>
            <h1 className='text-2xl font-bold mb-3 text-center'>Create your own Cleanup Event</h1>
            <div className='m-2'>
                <label>Event Name:</label>
                <input id="name" placeholder='Cleanup Name' className='rounded-lg p-3 ml-2'/>
                <p id="nameError" className="text-red-600 hidden">Please enter a valid name.</p>
            </div>
            <div className='m-2'>
                <label>Date and Time:</label>
                <input id="timeData" type="datetime-local" onChange={(e) => check(e.target.value)} className='rounded-lg p-3 ml-2'/>
            </div>
            <div className='m-2'>
                <label>Event Address:</label>
                <input id="addressData" placeholder='Cleanup Address'  onChange={(e) => check(e.target.value)} className='rounded-lg p-3 ml-2'/>
            </div>
            <div className='m-2'>
                <label>Sign Up Link:</label>
                <input id="link" placeholder='Signup Link' className='rounded-lg p-3 ml-2'/>
            </div>
            <Button className="w-full" onClick={checkInput}/>
        </div>
    )
}
