import React from 'react'

export default function GenreButton({ title }) {

  return (
      <div>
        {title === 'Science Fiction' ? (
            <div className='flex items-center justify-center px-4 bg-black opacity-50 w-[140px] h-[40px] rounded-3xl z-0 mr-1 hover:cursor-pointer hover:bg-white hover:opacity-100 hover:border-2 border-black text-white hover:text-black'>
                <h1 className=' font-bold opacity-200 text-sm z-10'>{title}</h1>
            </div>
        ) : (
            <div className='flex items-center justify-center  px-4 bg-black opacity-50 w-min h-[40px] rounded-3xl z-0 mr-1 hover:cursor-pointer hover:bg-white hover:opacity-100 hover:border-2 border-black text-white hover:text-black'>
                <h1 className=' font-bold opacity-200 text-sm z-10 '>{title}</h1>
            </div>
        )}
      </div>
  )
}
