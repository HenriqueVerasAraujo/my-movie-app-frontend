/* eslint-disable react/no-unescaped-entities */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { SearchIcon , FilmIcon, MenuIcon } from '@heroicons/react/outline';
import myContext from '../context/MyContext';
import  genreArray from '../assets/genresArray';

export default function Navbar() {
  const [inputField, setInputField] = useState('');
  const [showMenu, setShowMenu] = useState('hidden');
  const [inputField2, setInputField2] = useState(999);
  const [renderLogin, setRenderLogin] = useState(false);
  const [searchType, setSearchType] = useState('by movie title');
  const { movieData, setMovieData, username, setUsername } = useContext(myContext);
  const navigate = useNavigate();

	const inputFunction = ({ target }) => {
		setInputField(target.value);
	};

  const genreInputFunction = ({ target }) => setInputField2(target.value);

  const searchTypeInput = ({ target }) => setSearchType(target.value);

  const showMenuToggle = () => {
    if (showMenu === 'hidden') {
      setShowMenu('flex');
    } else {
      setShowMenu('hidden');
    }
  };

  const enterSite = () => {
    const checkUsername = localStorage.getItem('username');
    if (checkUsername) {
      setUsername(checkUsername);
    }
  };

  const searchButtonTitle = async() => {
    if (inputField.length !== 0) {
      setMovieData(!movieData)
      navigate(`/search?value=${inputField}&page=1&category=${searchType}`);
    }
  };

  const searchButtonPerson = async() => {
    if (inputField.length !== 0) {
      setMovieData(!movieData)
      navigate(`/search?value=${inputField}&page=1&category=${searchType}`);
    }
  };

  const searchButtonGenre = async() => {
    if (inputField2 !== 999) {
      setMovieData(!movieData)
      navigate(`/search?value=${inputField2}&page=1&category=${searchType}`);
    }
  };

  const verifyLogin =  () => {
    if (username) {
      setRenderLogin(true);
    }
  };

  const logoutFunction = () => {
    localStorage.clear();
    setRenderLogin(false);
    setUsername('');
    setShowMenu('hidden');
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
    return (setInputField2(999));
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
  };

  return (
    <div className='flex fixed w-full h-[75px] justify-center items-center py-3 md:p-3 bg-sky-800 z-20 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]'>
      <div className='md:flex w-full h-full md:px-10 relative items-center justify-center md:justify-between bg'>
        <div onClick={ () => navigate('/') } className='flex items-center justify-center md:justify-end w-full md:w-[20%] h-full text-amber-50 hover:text-yellow-400'>
          <FilmIcon className='w-10 h-10 md:w-10 md:h-10 mr-1' />
          <h1  className='text-3xl md:text-4xl font-bold cursor-pointer'>Watchables</h1>
        </div>
        {/* HAMBURGER BUTTON */}
        <div className='md:hidden absolute top-2 left-5'>
          <button type='button' onClick={showMenuToggle}>
              <MenuIcon className='w-10 h-10 text-amber-50 cursor-pointer'/>
          </button>
        </div>
        {/* HAMBURGER BUTTON */}
        <div className='md:hidden absolute top-2 right-5'>
          <button type='button' onClick={showMenuToggle}>
              <SearchIcon className='w-10 h-10 text-amber-50 cursor-pointer'/>
          </button>
        </div>
          {/* HAMBURGER MENU */}
        <div className={`${showMenu} flex-col w-full mt-3 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]`}>
              {renderLogin ? (
                <>
                  <div className='bg-amber-50 py-2 px-6 border-b-2 border-neutral-200'>
                    <h1 className='text-2xl font-bold text-sky-700'>{username}'s Page</h1>
                  </div>
                  <div className='bg-amber-50 py-2 px-6'>
                    <h1 onClick={logoutFunction} className='text-2xl font-bold text-sky-700'>LogOut</h1>
                  </div>
                </>
              ): (
                <>
                  <div className='bg-amber-50 py-2 px-6 cursor-pointer border-b-2 border-neutral-200'>
                    <Link to='/login' onClick={() => setShowMenu('hidden')}>
                      <h1 className='text-2xl font-bold text-sky-700'>Login</h1>
                    </Link>
                  </div>
                  <div className='bg-amber-50 py-2 px-6 cursor-pointer'>
                    <Link to='/register' onClick={() => setShowMenu('hidden')}>
                      <h1 className='text-2xl font-bold text-sky-700'>Create Account</h1>
                    </Link>
                  </div>
                </>
              ) }
        </div>
        {/* SEARCH BAR WIDE  */}
        <div className='min-w-[50%] hidden md:flex'>
          <form type='submit' className='flex w-full' onSubmit={testSubmit}>
            <select className='text-zinc-800 text-lg rounded-l-md px-1 font-medium bg-slate-300 text-center border-r-2 border-zinc-800 hover:brightness-110' onChange={searchTypeInput} name="searchType" id="searchType">
              <option className='text-zinc-800 bg-white text-lg text-center' value="by movie title">By movie title</option>
              <option className='text-zinc-800 bg-white text-lg text-center' value="by person name">By person name</option>
              <option className='text-zinc-800 bg-white text-lg text-center' value="by movie genre">By movie genre</option>
            </select>
            {searchType !== 'by movie genre' ? (
              <input onChange={inputFunction} className='w-full h-[40px] focus:outline-none focus:ring-2 ring-yellow-500 focus:ring-inset text-zinc-700 rounded-r-md font-medium text-lg pl-3' type="text" placeholder='Search a movie by title, actor/actress or genre...' />
            ) : (
              <div className='w-full h-full'>
                <select onChange={genreInputFunction} className='w-full h-[40px] bg-white focus:outline-none focus:ring-2 ring-yellow-500 focus:ring-inset text-zinc-700 rounded-r-md  font-medium text-lg pl-3' name="genreInput" id="genreInput">
                  {genreArray.map((single) => (
                    <option value={single.id}>{single.name}</option>
                  ))}
                </select>
              </div>
            )}
          </form>
          <button
            onClick={testSubmit} 
            className='-ml-[60px] px-3 pr-5rounded-r-3xl' 
            type='button'>
              <SearchIcon className=' h-7 w-7' />
              </button>
        </div>
          {/* MENU WIDE  */}
          { renderLogin === false ? (
            <div className='w-auto h-full hidden md:flex items-center justify-end'>
              <Link to='/login'>
                <h1 className='text-2xl font-bold text-amber-50 hover:text-yellow-300 mr-10 cursor-pointer'>Log In</h1>
              </Link>
              <Link to='/register'>
                <h1 className='text-2xl font-bold text-amber-50 hover:text-yellow-300 cursor-pointer'>Sign Up</h1>
              </Link>
            </div>
          ) : (
            <div className='w-auto h-full hidden md:flex items-center justify-end'>
                <h1 className='text-2xl font-bold text-amber-50 mr-10'>{username}</h1>
                <h1 onClick={logoutFunction} className='text-2xl font-bold text-amber-50 hover:text-yellow-300 cursor-pointer'>Log Out</h1>
          </div>
          ) }
      </div>
    </div>
  )
};
