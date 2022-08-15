/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PopularSliderCard({ content }) {
    const navigate = useNavigate();
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onClick={() => navigate(`/movie/${content.id}`)} className='h-[480px] w-auto relative flex justify-center items-center'>
          <div className='h-[450px] w-[98%] flex flex-col justify-start items-center rounded-md
      relative hover:cursor-pointer shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]'>
            <div className='h-auto w-[90%] flex flex-col items-center absolute z-10 mt-10'>
                <h1 className='text-white text-5xl font-bold mb-5'>{content.title}</h1>
                <div className='w-full h-auto flex'>
                    <img className='w-[17%]' src={`https://image.tmdb.org/t/p/original/${content.poster_path}`} alt="" />
                    <h1 className='w-[80%] ml-10 mt-5 text-white text-xl italic'>{content.overview}</h1>
                </div>
                <button type='button' className='h-auto w-[30%] absolute bg-sky-700 bottom-0 text-white text-2xl font-bold p-3 '>Read more</button>
            </div>
              <div className='h-full w-full flex justify-center'>
                  <img className=' h-full w-full rounded-md object-fill hover:scale-125 duration-300 ease-out overflow-hidden' src={`https://image.tmdb.org/t/p/original/${content.backdrop_path}`} alt="/" />
                  <div className='bg-sky-700/50 absolute h-full w-full rounded-md' />
                  <div className='w-full h-[40%] bottom-0 absolute bg-gradient-to-b from-transparent rounded-b-md to-black' />
              </div>
          </div>
      </div>
    )
};




