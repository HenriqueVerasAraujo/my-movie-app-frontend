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
		slidesPerView: 6,
		spaceBetween: 0,
		navigation: true
	}

  const sliceMainCast = () => {
    const newMain = actorInfo.cast.slice(0, 10)
    SetMainCast(newMain);
  }

  useEffect(() => {
    sliceMainCast();
    setRender(true)
  }, [])

  console.log(actorInfo)
  return (
    <div className='w-full h-auto bg-green-400'>
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
  )
}