import React, { useState, useEffect } from 'react'
import SingleMoviePoster from '../components/SingleMoviePoster';
import {defaultSearchMovie, newSearchMovie } from '../links/movieFilter';

export default function Home() {
	const [movieData, setMovieData] = useState([]);
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

	// const formatInputReturn = async() => {
	// 	const newValue = inputField.split(' ').join('+');
	// 	await setInputField(newValue);
	// }

	// const searchNewMovie = async () => {
	// 	const newMovieList = `${newSearchMovie}${inputField}`
	// 	await fetchData(newMovieList)
	// }

	const searchButton = async() => {
		if (inputField.length !== 0) {
			setRender(false);
			await formatInputReturn();
			await searchNewMovie()
			if (movieData.length === 0) {
				console.log('array vazio');
			}else {
				setRender(true);
			}
		}
	};

	const inputFunction = ({ target }) => {
		setInputField(target.value);
	};

  return (
		<div>
			<div>
				<input type="text" onChange={inputFunction} />
				<button onClick={searchButton} type='button'>Search</button>
			</div>
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
