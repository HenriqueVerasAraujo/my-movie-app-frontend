/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SingleMovieSearch({ movie }) {
  const [releaseDate, setReleaseDate] = useState('');
  const [render, setRender] = useState(false);
  const navigate = useNavigate();


  const navigateMovie = () => navigate(`/movie/${movie.id}`);

  const releaseDateFormat = () => {
    const date = movie.release_date;
    if (date === null || date === '' || date === undefined) {
        setReleaseDate(`(N/A)`);
    } else {
      const newDate = date.slice(0, 4);
      setReleaseDate(`(${ newDate })`);
    }
  };

  const checkIfExists = () => {
    if (movie.poster_path === null) {
      movie.overview = 'not render'
    }
  };

  useEffect(() => {
    releaseDateFormat();
    checkIfExists();
    setRender(true);
  }, []);

  return (
    <div>
      {render && (
        <div className=''>
            {movie.overview !== 'not render' && (
              <div onClick={ navigateMovie } className='flex h-auto w-auto rounded-md bg-slate-300 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] hover:cursor-pointer hover:brightness-110 hover:translate-x-4 duration-200 ease-in-out'>
                <div className='w-[20%] overflow-hidden rounded-l-md hidden md:flex'>
                    <img className='object-cover h-full' src={`https://image.tmdb.org/t/p/original/${ movie.poster_path }`} alt="Poster not found" />
                </div>
                <div className='h-full w-full flex flex-col'>
                  <div className='flex items-center justify-center md:justify-start w-full h-[20%] rounded-tr-md md:rounded-tr-md bg-sky-600 p-3 pl-7'>
                      <h1 className='text-xl text-center text-white'>{movie.original_title}<span className='text-white/80 ml-1'>{releaseDate}</span></h1>
                      {/* <h1 className=' text-white/80'>{releaseDate}</h1> */}
                  </div>
                  <div className='w-full overflow-hidden rounded-b-md md:hidden'>
                    <img className='object-cover w-full' src={`https://image.tmdb.org/t/p/original/${ movie.poster_path }`} alt="Poster not found" />
                </div>
                  <div className='w-full hidden md:flex flex-col overflow-hidden' >
                    <div className='flex px-7 py-3 justify-start items-center '>
                      <h2 className='text-start italic text-ellipsis'>{movie.overview}</h2>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  )
}
