import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CompSheet from '../components/CompSheet';
import '../App.css';

const Moviedetails = () => {
	let movieId = useParams();
	console.log(movieId.id);

	const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";
	const BASE_URL = "https://api.themoviedb.org/3";
	const API_URL = BASE_URL + '/discover/movie?' + API_KEY + '&sort_by=popularity.desc&page=1' /*+ '&sort_by=popularity.desc&page=1'*/

	const LANGUAGE = '&language=fr';

	const API_URL_DETAILS = BASE_URL + '/movie/' + movieId.id + '?' + API_KEY + LANGUAGE;
	const API_URL_CREDITS = BASE_URL + '/movie/' + movieId.id + '/credits?' + API_KEY + LANGUAGE;

	const IMG_URL = 'https://image.tmdb.org/t/p/w200';
	const IMG_URL_POSTER = 'https://image.tmdb.org/t/p/w500';

	const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;
	//https://api.themoviedb.org/3/discover/movie?api_key=5ffad13612113d1554cbf7d1788c806c

	const [data, setData] = useState([]);

	useEffect(() => {
		loadMovieData();
	}, [])

	const loadMovieData = async () => {
		await fetch(API_URL_DETAILS)
			.then(res => res.json())
			.then(data => {
				setData(data);
				console.log(data)
			});
	}

	const loadMovieDetails = async () => {
		await fetch(API_URL_CREDITS)
			.then(res => res.json())
			.then(data => {
				setData(data);
			});
	}

	const createSheet = (media) => {
		return (
			<CompSheet
				key={media.id}
				id={media.id}
				title={media.title}
				description={media.overview}
				date={media.release_date}
				genres={media.genre_ids}
				score={media.vote_average}
				url={"https://image.tmdb.org/t/p/w500" + media.poster_path}
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
				data ? createSheet(data) : null

			}
		</div>
	);
}

export default Moviedetails;