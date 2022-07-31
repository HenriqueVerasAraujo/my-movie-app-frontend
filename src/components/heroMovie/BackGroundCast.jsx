import React from 'react'

export default function BackGroundCast({ info }) {
  return (
    <div className='text-white text-lg flex flex-col items-center'>
        <div className='mb-7 flex flex-col items-center'>
            <h1 className='font-bold'>Directed by:</h1>
            {info.director !== undefined ? (
            <h1 className='opacity-80'>{info.director.name}</h1>
            ): (
              <h1 className='opacity-80'>N/A</h1>
            )}
        </div>
        <div className='flex flex-col items-center'>
          <h1 className='font-bold'>Written by:</h1>
          {info.writer !== undefined ? (
            <h1 className='opacity-80'>{info.writer.name}</h1>
          ): (
            <h1 className='opacity-80'>N/A</h1>
          )}
        </div>
    </div>
  )
}
