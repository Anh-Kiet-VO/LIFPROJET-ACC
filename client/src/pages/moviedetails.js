import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import Axios from "axios"

import CompSheet from '../components/CompSheet';
import CompSheetMovieCredits from "../components/CompSheetMovieCredits";
import CrudListProps from '../components/crudListProps';

import '../App.css';
import '../Sheet.css';

const Moviedetails = () => {
	const movieId = useParams();

	const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";

	const LANGUAGE = '&language=fr';

	const API_URL_DETAILS = 'https://api.themoviedb.org/3/movie/' + movieId.id + '?' + API_KEY + LANGUAGE;
	const API_URL_CREDITS = 'https://api.themoviedb.org/3/movie/' + movieId.id + '/credits?' + API_KEY + LANGUAGE;

	const [data, setData] = useState([]);

	const [credits, setCredits] = useState([]);

	const [MOVIEID, setMovieId] = useState("")

	const [title, setTitle] = useState("")

	useEffect(() => {
		loadMovieData();
		setMovieId(movieId.id)
	}, [])

	const loadMovieData = async () => {
		await fetch(API_URL_DETAILS)
			.then(res => res.json())
			.then(data => {
				setData(data);
				setTitle(data.title);
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

	const [movieStatus, setMovieStatus] = useState("")
	const [movieProgress, setMovieProgress] = useState(0)
	const [movieScore, setMovieScore] = useState(0)

	const [username, setUsername] = useState("")

	const [crudList, setCrudList] = useState([])

	useEffect(() => {
		Axios.get("http://localhost:3000/login") //1
			.then((response) => {
				// console.log(response.data.user[0].username);
				setUsername(response.data.user[0].username);
				//console.log(response)
			})
	}, [])

	const addMovie = () => {
		Axios.post("http://localhost:3001/create", {
			movieId: MOVIEID,
			title: title,
			status: movieStatus,
			score: movieScore,
			progress: movieProgress,
			userId: username
		}).then(() => {
			console.log("Info bien envoyé !")
		})
	};

	return (
		<div className="Sheet">
			{
				data ? createSheet(data) : null
				// credits ? createSheetMovieCredits(credits) : null

			}

			<CrudListProps
				setMovieStatus={setMovieStatus}
				setMovieProgress={setMovieProgress}
				setMovieScore={setMovieScore}
				addMovie={addMovie}
				crudList={crudList}
				username={username}
			/>
		</div>
	);
}

export default Moviedetails;