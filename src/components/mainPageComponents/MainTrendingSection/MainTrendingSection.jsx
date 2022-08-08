import React, { useState, useContext, useEffect } from 'react'
import Slider from '../../common/Slider'
import SliderCard from './SliderCard';
import { SwiperSlide } from 'swiper/react';
import { trendingMovies } from '../../../links/movieFilter';

export default function MainTrendingSection() {
    const [trendingData, setTrendingData] = useState('');
    const [render, setRender] = useState(false);

    const fetchData = async () => {
      const allData = await fetch(trendingMovies()).then((response) => response.json());
      console.log(allData.results);
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
    }

  return (
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
  )
}
