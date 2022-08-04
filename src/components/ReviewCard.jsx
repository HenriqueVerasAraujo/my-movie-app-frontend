import React, {useState, useEffect} from 'react'
import moment from 'moment';
import { StarIcon, AnnotationIcon, ThumbUpIcon } from '@heroicons/react/outline';
import { StarIcon as SolidStar, ThumbUpIcon as SolidThumb } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { urlApi } from '../links/movieFilter';

export default function ReviewCard({ review }) {
    const navigate = useNavigate();
    const [renderDelete, setRenderDelete] = useState(false);

    const formatDate = () => {
        const date = `${review.createdAt}`;
        const newDate = moment(date).format('DD/MM/YYYY - HH:MM');
        return newDate;
    }

    const redirect = () => {
        navigate(`/review/${review.id}`);
    }

    const checkIfIsUser = () => {
        const userIdFromLocal = localStorage.getItem('id');
        if (Number(userIdFromLocal) === review.userId) {
            return setRenderDelete(true);
        }
        return setRenderDelete(false);
    }

    useEffect(() => {
        checkIfIsUser();
    }, [])

    const deleteFunction = async() => {
        const deleteReview = await axios.delete(`${urlApi}/reviews/${review.id}`);
        return deleteReview;
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
        <div className='w-full h-[60%] flex justify-between bg-neutral-300/50 rounded-b-md'>
            {renderDelete ? (
                <button onClick={deleteFunction} className='p-2 bg-slate-700 hover:bg-red-700 text-white font-bold rounded-bl-md'>Delete</button>
            ) : (
                <button onClick={deleteFunction} className='p-2 bg-slate-700/0 hover:cursor-default text-white/0 font-bold'>Delete</button>
            )}
            <div className='flex items-center'>
                <div onClick={redirect} className='flex h-full w-auto items-center hover:cursor-pointer pr-5'>
                    <ThumbUpIcon className='h-7 w-7 text-zinc-700' />
                    {/* <h1 className='text-xl font-medium text-zinc-700'>{review.comments.length}</h1> */}
                </div>

                <div onClick={redirect} className='flex h-full w-auto items-center hover:cursor-pointer pr-10'>
                    <AnnotationIcon className='h-7 w-7 text-zinc-700' />
                    <h1 className='text-xl font-medium text-zinc-700'>{review.comments.length}</h1>
                </div>
            </div>
        </div>
    </div>
  )
}   
