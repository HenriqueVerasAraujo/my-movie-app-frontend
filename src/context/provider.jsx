/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import myContext from './MyContext';

export default function provider({ children }) {
 
 const [movieData, setMovieData] = useState(false);

 const [username, setUsername] = useState('');

 const [popUp, setPopUp] = useState(false);

const contextValue = {
  movieData,
  setMovieData,
  username,
  setUsername,
  popUp,
  setPopUp,
};

  return (
    <myContext.Provider value = { contextValue }>
      { children }
    </myContext.Provider> 
  )
}