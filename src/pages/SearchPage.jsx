import React, {useState, useEffect, useContext } from 'react'
import { useSearchParams } from 'react-router-dom';
import SingleMovieSearch from '../components/SingleMovieSearch';
import myContext from '../context/MyContext';
import { newSearchMovie, findActorName, findMovieByActorId, findMovieByGenreId } from '../links/movieFilter'

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { movieData } = useContext(myContext);
    const [searchData, setSearchData] = useState('');
    const [render, setRender] = useState(false);

    const value = searchParams.get('value');
    const category = searchParams.get('category');
    const page = searchParams.get('page');

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
            console.log(category)
            const formatName = formatNameFunction(value);
            const url = findActorName(formatName);
            // await fetch(url).then((response) => response.json()).then((response) => response.results[0].id)
            // .then((response) => console.log(response));
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
    }, [movieData])


    useEffect(() => {
        if (searchData !== '') {
            setRender(true);
        };
    }, [searchData]);

  return (
      <div className='w-full h-screen bg-slate-200'>
          <div className='w-[30%] h-screen fixed top-[75px] bg-slate-900 z-10'></div>
          <div className='w-full h-auto bg-slate-200 flex justify-end absolute top-[75px] z-0'>
              <div className='w-[70%] h-auto flex justify-center'>
                <div className='w-[80%] flex flex-col mt-[50px]'>
                    {/* <h1>{value}</h1>
                    <h1>{category}</h1> */}
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
