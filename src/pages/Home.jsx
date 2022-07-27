import React, { useState, useEffect, useContext } from 'react'
import SingleMoviePoster from '../components/SingleMoviePoster';
import myContext from '../context/MyContext';
import { defaultSearchMovie } from '../links/movieFilter';

export default function Home() {
	const { movieData, setMovieData } = useContext(myContext);
	const [render, setRender] = useState(false);

	const fetchData = async(link) => {
		const allData = await fetch(link);
		const allDataJson = await allData.json();
		console.log(allDataJson.results);
		setMovieData(allDataJson.results);
	};

	useEffect(() => {
		fetchData(defaultSearchMovie);
		setRender(true);
	}, []);

  return (
		<div>
			{render && (
				movieData.map((s) => (
					<div key={s.id}>
						<SingleMoviePoster movie={s} />
					</div>
				))
			)}
		</div>
  );
};
