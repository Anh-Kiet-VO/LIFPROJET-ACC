import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CompSheet from '../components/CompSheet';
import CompSheetMovieCredits from "../components/CompSheetMovieCredits";

import '../App.css';

const Moviedetails = () => {
	let movieId = useParams();
	console.log(movieId.id);

	const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";

	const LANGUAGE = '&language=fr';

	const API_URL_DETAILS = 'https://api.themoviedb.org/3/movie/' + movieId.id + '?' + API_KEY + LANGUAGE;
	const API_URL_CREDITS = 'https://api.themoviedb.org/3/movie/' + movieId.id + '/credits?' + API_KEY + LANGUAGE;

	const [data, setData] = useState([]);

	const [credits, setCredits] = useState([]);

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

	const loadMovieCredits = async () => {
		await fetch(API_URL_CREDITS)
			.then(res => res.json())
			.then(credits => {
				setCredits(credits);
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

	const createSheetMovieCredits = (media) => {
		return (
			<CompSheetMovieCredits
			// A faire en fonction des crédits qu'on veut afficher
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
				// credits ? createSheetMovieCredits(credits) : null
			}
		</div>
	);
}

export default Moviedetails;