/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react'
import { SwiperSlide } from 'swiper/react';
import Slider from '../../common/Slider'
import { popularMovies } from '../../../links/movieFilter';
import PopularSliderCard from './PopularSliderCard';

export default function PopularMoviesSection() {
  const [inTheaterNow, setInTheaterNow] = useState('');
  const [render, setRender] = useState(false);

  const fetchData = async () => {
    const allData = await fetch(popularMovies()).then((response) => response.json());
    setInTheaterNow(allData.results);
  };

  useEffect(() => {
    fetchData();
  },[]);

  useEffect(() => {
    if (inTheaterNow !== '') {
      return setRender(true);
    };
  },[inTheaterNow]);

    const settings = {
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: true,
      loop: true
    }

return (
    <div className='w-full h-auto '>
      {render && (
        <div className='flex flex-col w-full h-auto'>
          <h1 className='text-zinc-700 font-medium text-3xl mb-5'>Popular Movies</h1>
          <div className='w-full h-[500px] flex'>
            <Slider settings={settings}>
              {inTheaterNow.map((s) => (
                <SwiperSlide>
                  <PopularSliderCard content={s} />
                </SwiperSlide>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  )
}