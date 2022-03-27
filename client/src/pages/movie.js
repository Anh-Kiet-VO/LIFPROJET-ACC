import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Axios from "axios";

import "../App.css";

import Card from '../components/card';

function Movie() {

  const [movieId, setMovieId] = useState('');

  const getMovieInfo = (e) => {
    const getId = e.currentTarget.attributes.id.value;
    setMovieId(getId);
  }

  const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_URL = BASE_URL + '/discover/movie?' + API_KEY + '&sort_by=popularity.desc&page=1' /*+ '&sort_by=popularity.desc&page=1'*/ 
  
  const MOVIE_ID = '634649';
  const API_URL_DETAILS = BASE_URL + '/movie/' + MOVIE_ID + '?' + API_KEY
  const API_URL_CREDITS = BASE_URL + '/movie/' + MOVIE_ID + '/credits?' + API_KEY;
  
  const IMG_URL = 'https://image.tmdb.org/t/p/w200';
  const IMG_URL_POSTER = 'https://image.tmdb.org/t/p/w500';
  
  const SEARCH_URL = BASE_URL + '/search/movie?'+ API_KEY;
  //https://api.themoviedb.org/3/discover/movie?api_key=5ffad13612113d1554cbf7d1788c806c

  const [data, setData] = useState([]);

  useEffect( () => {
    loadMovieData();
  }, [])

  const loadMovieData = async () => {
    await fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      setData(data);
    });
  }

  const createCard = (movie) => {
    return (
      <Card
	  	id = {movie.id}
	  	key = {movie.id}
        getMovieInfo = {getMovieInfo}
		movieIdDetail = {movieId}
        title = {movie.title}
        score = {movie.vote_average}
        url = {IMG_URL_POSTER + movie.poster_path}
        
      />
    )
  }
  
  return (
    <div className="App">
      {
        data.results?.map(movie => (
          createCard(movie)
        ))
      }
    </div>
  );
}

export default Movie;