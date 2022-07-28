import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import SearchPage from './pages/SearchPage';

function App() {
  return (
 <BrowserRouter>
  <Navbar />
  <Routes>
    <Route exact path="/" element={ <Home /> } />
    <Route exact path="/search" element={ <SearchPage /> } />
  </Routes>
 </BrowserRouter>
  );
}
export default App;