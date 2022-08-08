import React from 'react'
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { Navigation } from 'swiper';
import './Slider.css';


export default function Slider({ settings, children }) {
  return (
    <div className='h-full w-full flex items-start'>
        <Swiper modules={ [Navigation] }{...settings} >
        {children}
        </Swiper>
    </div>
  )
}
