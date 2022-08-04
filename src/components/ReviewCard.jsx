import React from 'react'
import moment from 'moment';
import { StarIcon } from '@heroicons/react/outline';
import { StarIcon as SolidStar } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';

export default function ReviewCard({ review }) {
    const navigate = useNavigate();

    const formatDate = () => {
        const date = `${review.createdAt}`;
        const newDate = moment(date).format('DD/MM/YYYY - HH:MM');
        return newDate;
    }

    const redirect = () => {
        navigate(`/review/${review.id}`);
    }
  return (
    <div className='w-[70%] h-[120px] flex flex-col bg-neutral-200  rounded-md shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] hover:shadow-[10px_10px_20px_0px_rgba(0,0,0,0.3)] hover:-translate-x-2 hover:-translate-y-2 duration-200 ease-in-out'>
       {/* HEADER */}
        <div className='w-full flex items-center justify-between px-5 h-[25%] rounded-t-md bg-sky-700'>
            <div className='w-[80%] h-full flex justify-start items-center'>
                <div className='flex mr-2'>
                    <h1 className='text-white mr-2'>Review by:</h1>
                    <h1 className='font-bold text-yellow-300'>{review.user.username}</h1>
                </div>
                <div>
                    <h1 className='text-white opacity-80'>{formatDate()}</h1>
                </div>
            </div>
            <div className='w-[20%] flex justify-center'>
                <h1 className='text-white ml-5'>Review score</h1>
            </div>
        </div>
        {/* BODY */}
        <div onClick={redirect} className=' w-full h-full flex items-center px-5 hover:cursor-pointer'>
            <div className='w-[80%] h-full flex items-center'>
                <h1 className='text-xl font-medium opacity-70'>{review.title}</h1>
            </div>
            <div className='w-[20%] h-full relative flex  justify-center items-center'>
                <div className='relative flex'>
                    <StarIcon className='h-7 w-7' />
                    <SolidStar className='h-7 w-7 absolute text-yellow-300'/>
                </div>
                <h1 className='font-bold text-3xl opacity-70'>{`${review.score}/10`}</h1>
            </div>
        </div>
        {/* FOOTER */}
        <div className='w-full h-[60%] bg-neutral-300  opacity-50 rounded-b-md'>

        </div>
    </div>
  )
}   

// title, author, data, score, likes, comments, 