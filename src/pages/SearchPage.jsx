import React, {useState, useEffect, useContext } from 'react'
import { useSearchParams } from 'react-router-dom';
import SingleMovieSearch from '../components/SingleMovieSearch';
import myContext from '../context/MyContext';
import { newSearchMovie, findActorName, findMovieByActorId, findMovieByGenreId } from '../links/movieFilter'
import { genreArray } from '../assets/genresArray';

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { movieData } = useContext(myContext);
    const [searchData, setSearchData] = useState('');
    const [render, setRender] = useState(false);

    const value = searchParams.get('value');
    const category = searchParams.get('category');
    const page = searchParams.get('page');

    const findCategoryName = (number) => {
        const categoryName = genreArray.find((single) => Number(single.id) === Number(number));
        console.log('aqui')
        return categoryName.name;
    }

    const formatNameFunction = (name) => {
        const newValue = name.split(' ').join('+');
            return newValue;
        };
        
        const fetchData = async(link) => {
            const allData = await fetch(link);
            const allDataJson = await allData.json();
            setSearchData(allDataJson);
        };

    const mainFunction = async () => {
        if (category === 'by movie genre') {
            const url = findMovieByGenreId(value);
            const byGenre = await fetch(url).then((response) => response.json());
            return setSearchData(byGenre);
        }

        if (category === 'by person name') {
            const formatName = formatNameFunction(value);
            const url = findActorName(formatName);
            const firstFetch = await fetch(url).then((response) => response.json()).then((response) => response.results[0].id);
            const secondFetch = await fetch(findMovieByActorId(firstFetch)).then((response) => response.json());
            return setSearchData(secondFetch);
        }
        const newMovieList = `${newSearchMovie}${formatNameFunction(value)}`
        return fetchData(newMovieList);
    };

    useEffect(() => {
        mainFunction();
    }, [])

    useEffect(() => {
        mainFunction();
    }, [movieData, window.location.href])


    useEffect(() => {
        if (searchData !== '') {
            setRender(true);
        };
    }, [searchData]);

    console.log(category)
  return (
      <div className='w-full h-screen bg-slate-200'>
          <div className='w-[30%] h-screen fixed top-[75px] bg-slate-900 z-10'>
              <div className='w-full h-full relative'>
                  <div className='h-full w-full absolute  flex flex-col items-center break-words px-10'>
                        <h1 className='text-white text-3xl font-bold mb-1'>Results for:</h1>
                        <div className='w-full break-words mb-5'>
                            {category !== 'by movie genre' ? (
                                <h1 className='text-slate-400 text-3xl italic text-center'>{`"${value}"`}</h1>
                            ) : (
                                <h1 className='text-slate-400 text-3xl italic text-center'>{findCategoryName(value)}</h1>
                           )}
                        </div>
                        <h1 className='text-white text-3xl font-bold text-center mb-1'>Search method:</h1>
                        <h1 className='text-slate-400 text-3xl italic text-center mb-5'>{category}</h1>
                        <h1 className='text-white text-3xl font-bold text-center mb-2'>Movies found:</h1>
                        <h1 className='text-slate-400 text-4xl  italic text-center mb-5'>{searchData.total_results} Movies</h1>
                        <h1 className='text-white text-3xl font-bold text-center mb-2'>Pages of results:</h1>
                        <h1 className='text-slate-400 text-5xl font-bold italic text-center'>{searchData.total_pages}</h1>
                  </div>

              </div>
          </div>
          <div className='w-full h-auto bg-slate-200 flex justify-end absolute top-[75px] z-0'>
              <div className='w-[70%] h-auto flex justify-center'>
                <div className='w-[80%] flex flex-col mt-[50px]'>
                    {render && (
                        searchData.results.map((s) => (
                            <div key={s.id} className='mb-[50px]'>
                                <SingleMovieSearch movie={s} />
                            </div>
                        ))
                    )}
                </div>
              </div>
          </div>
      </div>
  )
}
