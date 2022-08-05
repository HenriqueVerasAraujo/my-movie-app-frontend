import React, {useState, useContext, useEffect} from 'react'
import myContext from '../context/MyContext';
import SingleMovieSearch from '../components/SingleMovieSearch';
import Footer from '../components/Footer';

export default function SearchPage() {
    const { movieData, setMovieData } = useContext(myContext);
    const [render, setRender] = useState(false);

    const renderSearch = () => {
        if (movieData !== []) {
            setRender(true);
        }
    }

    useEffect(() => {
        renderSearch();
    }, [])

  return (
      <div className='w-full h-screen bg-slate-200'>
          <div className='w-[30%] h-screen fixed top-[75px] bg-slate-900 z-10'></div>
          <div className='w-full h-auto bg-slate-200 flex justify-end absolute top-[75px] z-0'>
              <div className='w-[70%] h-auto flex justify-center'>
                <div className='w-[80%] flex flex-col mt-[50px]'>
                    {render && (
                        movieData.map((s) => (
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
