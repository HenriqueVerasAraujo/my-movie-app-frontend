/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react'
import { SwiperSlide } from 'swiper/react';
import Slider from '../../common/Slider'
import SliderCard from './SliderCard';
import { trendingMovies } from '../../../links/movieFilter';

export default function MainTrendingSection() {
  const [trendingData, setTrendingData] = useState('');
  const [render, setRender] = useState(false);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);
  
  const fetchData = async () => {
    const allData = await fetch(trendingMovies()).then((response) => response.json());
    setTrendingData(allData.results);
  };

  useEffect(() => {
    fetchData();
  },[]);

  useEffect(() => {
    if (trendingData !== '') {
     return setRender(true);
    };
  },[trendingData]);

    const settings = {
      slidesPerView: 6,
      spaceBetween: 0,
      navigation: true,
      loop: true
    };

    const settings2 = {
      slidesPerView: 3,
      spaceBetween: 3,
      navigation: false,
      loop: true
    };

  return (
    <div>
      {windowSize > 760 ? (
        <div className='w-full h-auto mt-10'>
          {render && (
            <div className='flex flex-col w-full h-auto'>
              <h1 className='text-zinc-700 font-medium text-3xl mb-5'>Trending Movies</h1>
              <div className='w-full h-[460px] flex'>
                <Slider settings={settings}>
                  {trendingData.map((s) => (
                    <SwiperSlide>
                      <SliderCard content={s} />
                    </SwiperSlide>
                  ))}
                </Slider>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='w-full h-auto mt-10'>
          {render && (
            <div className='flex flex-col w-full h-auto'>
              <h1 className='text-zinc-700 font-medium text-3xl mb-2'>Trending Movies</h1>
              <div className='w-full h-[460px] flex'>
                <Slider settings={settings2}>
                  {trendingData.map((s) => (
                    <SwiperSlide>
                      <SliderCard content={s} />
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
