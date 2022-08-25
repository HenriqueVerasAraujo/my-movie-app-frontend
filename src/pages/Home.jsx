/* eslint-disable no-unused-vars */
import React from 'react'
import MainHero from '../components/mainPageComponents/MainHero';
import MainTrendingSection from '../components/mainPageComponents/MainTrendingSection/MainTrendingSection';
import InTheatersNow from '../components/mainPageComponents/InTheatersNowSection/InTheatersNow';
import PopularMoviesSection from '../components/mainPageComponents/popularMoviesSection/PopularMovies';


export default function Home() {
  return (
	  <div className='w-full h-auto bg-slate-200 absolute top-[75px] flex justify-center '>
		  <div className='w-full h-auto flex justify-center bg-slate-200'>
			<div className='w-full md:w-[70%] h-auto bg-slate-200'>
				<MainHero />
				<MainTrendingSection />
				<PopularMoviesSection />
				<InTheatersNow/>
			</div>
		  </div>
	  </div>
  );
};
