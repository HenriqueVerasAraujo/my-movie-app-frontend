import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { urlApi } from '../links/movieFilter';
import { useParams } from 'react-router-dom';
import { movieById } from '../links/movieFilter';
import { StarIcon } from '@heroicons/react/outline';
import { StarIcon as SolidStar } from '@heroicons/react/solid';
import CommentCard from '../components/CommentCard';

export default function ReviewPage() {
    const { id } = useParams();
    const [reviewData, setReviewData] = useState('');
    const [movieId, setMovieId] = useState(0);
    const [movieInfo, setMovieInfo] = useState('');
    const [render, setRender] = useState(false);
    const [errMessage4, setErrMessage4] = useState('');
    const [errMessage1, setErrMessage1] = useState('');
    const [input, setImput] = useState('');

    const fetchData = async() => {
        axios.get(`${urlApi}/reviews/getone/${id}`).then((response) => {
            setReviewData(response.data);
            return fetch(movieById(response.data.movieId))
        }).then((response) => response.json()).then((response) => setMovieInfo(response));
    };

    const textInput = ({ target }) => {
        setImput(target.value)
    }

    const createComment = async() => {
        setErrMessage4('')
        setErrMessage1('')
        const data = { commentBody: input }
        const createComment = await axios
        .post(`${urlApi}/comments/create/${id}`, 
        data,
        {headers: {token: localStorage.getItem('token')}});
        if (createComment.data.errMessage4) {
            return setErrMessage4('You need to be logged in to create a comment!');
        }
        if (createComment.data.errMessage1) {
            return setErrMessage4(createComment.data.errMessage1);
        }
        setRender(false);
        await fetchData();
        
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (reviewData !== '') {
            setRender(true);
        }
    }, [reviewData]);
    
  return (
    <div className='w-full h-screen bg-slate-200'>
        <div className='h-auto w-full absolute top-[75px]'>
            <div className='h-full w-full flex justify-end'>
            {/* SIDE */}
                <div className='w-[20%] h-[93%] fixed left-0 z-10 bg-slate-900'>
                    {render && (
                        <div className='w-full h-full relative flex items-center'>
                            <div className='absolute w-full h-full  bg-sky-700/50'></div>
                            <div className='absolute w-full h-[40%] top-0 bg-gradient-to-b from-black to-transparent'></div>
                            <div className='absolute w-full h-[40%] bottom-0 bg-gradient-to-t from-black to-transparent'></div>
                            <img className='h-full w-full object-cover' src={`https://image.tmdb.org/t/p/original${movieInfo.poster_path}`} alt="/" />
                        </div>
                    )}
                </div>
            {/* REVIEW  */}
                <div className='w-[80%] h-auto bg-slate-200 flex flex-col items-center'>
                    {render && (
                        // ReviewBody
                        <div className='w-[97%] h-auto'>
                            <div className='w-full h-auto mt-4 bg-slate-300 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]'>
                                <div className='flex flex-col text-zinc-800 p-5 w-full'>
                                    <div className='flex w-full justify-between'>
                                        <div>
                                            <h1 className='flex text-3xl'>A review by <h1 className='ml-1 text-sky-700'>{reviewData.user.username}.</h1></h1>
                                            <h1 className='text-lg flex'>About: <h1 className='ml-1 font-bold'>{movieInfo.title}</h1></h1>
                                        </div>
                                        <div className='flex justify-center items-center'>
                                            <h1 className='text-2xl mr-1'>Final Score:</h1>
                                            <h1 className='text-2xl'>{reviewData.score}/10</h1>
                                            <div className='relative flex mb-1'>
                                                <StarIcon className='h-9 w-9' />
                                                <SolidStar className='h-9 w-9 absolute text-yellow-300'/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-3 w-full'>
                                        <h1 className='text-lg font-medium text-zinc-800'>{reviewData.title}</h1>
                                    </div>
                                    <div className='mt-1'>
                                        <h1 className='text-lg break-words text-zinc-800'>{reviewData.reviewBody}</h1>
                                    </div>
                                </div>
                            </div> 
                            {/* Comments  */}
                            <div className='w-full h-auto mt-[50px] p-5 flex flex-col b'>
                                <h1 className='text-zinc-700 text-3xl mb-7'>Comments about this review</h1>
                                <div className='w-full h-auto'>
                                    <form>
                                        <label className='text-xl text-zinc-700' htmlFor="comment ">Create a new Comment:</label>
                                        <textarea onChange={textInput} className='w-full h-[70px] rounded-md mt-1 resize-none border-2 border-sky-700' name="comment" id="comment "></textarea>
                                    </form>
                                    <div className='flex mb-5 -mt-2 items-center'>
                                        <button className='text-lg mx-3 font-bold' type='button ' onClick={createComment}>Send</button>
                                        {errMessage4 !== '' && (
                                            <h1 className='text-red-600'>{errMessage4}</h1>
                                        )}
                                        {errMessage1!== '' && (
                                            <h1 className='text-red-600'>{errMessage1}</h1>
                                        )}
                                    </div>
                                </div>
                                {reviewData.comments.length !== 0 ? (
                                        reviewData.comments.map((comment) => (
                                            <div key={comment.id}>
                                                <CommentCard comment={comment}/>
                                            </div>
                                        ))
                                ):(
                                    <div>
                                        <h1 className='text-lg text-zinc-700'>There are no comments for this review</h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}
