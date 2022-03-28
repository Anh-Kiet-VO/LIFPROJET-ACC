import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Axios from "axios";
import Search from "../components/search";

import "../App.css";

import Card from '../components/card';

function Movie() {

	const [movieId, setMovieId] = useState('');

	const [data, setData] = useState([]);

	const [page, setPage] = useState(1);

	const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";
	const LANGUAGE = '&language=fr';

	const BASE_URL = "https://api.themoviedb.org/3";
	const API_URL = BASE_URL + '/discover/movie?' + API_KEY + `&sort_by=popularity.desc&page=${page}` + LANGUAGE;/*+ '&sort_by=popularity.desc&page=1'*/

	const IMG_URL_POSTER = 'https://image.tmdb.org/t/p/w500';

	const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;
	//https://api.themoviedb.org/3/discover/movie?api_key=5ffad13612113d1554cbf7d1788c806c&language=fr

	const getMovieInfo = (e) => {
		const getId = e.currentTarget.attributes.id.value;
		setMovieId(getId);
	}

	useEffect(() => {
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
				id={movie.id}
				key={movie.id}
				getMovieInfo={getMovieInfo}
				movieIdDetail={movieId}
				title={movie.title}
				score={movie.vote_average}
				url={IMG_URL_POSTER + movie.poster_path}

			/>
		)
	}

	return (
		<div className="App">
			<Search />

			{
				data.results?.map(movie => (
					createCard(movie)
				))
			}

		</div>

	);
}

export default Movie;