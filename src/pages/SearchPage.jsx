import React, {useState, useContext, useEffect} from 'react'
import myContext from '../context/MyContext';
import SingleMovieSearch from '../components/SingleMovieSearch';

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
      <div>
          {render && (
              movieData.map((s) => (
            <div key={s.id}>
                <SingleMovieSearch movie={s}/>
            </div>
          )))}
      </div>
  )
}
