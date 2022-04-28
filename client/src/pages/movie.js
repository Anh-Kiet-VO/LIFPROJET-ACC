import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

import Axios from "axios";
import Search from "../components/search";

import "../App.css";
import "../style/media.css";

/*
	Page des films, on peut y retrouver les films du moment et faire les recherches des films
	chaque carte renvoie au détail d'un film
*/
function Movie() {

	const [movieId, setMovieId] = useState('');

	const [data, setData] = useState([]);

	const [page, setPage] = useState(1);

	const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";

	const LANGUAGE = '&language=fr';
	const API_URL = 'https://api.themoviedb.org/3/discover/movie?' + API_KEY + `&sort_by=popularity.desc&page=${page}` + LANGUAGE;/*+ '&sort_by=popularity.desc&page=1'*/

	let navigate = useNavigate();

	// Si l'utilisateur n'est pas connecté on le renvoie vers la page de connexion
	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/");
		}

		loadMovieData();
	}, [])

	// Récupère les données des films
	const loadMovieData = async () => {
		await fetch(API_URL)
			.then(res => res.json())
			.then(data => {
				setData(data);
			});
	}

	return (
		<div className="media-display">
			<Search />

			{
				/*data.results?.map(movie => (
					createCard(movie)
				))*/
			}

		</div>

	);
}

export default Movie;