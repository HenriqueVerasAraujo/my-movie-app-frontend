/* eslint-disable react/prop-types */
import React from 'react'

export default function BackGroundCast({ info }) {
  return (
    <div className='text-white text-lg flex flex-col items-center'>
        <div className='mb-7 flex flex-col items-center'>
            <h1 className='hidden md:flex font-bold text-center'>Directed by:</h1>
            <h1 className='flex md:hidden font-bold text-center'>Directed:</h1>
            {info.director !== undefined ? (
            <h1 className='opacity-80 justify-between text-center'>{info.director.name}</h1>
            ): (
              <h1 className='opacity-80 text-center'>N/A</h1>
            )}
        </div>
        <div className='flex flex-col items-center'>
          <h1 className='hidden md:flex font-bold text-center'>Written by:</h1>
          <h1 className='flex md:hidden font-bold text-center'>Written:</h1>
          {info.writer !== undefined ? (
            <h1 className='opacity-80 text-center'>{info.writer.name}</h1>
          ): (
            <h1 className='opacity-80 text-center'>N/A</h1>
          )}
        </div>
    </div>
  )
}
