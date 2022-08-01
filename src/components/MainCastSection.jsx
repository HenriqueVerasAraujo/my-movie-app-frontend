import React, { useState, useEffect } from 'react'
import { SwiperSlide } from 'swiper/react';
import Slider from '../components/common/Slider';
import MainCastCard from '../components/MainCastCard'

import 'swiper/css';
import 'swiper/css/navigation';


export default function MainCastSection({ actorInfo }) {
  const [render, setRender] = useState(false);
  const [mainCast, SetMainCast] = useState(['']);
  const settings = {
		slidesPerView: 8,
		spaceBetween: 10,
		navigation: true
	}

  const sliceMainCast = () => {
    const newMain = actorInfo.cast.slice(0, 20)
    SetMainCast(newMain);
  }

  useEffect(() => {
    sliceMainCast();
    setRender(true)
  }, [])

  console.log(actorInfo)
  return (
    <div className='w-[80%] h-[400px] flex flex-col px-10'>
      <div className='py-5'>
        <h1 className='Font-bold text-3xl'>Main Cast:</h1>
        </div>
      <div className='flex w-full overflow-visible h-full'>
        <Slider settings={settings}>
          {mainCast.map((singleActor) => (
            <SwiperSlide>
              <div>
                <MainCastCard info={singleActor}/>
              </div>
            </SwiperSlide>
          ))}
        </Slider>
      </div>
    </div>
  )
}