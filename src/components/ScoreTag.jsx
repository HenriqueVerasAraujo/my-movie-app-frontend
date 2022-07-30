import React from 'react'
import yes from '../assets/yes.png'
import no from '../assets/no.png'

export default function ScoreTag({ score }) {
  return (
    <div className=''>
        { Number(score) < 5 ? (
            <img className='h-[50px] w-[50px]' src={no} alt="/" />
        ) : (
            <img className='h-[50px] w-[50px]' src={yes} alt="/" />
        ) }
    </div>
  )
}
