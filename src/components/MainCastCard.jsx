import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import faceless from '../assets/faceless.jpg'

export default function MainCastCard({ info }) {
  const navigate = useNavigate();
  const [render, setRender] = useState(false);

  const formatNameFunction = (name) => {
    const newValue = name.split(' ').join('+');
        return newValue;
    };

  const redirectFunction = async() => {
    const nameFormat = formatNameFunction(info.name);
    navigate(`/search?value=${nameFormat}&page=1&category=by+person+name`);
  };

  useEffect(() => {
    setTimeout(() => {
      setRender(true);
  }, 1000);
  }, [])

  return (
    <div onClick={redirectFunction} className='flex flex-col justify-center items-center h-[330px]'>
      {render && (
        <div className='flex flex-col items-center justify-center w-[150px] h-[300px] border-neutral-500 border-[1px] rounded-md shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] hover:cursor-pointer hover:-translate-y-2 duration-200 ease-in-out'>
            <div className='w-full rounded-md '>
              {info.profile_path !== null ? (
                <img className='w-full rounded-t-md' src={`https://www.themoviedb.org/t/p/w138_and_h175_face${info.profile_path}`}alt="/" />
              ) : (
                <img className='w-full h-[190px] object-cover rounded-t-md' src={ faceless }alt="/" />
              )}
              
            </div>
            <div className='h-full w-full flex flex-col items-start p-2 bg-neutral-200 rounded-b-md'>
                <h1 className='font-bold' >{info.name}</h1>
                <h1 className='opacity-70'>{info.character}</h1>
            </div>
        </div>
      )}
    </div>
  )
}
