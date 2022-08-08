import React from 'react'
import MainHero from '../components/mainPageComponents/MainHero';
import MainTrendingSection from '../components/mainPageComponents/MainTrendingSection/MainTrendingSection';
import PopularReviews from '../components/mainPageComponents/PopularReviews';
import InTheatersNow from '../components/mainPageComponents/InTheatersNowSection/InTheatersNow';

export default function Home() {
  return (
	  <div className='w-full h-auto bg-slate-200 absolute flex justify-center '>
		  <div className='w-full h-auto flex justify-center bg-slate-200'>
			<div className='w-full md:w-[70%] h-auto top-[75px] bg-slate-200'>
				<MainHero />
				<MainTrendingSection />
				<InTheatersNow/>
				{/* <PopularReviews /> */}
				{/* <popularMovies /> */}
			</div>
		  </div>
	  </div>
  );
};
