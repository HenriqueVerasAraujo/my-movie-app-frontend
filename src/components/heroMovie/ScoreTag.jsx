import React, { useState, useEffect } from 'react'
import yes from '../../assets/yes.png'
import no from '../../assets/no.png'

export default function ScoreTag({ score }) {
  const [scoreFormat, setScoreFormat] = useState('');

  const formatScore = () => {
    const newScore = ((score.toFixed(2)) * 10).toFixed(1);;
    return setScoreFormat(newScore)
  }

  useEffect(() => {
    formatScore()
  }, []);

  return (
    <div className='flex flex-col w-[80px] items-center'>
      <div className='flex flex-col items-center text-white'>
        <h1 className='font-bold'>TMDB </h1>
        <h1 className='-mt-2'>user score</h1>
      </div>
      <div className=''>
        { Number(score) < 5 ? (
            <img className='h-[50px] w-[50px]' src={no} alt="/" />
        ) : (
            <img className='h-[50px] w-[50px]' src={yes} alt="/" />
        ) }
      </div>
      <div className='flex flex-col items-center'>
        <h1 className='text-2xl font-bold text-white'>{`${scoreFormat}%`}</h1>
        <h1 className='text-white font-bold -mt-2'>Approved</h1>
      </div>
    </div>
  )
}
