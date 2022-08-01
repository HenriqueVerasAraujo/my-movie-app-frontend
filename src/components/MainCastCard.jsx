import React from 'react'

export default function MainCastCard({ info }) {
  return (
    <div className='flex flex-col items-center w-[150px] h-[300px] border-neutral-500 border-[1px] rounded-md'>
        <div className='w-full rounded-md'>
            <img className='w-full rounded-t-md' src={`https://www.themoviedb.org/t/p/w138_and_h175_face${info.profile_path}`}alt="/" />
        </div>
        <div className='flex flex-col items-start p-2'>
            <h1 className='font-bold' >{info.name}</h1>
            <h1 className='opacity-80'>{info.character}</h1>
        </div>
    </div>
  )
}
