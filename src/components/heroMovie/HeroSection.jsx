/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import GenreButton from './GenreButton'
import ScoreTag from './ScoreTag'
import BudgetTag from './BudgetTag'
import BackGroundCast from './BackGroundCast'

export default function HeroSection({ movieData, date, director, genres }) {
  return (
    <div className='w-full h-[600px] md:h-[550px] bg-black relative flex justify-center'>
        <div className='w-[90%] md:w-[70%] h-full absolute z-10 md:flex items-center'>
            <img className='h-[440px] hidden md:flex rounded-lg' src={`https://image.tmdb.org/t/p/original${movieData[0].poster_path}`} alt="Movie poster not found" />
            <div className='w-full h-full md:h-[80%] overflow-hidden flex flex-col md:ml-7'>
                <div className='flex items-center mt-5 md:mt-0 justify-center md:justify-start'>
                    <h1 className='text-white font-bold text-3xl text-center md:text-start'>{movieData[0].title}<span className='text-neutral-200 text-2xl ml-2 mt-1'>{`(${date})`}</span></h1>
                </div>
                <div className='flex md:ml-2 text-white justify-center md:justify-start'>
                        <h1 className='mr-3'>{`${movieData[0].release_date} (US)`}</h1>
                        <h1 className=''>{`Running time: ${movieData[0].runtime} minutes`}</h1>
                </div>

                <div className='flex mt-2 justify-center md:justify-start'>
                    {genres.map((singleGenre) => (
                        <div key={singleGenre.name}>
                            <GenreButton title={singleGenre.name} id={singleGenre.id}/> 
                        </div>
                    ))}
                </div>

                <div className='md:mt-7 mt-2 md:-ml-5 flex w-full justify-center md:justify-around md:w-[60%]'>
                    <ScoreTag score={movieData[0].vote_average}/>
                    <BudgetTag cost={movieData[0].budget} back={movieData[0].revenue}/>
                    <BackGroundCast info={director} />
                </div>

                <div className=' md:ml-4 mt-5 text-white italic flex flex-col md:items-start items-center'>
                    <h1 className='font-bold opacity-80 text-lg'>{movieData[0].tagline}</h1>
                    <h1 className='text-md'>{movieData[0].overview} </h1>
                </div>
            </div>
        </div>
        <div className='w-full h-[600px] md:h-[550px] opacity-60 absolute bg-sky-800' />
        <div className='w-full h-[50%] absolute mt-[300px] md:mt-[275px] bg-gradient-to-b from-transparent to-black' />
        <img className='object-cover h-full w-full' src={`https://image.tmdb.org/t/p/original/${movieData[0].backdrop_path}`} alt="Movie poster not found" />
    </div>
  )
}
