import React, { useState, useEffect } from "react";
import Card from '../components/card';

import '../App.css';

function Moviedetails() {
  const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_URL = BASE_URL + '/discover/movie?' + API_KEY + '&sort_by=popularity.desc&page=1' /*+ '&sort_by=popularity.desc&page=1'*/ 
  
  const MOVIE_ID = '634649';
  const API_URL_DETAILS = BASE_URL + '/movie/' + MOVIE_ID + '?' + API_KEY
  const API_URL_CREDITS = BASE_URL + '/movie/' + MOVIE_ID + '/credits?' + API_KEY;
  
  const IMG_URL = 'https://image.tmdb.org/t/p/w200';
  const IMG_URL_POSTER = 'https://image.tmdb.org/t/p/w500';
  
  const SEARCH_URL = BASE_URL + '/search/movie?'+ API_KEY;

  const [data, setData] = useState([]);

  useEffect( () => {
    loadMovieData();
  }, [])

  const loadMovieData = async () => {
    await fetch(API_URL_DETAILS)
    .then(res => res.json())
    .then(data => {
      setData(data);
    });
  }

  return(
    <div className='movie-details'>
      <Card/>
    </div>
  )
}

export default Moviedetails;