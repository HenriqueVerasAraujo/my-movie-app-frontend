import React, { useState, useEffect } from 'react'
import SingleMoviePoster from '../components/SingleMoviePoster';
import defaultSearchMovie from '../links/movieFilter';

export default function Home() {
	const [movieData, setMovieData] = useState([]);
	const [render, setRender] = useState(false);

	const fetchData = async() => {
		const allData = await fetch(defaultSearchMovie);
		const allDataJson = await allData.json();
		console.log(allDataJson.results);
		setMovieData(allDataJson.results);
	};

	useEffect(() => {
		fetchData();
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
