import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { movieById, movieCastById } from '../links/movieFilter';
import GenreButton from '../components/heroMovie/GenreButton';
import ScoreTag from '../components/heroMovie/ScoreTag';
import BudgetTag from '../components/heroMovie/BudgetTag';
import BackGroundCast from '../components/heroMovie/BackGroundCast';
import MainCastSection from '../components/MainCastSection';


export default function MoviePage() {
    const [movieData, setMovieData] = useState('');
    const [director, setDirector] = useState([]);
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

    const findDirector = () => {
        const arr = movieData[1].crew;
        const writerData = arr.find((crewMember) => crewMember.job ==='Writer');
        const directorData = arr.find((crewMember) => crewMember.job ==='Director');
        setDirector({director: directorData, writer: writerData});
    }
    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (movieData !== '') {
            setDate(movieData[0].release_date.slice(0,4))
            setGenres(movieData[0].genres);
            findDirector();
            setRender(true);
        }
    }, [movieData])

  return (
    <div className='w-full h-screen bg-slate-200'>
        <div className='w-full h-auto bg-slate-200 flex flex-col absolute top-[75px] z-0'>
         {render && (
             <div>
                 {/* HERO SECTION */}
                    <div className='w-full h-[550px] bg-black relative flex justify-center'>
                        <div className='w-[70%] h-full absolute z-10 flex items-center '>
                            <img className='h-[440px] rounded-lg' src={`https://image.tmdb.org/t/p/original${movieData[0].poster_path}`} alt="Movie poster not found" />
                            <div className='w-full h-[80%] flex flex-col  ml-7'>

                                <div className='flex items-center '>
                                    <h1 className='text-white font-bold text-3xl'>{movieData[0].title}</h1>
                                    <h1 className='text-neutral-200 text-2xl ml-2 mt-1'>{`(${date})`}</h1>
                                </div>

                                <div className='flex ml-2 text-white'>
                                        <h1 className='mr-3'>{`${movieData[0].release_date} (US)`}</h1>
                                        <h1 className=''>{`Running time: ${movieData[0].runtime} minutes`}</h1>
                                </div>

                                <div className='flex mt-2 '>
                                    {genres.map((singleGenre) => (
                                        <div key={singleGenre.name}>
                                            <GenreButton title={singleGenre.name}/> 
                                        </div>
                                    ))}
                                </div>

                                <div className='mt-2 -ml-5 flex justify-around w-[60%]'>
                                    <ScoreTag score={movieData[0].vote_average}/>
                                    <BudgetTag cost={movieData[0].budget} back={movieData[0].revenue}/>
                                    <BackGroundCast info={director} />
                                </div>

                                <div className='ml-4 mt-5 text-white italic'>
                                        <h1 className='font-bold opacity-80 text-lg'>{movieData[0].tagline}</h1>
                                        <h1 className=''>{movieData[0].overview} </h1>
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-[550px] opacity-60 absolute bg-sky-800'></div>
                        <div className='w-full h-[50%] absolute mt-[275px] bg-gradient-to-b from-transparent to-black'></div>
                        <img className='object-cover h-full w-full' src={`https://image.tmdb.org/t/p/original/${movieData[0].backdrop_path}`} alt="Movie poster not found" />
                    </div>
                    {/* MAIN CAST SECTION */}
                    <div className='w-full bg-white flex justify-center'>
                        <MainCastSection actorInfo={movieData[1]}/>
                    </div>
             </div>
        )}
        </div>
    </div>
  )
}
