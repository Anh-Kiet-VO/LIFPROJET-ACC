import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Axios from "axios";
import SearchTv from "../components/searchTv";

import "../App.css";

import CardTv from '../components/cardTv';

function Tv() {

	const [movieId, setMovieId] = useState('');

	const [data, setData] = useState([]);

	const [page, setPage] = useState(1);

	const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";
	const LANGUAGE = '&language=fr';
	const API_URL = 'https://api.themoviedb.org/3/discover/tv?' + API_KEY + `&sort_by=popularity.desc&page=${page}` + LANGUAGE;/*+ '&sort_by=popularity.desc&page=1'*/

	const getMovieInfo = (e) => {
		const getId = e.currentTarget.attributes.id.value;
		setMovieId(getId);
	}

	const userAuthenticated = () => {
		Axios.get("http://localhost:3001/isUserAuth", {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		}).then((response) => {
			console.log(response);
		})
	}

	let navigate = useNavigate();

	useEffect(() => {
		/*if (localStorage.getItem("token") == null) {
			navigate("/");
		}*/

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
			<CardTv
				id={movie.id}
				key={movie.id}
				getMovieInfo={getMovieInfo}
				movieIdDetail={movieId}
				title={movie.name}
				score={movie.vote_average}
				url={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
			/>
		)
	}

	return (
		<div className="media-display">
			<SearchTv />

		</div>

	);
}

export default Tv;