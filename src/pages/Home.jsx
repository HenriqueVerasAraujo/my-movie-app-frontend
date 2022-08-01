import React, { useState, useEffect, useContext } from 'react'
import SingleMoviePoster from '../components/SingleMoviePoster';
import myContext from '../context/MyContext';
import { defaultSearchMovie } from '../links/movieFilter';
import Slider from '../components/common/Slider';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Home() {
	const { movieData, setMovieData } = useContext(myContext);
	const [render, setRender] = useState(false);

	const fetchData = async(link) => {
		const allData = await fetch(link);
		const allDataJson = await allData.json();
		setMovieData(allDataJson.results);
	};

	const settings = {
		slidesPerView: 6,
		spaceBetween: 0,
		navigation: true
	}

	useEffect(() => {
		fetchData(defaultSearchMovie);
		setRender(true);
	}, []);

  return (
	  <div className='w-[50%]'>
		<Slider settings={settings} >
		{render && (
			movieData.map((s) => (
				<div key={s.id}>
					<SwiperSlide key={s.title} >
						<SingleMoviePoster movie={s} />
					</SwiperSlide>
				</div>
			))
		)}
		</Slider>
	  </div>
  );
};
