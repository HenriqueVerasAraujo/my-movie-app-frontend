import myContext from "./MyContext";
import React, { useState } from 'react';

export default function provider({ children }) {
 // eslint-disable-next-line react-hooks/rules-of-hooks
 const [movieData, setMovieData] = useState([]);
 // eslint-disable-next-line react-hooks/rules-of-hooks
 const [username, setUsername] = useState('');
 // eslint-disable-next-line react-hooks/rules-of-hooks
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