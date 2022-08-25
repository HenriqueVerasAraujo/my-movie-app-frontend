/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function GenreButton({ title, id }) {
    const navigate = useNavigate();

    const searchButtonGenre = () => {
          navigate(`/search?value=${id}&page=1&category=by%20movie%20genre`);
      };

  return (
      <div onClick={searchButtonGenre}>
        {title === 'Science Fiction' || title === 'TV Movie' ? (
            <div className='flex items-center justify-center px-4 bg-black opacity-50 w-[140px] h-[40px] rounded-3xl z-0 mr-1 hover:cursor-pointer hover:bg-white hover:opacity-100 hover:border-2 border-black text-white hover:text-black'>
                <h1 className=' font-bold opacity-200 text-sm z-10'>{title}</h1>
            </div>
        ) : (
            <div className='flex items-center justify-center  px-4 bg-black opacity-50 w-min h-[40px] rounded-3xl z-0 mr-1 hover:cursor-pointer hover:bg-white hover:opacity-100 hover:border-2 border-black text-white hover:text-black'>
                <h1 className=' font-bold opacity-200 text-sm z-10 '>{title}</h1>
            </div>
        )}
      </div>
  )
}
