import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom';
// import SingleMoviePoster from '../components/SingleMoviePoster';
import { newSearchMovie, findActorName, findMovieByActorId } from '../links/movieFilter'
import myContext from '../context/MyContext';

export default function Navbar() {
  const [inputField, setInputField] = useState('');
  const { movieData, setMovieData, username, setUsername } = useContext(myContext);
  const [renderLogin, setRenderLogin] = useState(false);
  const navigate = useNavigate();

  const fetchData = async(link) => {
		const allData = await fetch(link);
		const allDataJson = await allData.json();
		setMovieData(allDataJson.results);
	};

	const inputFunction = ({ target }) => {
		setInputField(target.value);
	};

  const formatInputReturn = async() => {
		const newValue = inputField.split(' ').join('+');
		await setInputField(newValue);
	};

  const searchNewMovie = async () => {
		const newMovieList = `${newSearchMovie}${inputField}`
		await fetchData(newMovieList)
	};

  // const searchButton = async() => {
	// 	if (inputField.length !== 0) {
	// 		await formatInputReturn();
	// 		await searchNewMovie()
  //     navigate('/search');
	// 	}
	// };

  const searchButton = async() => {
		if (inputField.length !== 0) {
			await byActorName(inputField);
      navigate('/search');
		}
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

  const byActorName = async(actorName) => {
    const formatName = formatNameFunction(actorName);
    const url = findActorName(formatName);
    const firstFetch = await fetch(url).then((response) => response.json()).then((response) => response.results[0].id);
    // console.log(firstFetch)
    const secondFetch = await fetch(findMovieByActorId(firstFetch)).then((response) => response.json());
    setMovieData(secondFetch.results);

    return firstFetch;
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

  return (
    <div className='fixed w-full h-[75px] flex justify-center items-center p-3 bg-sky-800 z-10'>
      <div className='w-[95%] h-full flex items-center'>

        <div className='flex items-center w-[20%] h-full'>
          <h1 onClick={ () => navigate('/') } className='pl-[40%] text-4xl font-bold text-amber-50'>Logo</h1>
        </div>

        <div className='w-[60%] flex'>
          <input onChange={inputFunction} className='w-full h-[40px] rounded-l-3xl pl-3' type="text" placeholder='Search a movie by title, actor/actress or genre...' />
          <button onClick={searchButton} className='flex justify-center items-center w-[70px] h-[40px] rounded-r-3xl bg-sky-900 p-3 px-10 text-amber-50 font-bold uppercase' type='button'>Search</button>
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
