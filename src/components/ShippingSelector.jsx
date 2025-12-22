import React from 'react'
import { FaRegCircle, FaCircle } from "react-icons/fa6";

const ShippingSelector = ({id, street, city, state, country, action, selectedAddress}) => {
  return (
    <div onClick={() => action({id,street, city, state, country})} className='lg:w-[300px] w-full h-[100px] flex flex-col items-start justify-center bg-white border-[1px] border-black/30 drop-shadow-md rounded-md p-4 relative cursor-pointer hover:shadow-md hover:shadow-primary/30 hover:drop-shadow-xl transition duration-300 ease-in-out'>
        <h2 className='text-black/70 w-3/4 capitalize'>{street},</h2>
        <div className='w-3/4 flex flex-wrap text-sm items-center gap-x-2 text-black/50'>
            <h2>{city},</h2>
            <h2>{state},</h2>
            <h2>{country}.</h2>
        </div>

        <div className='absolute right-5 top-3 flex items-center gap-3'>
            {selectedAddress && selectedAddress.id === id ? (
                <FaCircle className='text-primary w-5 h-5 cursor-pointer' />
            ):(
                <FaRegCircle className='text-black/50 w-5 h-5 cursor-pointer' />
            )}
        </div>
    </div>
  )
}

export default ShippingSelector