import React from 'react'

const Cards = ({handlefunc, img , btn_name, altt, btncolor}) => {

  return <>
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <img
      src={img}
      alt={altt}
      className="w-full h-[800px] object-cover"
    />
    <div className="p-4">
      <button
        onClick={handlefunc}
        className ={`w-full px-4 py-2 ${btncolor} text-white font-semibold rounded-lg hover:bg-red-700 transition `}
      >
        {btn_name}
      </button>
    </div>
  </div> 
  </> 
}

export default Cards