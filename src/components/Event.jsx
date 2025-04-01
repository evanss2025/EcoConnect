
export default function Event() {
    return (
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
        </div>
    )
}

