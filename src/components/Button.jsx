export default function Button({onClick}) {
    return (
        
        <div>
            <div id="button" className='flex justify-center items-center w-full'>
                <button className='mr-3 text-white bg-green-800 transition duration-200 hover:bg-green-900 p-3 px-20 rounded-xl' onClick={onClick}>Submit</button>
            </div>  
        </div>
        
    )
}