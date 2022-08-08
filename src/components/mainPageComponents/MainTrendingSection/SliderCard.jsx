import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SliderCard({ content }) {
    const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/movie/${content.id}`)} className='h-[440px] w-auto flex justify-center items-center hover:-translate-y-3 duration-200 ease-in-out'>
        <div className='h-[400px] w-[187px] flex flex-col justify-start items-center rounded-md
    relative hover:cursor-pointer border-2 border-zinc-400 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]'>
            <div className='h-[70%] w-full flex justify-center'>
                <img className=' h-full rounded-t-md' src={`https://image.tmdb.org/t/p/original/${content.poster_path}`} alt="/" />
            </div>
            <div className='flex flex-col w-full h-full justify-start items-center rounded-b-md bg-slate-300 '>
                <h1 className='text-xl text-center font-medium text-zinc-800 pt-2'>{ content.title }</h1>
            </div>
        </div>
    </div>
  )
}
