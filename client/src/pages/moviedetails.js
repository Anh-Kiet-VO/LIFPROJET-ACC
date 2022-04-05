import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import Axios from "axios"

import CompSheet from '../components/CompSheet';
import CompSheetMovieCredits from "../components/CompSheetMovieCredits";

import '../App.css';

const Moviedetails = () => {
	const movieId = useParams();

	const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";

	const LANGUAGE = '&language=fr';

	const API_URL_DETAILS = 'https://api.themoviedb.org/3/movie/' + movieId.id + '?' + API_KEY + LANGUAGE;
	const API_URL_CREDITS = 'https://api.themoviedb.org/3/movie/' + movieId.id + '/credits?' + API_KEY + LANGUAGE;

	const [data, setData] = useState([]);

	const [credits, setCredits] = useState([]);

	const [MOVIEID, setMovieId] = useState("")

	useEffect(() => {
		loadMovieData();
		setMovieId(movieId.id)
	}, [])

	const loadMovieData = async () => {
		await fetch(API_URL_DETAILS)
			.then(res => res.json())
			.then(data => {
				setData(data);
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
		Axios.get("http://localhost:3000/login")
			.then((response) => {
				console.log(response)
				setUsername(response.data.users[0].username)
				console.log("username = " + username);
			})
	})

	const addMovie = () => {
		Axios.post("http://localhost:3000/create", {
			movieId: MOVIEID,
			status: movieStatus,
			score: movieScore,
			progress: movieProgress,
			userId: username
		}).then(() => {
			console.log("Info bien envoyé !")
		})
	};

	const showList = () => {
		Axios.get("http://localhost:3000/showList")
			.then((response) => {
				const getId = response.data.filter(data => data.userId === username);
				if (data.userId === username) {
					setCrudList(response.data)
				} else {
					console.log("pas de data enregistre par cet utilisateur")
				}
			})
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

			<div className="crud-modal">
				<h1>Status</h1>
				<input
					type="text"
					placeholder="Cécilia"
					onChange={(e) => {
						setMovieStatus(e.target.value);
					}}
				/>

				<h1>Progress</h1>
				<input
					type="number"
					placeholder="Cécilia"
					onChange={(e) => {
						setMovieProgress(e.target.value);
					}}
				/>

				<h1>Score</h1>
				<input
					type="number"
					placeholder="Cécilia"
					onChange={(e) => {
						setMovieScore(e.target.value);
					}}
				/>
				<button onClick={addMovie}>Save</button>
				{console.log({ MOVIEID })}

				<button onClick={showList}>show</button>
				{
					crudList.map((val, key) => {
						return <div>{val.userId}</div>
					})
				}
			</div>
		</div>
	);
}

export default Moviedetails;