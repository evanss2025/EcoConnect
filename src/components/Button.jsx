
export default function Button({onClick}) {
    return (
        <div className="w-full">
            <div id="button" className='flex justify-center items-center w-full'>
                <button className=' text-white w-full bg-green-800 transition duration-200 hover:bg-green-900 p-2 mt-3 rounded-xl' onClick={onClick}>Submit</button>
            </div>  
        </div>
        
    )
}