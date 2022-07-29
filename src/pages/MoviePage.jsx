import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { movieById, movieCastById } from '../links/movieFilter';

export default function MoviePage() {
    const [movieData, setMovieData] = useState('');
    const [castData, setCastData] = useState('');
    const [render, setRender] = useState(false);
    const { id } = useParams();

    const fetchData = async() => {
        const movieInfo = await fetch(movieById(id));
        const castInfo = await fetch(movieCastById(id));
        const movieJson = await movieInfo.json();
        const castJson = await castInfo.json();
        setMovieData(movieJson);
        setCastData(castJson);
        console.log(movieJson);
        console.log(castJson);
    };

    useState(() => {
        fetchData();
    }, [])

  return (
    <div className='w-full h-screen bg-slate-200'>
        <div className='w-full h-auto bg-slate-200 flex absolute top-[75px] z-0'>
        </div>
    </div>
  )
}

// id
// name
// profile_path
// character

