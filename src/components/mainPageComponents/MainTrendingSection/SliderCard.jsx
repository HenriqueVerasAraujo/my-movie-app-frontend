/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function SliderCard({ content }) {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    const navigate = useNavigate();

  return (
      <div>
          {windowSize > 760 ? (
                  <div onClick={() => navigate(`/movie/${content.id}`)} className='h-[440px] w-auto flex justify-center items-center hover:-translate-y-3 duration-200 ease-in-out'>
                      <div className='h-[400px] w-[187px] flex flex-col justify-start items-center rounded-md
                  relative hover:cursor-pointer border-2 border-zinc-400 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]'>
                          <div className='h-[70%] w-full flex justify-center'>
                              <img className=' h-full rounded-t-md' src={`https://image.tmdb.org/t/p/original/${content.poster_path}`} alt="/" />
                          </div>
                          <div className='flex flex-col w-full h-full justify-start items-center rounded-b-md bg-neutral-200 '>
                              <h1 className='text-xl text-center font-medium text-zinc-800 pt-2'>{ content.title }</h1>
                          </div>
                      </div>
                  </div>
          ) : (
            <div onClick={() => navigate(`/movie/${content.id}`)} className='h-[360px] w-auto flex justify-center items-center hover:-translate-y-3 duration-200 ease-in-out'>
            <div className='h-[300px] w-[187px] flex flex-col justify-start items-center rounded-md
        relative hover:cursor-pointer border-2 border-zinc-400 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]'>
                <div className='h-[80%] w-full flex justify-center bg-amber-900'>
                    <img className='w-full h-full rounded-t-md object-cover' src={`https://image.tmdb.org/t/p/original/${content.poster_path}`} alt="/" />
                </div>
                <div className='flex flex-col w-full h-full justify-start items-center rounded-b-md overflow-y-hidden bg-neutral-200 '>
                    <h1 className='text-md text-center font-medium text-zinc-800 pt-2'>{ content.title }</h1>
                </div>
            </div>
        </div>
          )}

      </div>
  )
}
