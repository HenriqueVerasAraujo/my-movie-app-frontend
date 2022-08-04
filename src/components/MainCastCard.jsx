import React from 'react'

export default function MainCastCard({ info }) {
  return (
    <div className='flex flex-col items-center w-[150px] h-[300px] border-neutral-500 border-[1px] rounded-md shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] hover:cursor-pointer hover:translate-y-2 duration-200 ease-in-out'>
        <div className='w-full rounded-md'>
            <img className='w-full rounded-t-md' src={`https://www.themoviedb.org/t/p/w138_and_h175_face${info.profile_path}`}alt="/" />
        </div>
        <div className='h-full w-full flex flex-col items-start p-2 bg-neutral-200 rounded-b-md'>
            <h1 className='font-bold' >{info.name}</h1>
            <h1 className='opacity-70'>{info.character}</h1>
        </div>
    </div>
  )
}
