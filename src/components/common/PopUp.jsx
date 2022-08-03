import React, { useState, useEffect } from 'react'
import { urlApi } from '../../links/important';

export default function PopUp({ movie, movieId }) {
    const [title, setTitle] = useState('');
    const [reviewBody, setReviewBody] = useState('');
    const [score, setScore] = useState('N/A');
    const [username, setUserName] = useState('');
    const [render, setRender] = useState(false);
    const [userId, setUserId] = useState('');
    const [color, setColor] = useState('blue-900');
    const [countTitle, setCountTitle] = useState(0);
    const [errMessage1, setErrMessage1] = useState('');
    const [errMessage2, setErrMessage2] = useState('');
    const [errMessage3, setErrMessage3] = useState('');


    const getUsername = () => {
        const user = localStorage.getItem('username');
        const userIdd = localStorage.getItem('id');
        setUserName(user);
        setUserId(userIdd);
    }

    const titleInput = ({ target }) => {
        setTitle(target.value);
    }
    const countCharacters = (con, setter) => {
        const number = con.length;
        setter(number);
    }

    useEffect(() => {
        getUsername();
        setRender(true);
    },[]);

    useEffect(() => {
        countCharacters(title, setCountTitle);
        if (countTitle < 60) {
            setColor('blue-900');
        } else {
            setColor('red-600');
        }
    }, [title]);

  return (
    <div className='w-full h-screen fixed z-10 bg-black/90 flex justify-center items-center'>
        {render && (
            <div className='w-[90%] sm:w-[60%] lg:w-[40%] h-[90%] bg-neutral-300  absolute items-center flex flex-col rounded-md'>
                <div className='w-full h-auto flex justify-end'>
                    <h1 className='w-auto font-bold text-4xl px-2 py-0 m-3 bg-sky-700 rounded-md text-white border-2 hover:text-sky-700 hover:bg-white/0 border-sky-700 hover:cursor-pointer'>X</h1>
                </div>
                <div className='flex flex-col text-zinc-800  w-[95%]'>
                    <h1 className='flex text-3xl'>A review by <h1 className='ml-1 text-sky-700'>{username}.</h1></h1>
                    <h1 className='text-lg flex'>About: <h1 className='ml-1 font-bold'>{movie.title}</h1></h1>
                </div>
                <div className='w-[95%] mt-8'>
                    <form className='flex flex-col'>
                        <div className='flex w-full '>
                            <div className='flex flex-col w-[70%]'>
                                <label className='text-2xl text-zinc-700' htmlFor="title">Title:</label>
                                <input 
                                onChange={titleInput} 
                                className='w-full border-2 border-sky-600 rounded-md text-xl p-1' 
                                id='title' 
                                type="text" 
                                placeholder='The headline of your review here...' />
                                
                                {errMessage1 !== '' && (
                                    <h1 className='text-red-600 -mt-4 text-lg'>{errMessage1}</h1>
                                )}
                            </div>
                            <div className='flex justify-center items-end '>
                                <h1 className={`text-${color}  text-lg ml-2 mb-[7px]`}>{countTitle}/60 characters</h1>
                            </div>
                        </div>

                        {/* <div className='flex flex-col w-full'>
                            <label className='text-2xl text-zinc-700' htmlFor="title">Title:</label>
                            <input className='border-2 border-sky-600 rounded-md text-xl p-1' id='title' type="text" placeholder='The headline of your review here...' />
                            {errMessage1 !== '' && (
                                <h1 className='text-red-600 -mt-4 text-lg'>{errMessage1}</h1>
                            )}
                        </div> */}
                    </form>
                </div>
            </div>
        )}
    </div>
  )
}
