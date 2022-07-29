import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { movieById, movieCastById } from '../links/movieFilter';
import GenreButton from '../components/GenreButton';

export default function MoviePage() {
    const [movieData, setMovieData] = useState('');
    const [date, setDate] = useState('');
    const [genres, setGenres] =useState(['']);
    const [render, setRender] = useState(false);
    const { id } = useParams();

    const fetchData = async() => {
        const movieInfo = movieById(id);
        const castInfo =  movieCastById(id);
        const prommiseArray = [movieInfo,castInfo];
        const value = await Promise
        .all(prommiseArray.map((url) => fetch(url).then((s) => s.json())));  
        return setMovieData(value);
    };

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (movieData !== '') {
            setDate(movieData[0].release_date.slice(0,4))
            setGenres(movieData[0].genres);
            setRender(true);
            console.log(movieData);
        }
    }, [movieData])

  return (
    <div className='w-full h-screen bg-slate-200'>
        {render && (
            <div className='w-full h-auto bg-slate-200 flex absolute top-[75px] z-0'>
                <div className='w-full h-[550px] bg-black flex justify-center'>
                    <div className='w-[70%] h-full absolute z-10 flex items-center '>
                        <img className='h-[80%] rounded-lg' src={`https://image.tmdb.org/t/p/original/${movieData[0].poster_path}`} alt="Movie poster not found" />
                        <div className='w-full h-[80%] flex flex-col  ml-7'>
                            <div className='flex items-center '>
                                <h1 className='text-white font-bold text-3xl'>{movieData[0].title}</h1>
                                <h1 className='text-neutral-200 text-2xl ml-2'>{`(${date})`}</h1>
                            </div>
                            <div className='flex mt-2 '>
                                {genres.map((singleGenre) => (
                                    <div key={singleGenre.name}>
                                        <GenreButton title={singleGenre.name}/> 
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-full opacity-50 absolute bg-sky-800'></div>
                    <div className='w-full h-[50%] absolute bottom-0 bg-gradient-to-b from-transparent to-black'></div>
                    <img className='object-cover h-full w-full' src={`https://image.tmdb.org/t/p/original/${movieData[0].backdrop_path}`} alt="Movie poster not found" />
                </div>
            </div>
        )}
    </div>
  )
}

// id
// name
// profile_path
// character

