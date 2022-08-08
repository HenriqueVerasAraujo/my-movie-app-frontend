import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
// import SingleMoviePoster from '../components/SingleMoviePoster';
import { newSearchMovie, findActorName, findMovieByActorId, findMovieByGenreId } from '../links/movieFilter'
import myContext from '../context/MyContext';
import { SearchIcon } from '@heroicons/react/outline';
import { genreArray } from '../assets/genresArray';
import { useSearchParams } from 'react-router-dom';

export default function Navbar() {
  const [inputField, setInputField] = useState('');
  const [inputField2, setInputField2] = useState(999);
  const { movieData, setMovieData, username, setUsername } = useContext(myContext);
  const [renderLogin, setRenderLogin] = useState(false);
  const [searchType, setSearchType] = useState('by movie title');
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchData = async(link) => {
		const allData = await fetch(link);
		const allDataJson = await allData.json();
		setMovieData(allDataJson);
	};

	const inputFunction = ({ target }) => {
		setInputField(target.value);
	};

  const genreInputFunction = ({ target }) => {
    return setInputField2(target.value);
  }

  const searchTypeInput = ({ target }) => {
    return setSearchType(target.value);
  };

  const enterSite = () => {
    const checkUsername = localStorage.getItem('username');
    if (checkUsername) {
      setUsername(checkUsername);
    }
  }

  const formatNameFunction = (name) => {
    const newValue = name.split(' ').join('+');
		return newValue;
	};
  const byMovieTitle = async (movieTitle) => {
    if (inputField.length !== 0) {
      const formatTitle = formatNameFunction(movieTitle);
      const newMovieList = `${newSearchMovie}${formatTitle}`
      await fetchData(newMovieList);
    }
  }
  
  const searchButtonTitle = async() => {
    if (inputField.length !== 0) {
      setMovieData(!movieData)
      navigate(`/search?value=${inputField}&page=1&category=${searchType}`);
    }
  };

  const byActorName = async(actorName) => {
    const formatName = formatNameFunction(actorName);
    const url = findActorName(formatName);
    const firstFetch = await fetch(url).then((response) => response.json()).then((response) => response.results[0].id);
    const secondFetch = await fetch(findMovieByActorId(firstFetch)).then((response) => response.json());
    setMovieData(secondFetch);
    
    return firstFetch;
  };
  
  const searchButtonPerson = async() => {
    if (inputField.length !== 0) {
      await byActorName(inputField);
      navigate('/search');
    }
  };

  const byMovieGenre = async(genreId) => {
    const url = findMovieByGenreId(genreId)
    const firstFetch = await fetch(url).then((response) => response.json());
    setMovieData(firstFetch);
  };

  const searchButtonGenre = async() => {
    if (inputField2 !== 999) {
      await byMovieGenre(inputField2);
      navigate('/search');
    }
  };

  const verifyLogin =  () => {
    if (username) {
      setRenderLogin(true);
    }
  }

  const logoutFunction = () => {
    localStorage.clear();
    setRenderLogin(false);
    setUsername('');
    navigate('/');
    window.location.reload();
  }

  useEffect(() => {
      enterSite();
  }, [])

  useEffect(() => {
      verifyLogin();
  }, [username]);

  useEffect (() => {
    if (searchType === 'by movie genre') {
      return setInputField('');
    }
    return (setInputField2(999))
  }, [searchType]);


  const testSubmit = async(e) => {
      e.preventDefault();
      if (searchType === 'by person name') {
          return searchButtonPerson();
      }
      if (searchType === 'by movie title') {
        return searchButtonTitle();
    }
      if (searchType === 'by movie genre') {
      return searchButtonGenre();
    }
  }

  return (
    <div className='fixed w-full h-[75px] flex justify-center items-center p-3 bg-sky-800 z-20'>
      <div className='w-[95%] h-full flex items-center'>

        <div className='flex items-center w-[20%] h-full'>
          <h1 onClick={ () => navigate('/') } className='pl-[40%] text-4xl font-bold text-amber-50'>Logo</h1>
        </div>

        <div className='w-[60%] flex'>
          <form type='submit' className='flex w-full' onSubmit={testSubmit}>
            <select className='text-zinc-800 text-lg rounded-l-3xl px-1 font-medium bg-slate-300 text-center border-r-2 border-zinc-800 hover:brightness-110' onChange={searchTypeInput} name="searchType" id="searchType">
              <option className='text-zinc-800 bg-white text-lg text-center' value="by movie title">By movie title</option>
              <option className='text-zinc-800 bg-white text-lg text-center' value="by person name">By person name</option>
              <option className='text-zinc-800 bg-white text-lg text-center' value="by movie genre">By movie genre</option>
            </select>
            {searchType !== 'by movie genre' ? (
              <input onChange={inputFunction} className='w-full h-[40px] focus:outline-none focus:ring-2 ring-yellow-500 focus:ring-inset text-zinc-700 rounded-r-3xl  font-medium text-lg pl-3' type="text" placeholder='Search a movie by title, actor/actress or genre...' />
            ) : (
              <div className='w-full h-full'>
                <select onChange={genreInputFunction} className='w-full h-[40px] bg-white focus:outline-none focus:ring-2 ring-yellow-500 focus:ring-inset text-zinc-700 rounded-r-3xl  font-medium text-lg pl-3' name="genreInput" id="genreInput">
                  {genreArray.map((single) => (
                    <option value={single.id}>{single.name}</option>
                  ))}
                </select>
              </div>
            )}
          </form>
          <button
            onClick={testSubmit} 
            className='-ml-[60px] px-3 pr-5 text-sky-700 rounded-r-3xl' 
            type='button'>
              <SearchIcon className=' h-7 w-7' />
              </button>
        </div>

          { renderLogin === false ? (
            <div className='w-[20%] h-full flex items-center justify-evenly'>
              <Link to='/login'>
                <h1 className='text-2xl font-bold text-amber-50 hover:text-yellow-300'>Log In</h1>
              </Link>
              <Link to='/register'>
                <h1 className='text-2xl font-bold text-amber-50 hover:text-yellow-300'>Sign Up</h1>
              </Link>
            </div>
          ) : (
            <div className='w-[20%] h-full flex items-center justify-evenly'>
                <h1 className='text-2xl font-bold text-amber-50'>{username}</h1>
                <h1 onClick={logoutFunction} className='text-2xl font-bold text-amber-50 hover:text-yellow-300'>Log Out</h1>
          </div>
          ) }
      </div>
    </div>
  )
}
