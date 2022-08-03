import React, { useState, useEffect } from 'react'
import { urlApi } from '../../links/important';
import { StarIcon } from '@heroicons/react/outline';
import { StarIcon as SolidStar } from '@heroicons/react/solid';

export default function PopUp({ movie, movieId }) {
    const [title, setTitle] = useState('');
    const [reviewBody, setReviewBody] = useState('');
    const [score, setScore] = useState('N/A');
    const [username, setUserName] = useState('');
    const [render, setRender] = useState(false);
    const [userId, setUserId] = useState('');
    const [color, setColor] = useState('blue-900');
    const [color2, setColor2] = useState('blue-900');
    const [countTitle, setCountTitle] = useState(0);
    const [countReview, setCountReview] = useState(0);
    const [errMessage1, setErrMessage1] = useState('');
    const [errMessage2, setErrMessage2] = useState('');
    const [errMessage3, setErrMessage3] = useState('');

    const submitFunction = async() => {
        
    }

    const getUsername = () => {
        const user = localStorage.getItem('username');
        const userIdd = localStorage.getItem('id');
        setUserName(user);
        setUserId(userIdd);
    }

    const titleInput = ({ target }) => {
        setTitle(target.value);
    }

    const reviewInput = ({ target }) => {
        setReviewBody(target.value);
    }

    const scoreInput = ({ target }) => {
        if (target.value === 'N/A') {
            console.log(score);
            return setScore(target.value);
        }
        console.log(score);
        return setScore(Number(target.value));
    };

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
        countCharacters(reviewBody, setCountReview);
        if (countTitle < 60) {
            setColor('blue-900');
        } else {
            setColor('red-600');
        }
        if (countReview < 1000) {
            setColor2('blue-900');
        } else {
            setColor2('red-600');
        }
    }, [title, reviewBody]);

  return (
    <div className='w-full h-screen fixed z-10 bg-black/90 flex justify-center items-center'>
        {render && (
            <div className='w-[90%] sm:w-[60%] lg:w-[40%] h-[90%] bg-neutral-100  absolute items-center flex flex-col rounded-md'>
                <div className='w-full h-auto flex justify-end relative'>
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
                                className='w-full border-2 border-sky-600 rounded-md text-xl text-zinc-700 p-1' 
                                id='title' 
                                type="text" 
                                placeholder='The headline of your review here...' />
                                
                                {errMessage1 !== '' && (
                                    <h1 className='text-red-600 -mt-4 text-lg'>{errMessage1}</h1>
                                )}
                            </div>
                            <div className='flex justify-center items-end '>
                                <h1 className={`text-${color} text-lg ml-2 mb-[7px]`}>{countTitle}/60 characters</h1>
                            </div>
                        </div>

                        <div className='flex flex-col w-full mt-8'>
                            <div className='flex items-center'>
                                <label className='text-2xl text-zinc-700' htmlFor="review">Review:</label>
                                <h1 className={`text-2xl text-${color2} text-lg ml-1`}>({countReview}/1000 characteres)</h1>

                            </div>
                            <textarea 
                            className='w-full h-[400px] resize-none flex items-start justify-start text-zinc-700 border-2 border-sky-600 rounded-md text-xl p-1' 
                            id='review' 
                            onChange={reviewInput}
                            type="textarea"
                            placeholder='Your review here...'
                             />
                            {errMessage2 !== '' && (
                                <h1 className='text-red-600 -mt-4 text-lg'>{errMessage2}</h1>
                            )}
                        </div>
                        <div className='w-full absolute bottom-[60px] flex items-center mt-10'>
                            <label className='text-xl text-zinc-700 mr-1 font-bold' htmlFor='score'>Final Score:</label>
                            <select onChange={ scoreInput } id='score' className='rounded-md text-xl text-zinc-700 w-min font-bold'>
                                <option className='text-2xl' value='N/A'>N/A</option>
                                <option className='text-2xl' value='0'>0</option>
                                <option className='text-2xl' value='1'>1</option>
                                <option className='text-2xl' value='3'>3</option>
                                <option className='text-2xl' value='4'>4</option>
                                <option className='text-2xl' value='5'>5</option>
                                <option className='text-2xl' value='6'>6</option>
                                <option className='text-2xl' value='7'>7</option>
                                <option className='text-2xl' value='8'>8</option>
                                <option className='text-2xl' value='9'>9</option>
                                <option className='text-2xl' value='10'>10</option>
                            </select>
                                <h1 className='text-xl text-zinc-700 mr-1 font-bold'>/10</h1>
                                <div className='relative flex'>
                                    <StarIcon className='h-7 w-7' />
                                    <SolidStar className='h-7 w-7 absolute text-yellow-300'/>
                                </div>
                        </div>
                    </form>
                    <button
                    onClick={submitFunction}
                    className='absolute bottom-[50px] right-[150px] px-10 py-3 rounded-lg border-2 border-sky-600 hover:bg-sky-400 bg-sky-600 font-bold text-neutral-50'
                    >
                        SUBMIT REVIEW
                    </button>
                </div>
            </div>
        )}
    </div>
  )
}
