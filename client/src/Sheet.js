import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Sheet.css";
import axios from "axios";
import CompSheet from './components/CompSheet';
import CardMovie from './components/cardMovie';


function Sheet() {

	const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";
	const BASE_URL = "https://api.themoviedb.org/3";
	const API_URL = BASE_URL + '/discover/movie?' + API_KEY + '&sort_by=popularity.desc&page=1' /*+ '&sort_by=popularity.desc&page=1'*/

	const MOVIE_ID = '634649';
	const API_URL_DETAILS = BASE_URL + '/movie/' + MOVIE_ID + '?' + API_KEY
	const API_URL_CREDITS = BASE_URL + '/movie/' + MOVIE_ID + '/credits?' + API_KEY;

	const IMG_URL = 'https://image.tmdb.org/t/p/w200';
	const IMG_URL_POSTER = 'https://image.tmdb.org/t/p/w500';

	const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;
	//https://api.themoviedb.org/3/discover/movie?api_key=5ffad13612113d1554cbf7d1788c806c

	const [data, setData] = useState([]);

	useEffect(() => {
		loadMovieData();
	}, [])

	const loadMovieData = async () => {
		await fetch(API_URL)
			.then(res => res.json())
			.then(data => {
				setData(data);
				console.log(data.results[0]);
			});
	}

	const loadMovieDetails = async () => {
		await fetch(API_URL_CREDITS)
			.then(res => res.json())
			.then(data => {
				setData(data);
				console.log(data.results[0]);
			});
	}

	/*<CompSheet 
		   key = {media.id}
		   id = {media.id}
		   title = {media.title}
		   description = {media.overview}
		   score = {media.vote_average}
		   url_img = {IMG_URL_POSTER + media.poster_path}
		 />*/

	const createSheet = (media) => {
		return (
			<CompSheet
				key={media.id}
				title={media.title}
				description={media.overview}
				date={media.release_date}
				genres={media.genre_ids}
				score={media.vote_average}
				url_img={IMG_URL_POSTER + media.poster_path}
			/>
		)
	}

	const createCard = (movie) => {
		return (
			<CardMovie
				key={movie.id}
				title={movie.title}
				score={movie.vote_average}
				url={IMG_URL_POSTER + movie.poster_path}
			/>
		)
	}

	return (
		<div className="Sheet">
			{
				//createSheet(data.results[1])
				/*data.results?.map(movie => (
				  createCard(movie)
				))*/
				data.results ? createSheet(data.results[0]) : null
			}
		</div>
	);
}

export default Sheet;