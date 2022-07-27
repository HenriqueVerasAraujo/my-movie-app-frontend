import React, { useState, useEffectm, useContext } from 'react'
// import SingleMoviePoster from '../components/SingleMoviePoster';
import {defaultSearchMovie, newSearchMovie } from '../links/movieFilter'
import myContext from '../context/MyContext';


export default function Navbar() {
  const [inputField, setInputField] = useState('');
  const { movieData, setMovieData } = useContext(myContext);

  return (
    <div className='w-full h-[75px] flex justify-center items-center p-3 bg-sky-800'>
      <div className='w-full h-full flex items-center bg-blue-700'>
        <div>
          <h1 className='text-3xl font-bold text-amber-50'>Logo</h1>
        </div>
        <div className='w-[50%] flex'>
          <input className='w-full h-[40px] rounded-l-3xl pl-3' type="text" placeholder='Search a movie by title, actor/actress or genre...' />
          <button className='flex justify-center items-center w-[70px] h-[40px] rounded-r-3xl bg-sky-900 p-3 px-10 text-amber-50 font-bold uppercase' type='button'>Search</button>
        </div>
      </div>
    </div>
  )
}
