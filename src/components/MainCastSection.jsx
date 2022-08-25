/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react'
import { SwiperSlide } from 'swiper/react';
import Slider from "./common/Slider";
import MainCastCard from "./MainCastCard"

import 'swiper/css';
import 'swiper/css/navigation';


export default function MainCastSection({ actorInfo }) {
  const [render, setRender] = useState(false);
  const [mainCast, SetMainCast] = useState(['']);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const settings = {
		slidesPerView: 8,
		spaceBetween: 10,
		navigation: true
	}

  const settings2 = {
		slidesPerView: 2.2,
		spaceBetween: 0,
		navigation: false,
    centeredSlides: true,
    loop: true
	}

  const sliceMainCast = () => {
    const newMain = actorInfo.cast.slice(0, 20)
    SetMainCast(newMain);
  }

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    sliceMainCast();
    setRender(true)
  }, [])

  return (
    <div className='h-full w-full flex justify-center'>
        {windowSize > 760 ? (
          <div className='h-auto w-[80%] flex flex-col'>
            <div className='pb-5 pt-10'>
              <h1 className='font-bold text-3xl px-10 text-zinc-700'>Main Cast</h1>
            </div>
            <div className='w-full h-[350px] flex flex-col justify-start items-start'>
            {render && (
              <Slider settings={settings}>
                {mainCast.map((singleActor) => (
                  <SwiperSlide>
                      <MainCastCard info={singleActor}/>
                  </SwiperSlide>
                ))}
              </Slider>
            )}
            </div>
          </div>
        ) : (
          <div className='w-full h-auto flex flex-col'>
            <div className='pb-5 pt-10'>
              <h1 className='font-bold text-3xl px-2 md:px-10 text-zinc-700'>Main Cast</h1>
            </div>
            <div className='w-full h-[350px] flex flex-col justify-start items-start'>
            {render && (
              <Slider settings={settings2}>
                {mainCast.map((singleActor) => (
                  <SwiperSlide>
                      <MainCastCard info={singleActor}/>
                  </SwiperSlide>
                ))}
              </Slider>
            )}
            </div>
          </div>
        )}
    </div>
  )
}