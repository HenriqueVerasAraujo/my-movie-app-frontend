import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { urlApi } from '../links/movieFilter';
import no from '../assets/no.png'
import ReviewCard from './ReviewCard';
import myContext from '../context/MyContext';

export default function ReviewSection({ movieName, movieId }){ 
    const [allReviews, setAllReviews] = useState([]);
    const [render, setRender] = useState(false);
    const {popUp, setPopUp } = useContext(myContext);

    const fetchData = async() => {
        const reviews = await axios.get(`${urlApi}/reviews/${movieId}`);
        if (reviews.length === 0) {
            return render(false);
        }
        setAllReviews(reviews.data);
    };

    const openPopUp = () => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token) {
            return alert('You need to be logged in to post a Review!')
        } else {
           return setPopUp(true);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {
        if (allReviews.length !== 0) {
            setRender(true);
        }
    },[allReviews]);


  return (
        <div className='w-[80%] h-[3000px] flex flex-col px-10 mt-10'>
            <div className='text-3xl'>
                <h1 className='flex'>Users reviews for <h1 className='text-sky-700 ml-2'>{ movieName }</h1></h1>
            </div>
            {render && (
                <div className='w-[70%] flex justify-center mt-6'>
                        <div onClick={openPopUp} className='bg-sky-700 py-2 w-full flex justify-center items-center hover:cursor-pointer rounded-md shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] hover:bg-blue-600  hover:brightness-125'>
                            <h1 className='text-2xl font-medium opacity-80 text-white'>Do you want to create a review for this movie? Click here. </h1>
                        </div>
                    </div>
            )}
            <div className='mt-7'>
            {render ? (
                allReviews.map((singleReview) => (
                    <div className='mb-6'>
                        <ReviewCard review={ singleReview }/>
                    </div>
                ))
            ): (
                <div className='w-full flex justify-center mt-6'>
                    <div className='bg-neutral-200 p-7 flex flex-col justify-center items-center rounded-md shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]'>
                        <h1 className='text-xl opacity-80 mb-[15px]'>There are no reviews for this movie yet.</h1>
                        <h1 className='text-xl opacity-80 mb-[15px]'>Do you want to create the first one?</h1>
                        <button onClick={openPopUp} className='bg-sky-700 w-[50%] p-2  font-bold text-white text-2xl rounded-md hover:brightness-150'>Click here</button>
                    </div>
                </div>
            )}
            </div>
            
        </div>
  )
}