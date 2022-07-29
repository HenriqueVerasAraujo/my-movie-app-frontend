import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SingleMovieSearch({ movie }) {
  const [releaseDate, setReleaseDate] = useState('');
  const [render, setRender] = useState(false);
  const navigate = useNavigate();


  const navigateMovie = () => {
    return navigate(`/movie/${movie.id}`);
  }

  const releaseDateFormat = () => {
    const date = movie.release_date;
    if (date === null || date === '') {
        setReleaseDate(`(N/A)`);
    } else {
      const newDate = date.slice(0, 4);
      setReleaseDate(`(${ newDate })`);
    }
  }

  const checkIfExists = () => {
    if (movie.poster_path === null) {
      movie.overview = 'not render'
    }
  }

  useEffect(() => {
    releaseDateFormat();
    checkIfExists();
    setRender(true);
  }, []);

  return (
    <div>
        {movie.overview !== 'not render' && (
          <div onClick={ navigateMovie } className='flex h-auto rounded-xl w-full bg-slate-300 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] hover:cursor-pointer'>
            <div className='w-[20%] overflow-hidden rounded-l-xl'>
                <img className='object-cover h-full' src={`https://image.tmdb.org/t/p/original/${ movie.poster_path }`} alt="Poster not found" />
            </div>
            <div className='h-full w-full flex flex-col'>
              <div className='flex justify-start items-center w-full h-[20%] rounded-tr-xl bg-sky-600 p-3 pl-7'>
                  <h1 className='text-xl text-center text-yellow-400 mr-1'>{movie.original_title}</h1>
                  <h1 className=' text-yellow-500'>{releaseDate}</h1>
              </div>
              <div className='w-full flex flex-col overflow-hidden'>
                <div className='flex px-7 py-3 justify-start items-center '>
                  <h2 className='text-start italic text-ellipsis'>{movie.overview}</h2>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}
