/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react'
import { SwiperSlide } from 'swiper/react';
import Slider from './common/Slider';
import RecomendationCard from './RecomendationCard'

export default function RecomendationMovie({ info }) {
    const [render, setRender] = useState(false);
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    const settings = {
        slidesPerView: 7,
        spaceBetween: 0,
        navigation: true,
        loop: true
      };

      const settings2 = {
        slidesPerView: 2,
        spaceBetween: 0,
        navigation: true,
        centeredSlides: true,
        loop: true
      };

      useEffect(() => {
        setWindowSize(window.innerWidth);
      }, []);
    
      useEffect(() => {
        if (info.length !== 0) {
         return setRender(true);
        };
      },[]);

  return (
    <div className='w-full h-full flex justify-center'>
      {windowSize > 760 ? (
        <div className='w-full md:w-[80%] h-auto mt-10'>
            {render && (
            <div className='flex flex-col w-full h-auto'>
              <h1 className='font-bold text-3xl px-10 text-zinc-700 mb-4'>More movies like this</h1>
              <div className='w-full h-[460px] flex'>
                <Slider settings={settings}>
                  {info.map((s) => (
                    <SwiperSlide>
                      <RecomendationCard content={s} />
                    </SwiperSlide>
                  ))}
                </Slider>
              </div>
            </div>
          )}
        </div>
      ) :(
        <div className='w-full md:w-[80%] h-auto mt-10'>
            {render && (
            <div className='flex flex-col w-full h-auto'>
              <h1 className='font-bold text-3xl ml-2 text-zinc-700 mb-4'>More movies like this</h1>
              <div className='w-full h-[460px] flex'>
                <Slider settings={settings2}>
                  {info.map((s) => (
                    <SwiperSlide>
                      <RecomendationCard content={s} />
                    </SwiperSlide>
                  ))}
                </Slider>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
