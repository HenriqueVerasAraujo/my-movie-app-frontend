/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react'
import { SwiperSlide } from 'swiper/react';
import Slider from '../../common/Slider'
import SliderCard from '../MainTrendingSection/SliderCard'
import { nowPlaying } from '../../../links/movieFilter';

export default function InTheatersNow() {
  const [render, setRender] = useState(false);
  const [inTheaterNow, setInTheaterNow] = useState('');

  const fetchData = async () => {
    const allData = await fetch(nowPlaying()).then((response) => response.json());
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
      slidesPerView: 6,
      spaceBetween: 0,
      navigation: true,
      loop: true
    }

return (
    <div className='w-full h-auto '>
      {render && (
        <div className='flex flex-col w-full h-auto'>
          <h1 className='text-zinc-700 font-medium text-3xl mb-5'>Now in Cinemas</h1>
          <div className='w-full h-[500px] flex'>
            <Slider settings={settings}>
              {inTheaterNow.map((s) => (
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