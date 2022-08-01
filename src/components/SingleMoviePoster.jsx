import React from 'react'

export default function SingleMoviePoster({ movie }) {
  return (
    <div key={movie.id} className='flex flex-col h-[400px] w-[200px] bg-slate-100 mb-10'>
        <div className='flex justify-center items-center w-full h-[20%] bg-blue-600 p-3'>
            <h1 className='text-xl font-bold text-center'>{movie.original_title}</h1>
        </div>
        <div>
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="poster of the movie" />
        </div>
    </div>
  )
}
