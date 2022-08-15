/* eslint-disable react/prop-types */
import React from 'react'
import moment from 'moment';

export default function CommentCard({ comment }) {
    const formatDate = () => {
        const date = `${comment.createdAt}`;
        const newDate = moment(date).format('DD/MM/YYYY - HH:MM');
        return newDate;
    }

  return (
    <div className='w-[100%] flex flex-col h-auto mb-5 bg-slate-300 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]'>
        <div className='w-full h-5 flex bg-sky-700 items-center p-2'>
            <h1 className='text-white mr-2' >Comment by:</h1>
            <h1 className='font-bold text-yellow-300 mr-2'>{comment.user.username}</h1>
            <h1 className='text-white opacity-80'>{formatDate()}</h1>
        </div>
        <div>
            <h1 className='text-lg p-2'>{comment.commentBody}</h1>
        </div>
    </div>
  )
}
