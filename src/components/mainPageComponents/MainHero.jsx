/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import background from '../../assets/wallpaperbetter.jpg'

export default function MainHero() {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);
  
  return (
    <div>
      {windowSize > 760 ? (
          <div className='w-full h-[450px] relative'>
            <div className=' absolute w-full h-full bg-sky-800/40 z-10' />
            <img className='h-full w-full object-cover absolute blur-[1px] z-0' src={background} alt="/" />
            <div className='w-full h-full flex flex-col px-10 py-[60px]'>
              <div className='w-full h-auto flex flex-col z-10'>
                <h1 className='text-slate-100 font-bold text-5xl'>Welcome to Watchables</h1>
                <h1 className='text-slate-300 font-medium text-2xl'>A personal project created by Henrique Veras, using the official TMDB API.</h1>  
              </div>
              <div className='w-full h-auto flex flex-col items-center text-slate-100 text-2xl z-10'>
                <h1 className='font-bold mt-10'>Search movies, create reviews and rate your favorite films!</h1>
                <h1 className='flex mt-5'>Don't have an <h1 className='italic mx-2'>Watchables</h1> account yet?</h1>
                <button onClick={() => {navigate('/register')}}className='mt-10 bg-sky-700 px-3 py-2 text-3xl font-bold border-2 border-sky-600 rounded-md hover:brightness-125'>Click here</button>
              </div>
            </div>
          </div>
        ): (
          <div className='w-full h-[450px] relative'>
            <div className=' absolute w-full h-full bg-sky-800/40 z-10' />
            <img className='h-full w-full object-cover absolute blur-[1px] z-0 ' src={background} alt="/" />
            <div className='w-full h-full flex flex-col px-5 py-7'>
              <div className='w-full h-auto flex flex-col items-center z-10 '>
                <h1 className='text-slate-100 font-bold text-center text-3xl'>Welcome to Watchables</h1>
                <h1 className='text-slate-300 font-medium text-center text-xl mt-5'>A personal project created by Henrique Veras, using the official TMDB API.</h1>  
              </div>
              <div className='w-full h-auto flex flex-col items-center text-slate-100 text-2xl z-10'>
                <h1 className='font-bold mt-10 text-center'>Search movies, create reviews and rate your favorite films!</h1>
                <h1 className='flex mt-5 text-center'>Don't have an Watchables account yet?</h1>
                <button onClick={() => {navigate('/register')}}className='mt-7 bg-sky-700 px-3 py-2 text-3xl font-bold border-2 border-sky-600 rounded-md hover:brightness-125'>Click here</button>
              </div>
            </div>
          </div>
    )}
    </div>
  )
}
