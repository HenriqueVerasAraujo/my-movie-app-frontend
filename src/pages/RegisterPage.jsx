import React from 'react'
import RegisterCard from '../components/RegisterCard'
import image from '../assets/wallpaperbetter.jpg'

export default function RegisterPage() {
  return (
    <div className='h-full w-full'>
      <div className='w-full h-full absolute top-[75px] bg-slate-200 flex justify-center items-center -mt-[75px]'>
        <RegisterCard />
        <img className='w-full h-full object-cover absolute blur-[2px] z-0' src={image} alt="/" />
          <div className='w-[5%] h-full absolute right-0 bg-gradient-to-r from-transparent to-black' />
          <div className='w-[5%] h-full absolute left-0 bg-gradient-to-l from-transparent to-black' />
          <div className='w-full h-[5%] absolute bottom-0 bg-gradient-to-b from-transparent to-black' />
      </div>
    </div>
  )
}
