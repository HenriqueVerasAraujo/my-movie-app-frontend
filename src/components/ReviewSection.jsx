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
        console.log(reviews.data);
    };

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
            <div className='mt-7'>
            {render ? (
                allReviews.map((singleReview) => (
                    <div className='mb-6'>
                        <ReviewCard review={ singleReview }/>
                    </div>
                ))
            ): (
                <div className='w-full flex justify-center'>
                    <div className='bg-neutral-200 p-5 flex flex-col justify-center items-center'>
                        <h1 className='text-2xl opacity-80'>There are no reviews for this movie yet.</h1>
                        <img className='w-[20%]' src={no} alt="/" />
                        <h1 className='text-2xl opacity-80'>Do you want to create the first one?</h1>
                        <button onClick={() => setPopUp(true)} className='bg-sky-600 w-[80%] p-2 text-white text-2xl rounded-md'>CLICK HERE</button>
                    </div>
                </div>
            )}
            </div>
            
        </div>
  )
}