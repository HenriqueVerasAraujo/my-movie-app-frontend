import myContext from "./MyContext";
import React, { useState } from 'react';

export default function provider({ children }) {
 // eslint-disable-next-line react-hooks/rules-of-hooks
 const [movieData, setMovieData] = useState('teste');

const contextValue = {
  movieData,
  setMovieData,
};

  return (
    <myContext.Provider value = { contextValue }>
      { children }
    </myContext.Provider> 
  )
}