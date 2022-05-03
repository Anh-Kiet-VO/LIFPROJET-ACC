import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";

import Axios from "axios";
import Search from "../components/SearchMovie";
import CardMovie from "../components/CardMovie";

import "../style/media.css";

/*
	Page des films, on peut y retrouver les films du moment et faire les recherches des films
	chaque carte renvoie au détail d'un film
*/
function Movie() {

	const [movieId, setMovieId] = useState('');

	const [data, setData] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const [pageCount, setPageCount] = useState(1);
	const [currentPage, setcurrentPage] = useState(1);

	const [popular, setPopular] = useState(true);
	const [search, setSearch] = useState(false);

	const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";
	const IMG_URL_POSTER = "https://image.tmdb.org/t/p/w500";

	const LANGUAGE = '&language=fr';
	const API_URL = 'https://api.themoviedb.org/3/discover/movie?' + API_KEY + `&sort_by=popularity.desc&page=${currentPage}` + LANGUAGE;/*+ '&sort_by=popularity.desc&page=1'*/

	let navigate = useNavigate();

	// Si l'utilisateur n'est pas connecté on le renvoie vers la page de connexion
	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/");
		}

		loadMovieData();
	}, [])

	const getMovieInfo = (e) => {
		const getId = e.currentTarget.attributes.id.value;
		setMovieId(getId);
	}

	// Récupère les données des films
	const loadMovieData = async () => {
		await fetch(API_URL)
			.then(res => res.json())
			.then(data => {
				setData(data);
				setPageCount(data.total_pages);
				setIsLoaded(true);
			});
	}

	// La petite vignette avec l'affiche, le titre et la note
	// S'il n'y a pas d'image alors on met un placeholder à la place
	const createCard = (movie) => {
		if (movie.poster_path == null) {
			return (
				<CardMovie
					id={movie.id}
					key={movie.id}
					getMovieInfo={getMovieInfo}
					movieIdDetail={movieId}
					title={movie.title}
					score={movie.vote_average}
					url={'/no_image.png'}

				/>
			)
		} else {
			return (
				<CardMovie
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
	}

	// Basculer sur la section Films tendances
	const togglePopular = () => {
		var active = document.getElementsByClassName('is-active')[0];
		if(active) active.classList.remove('is-active');
		document.activeElement.classList.add('is-active');
		setPopular(true);
		setSearch(false);
	}

	// Basculer sur la barre de recherche
	const toggleSearch = () => {
		var active = document.getElementsByClassName('is-active')[0];
		if(active) active.classList.remove('is-active');
		document.activeElement.classList.add('is-active');
		setPopular(false);
		setSearch(true);
	}

	return (
		<div className="media-display">
			<div className="buttons-ps">
				<button className="is-active" onClick={() => togglePopular()}>Films tendance</button>
				<button onClick={() => toggleSearch()}>Recherche</button>
			</div>

			{popular && isLoaded && (
				data.results?.map(movie => (
					createCard(movie)
				))
			)
			}

			{search && (
				<Search />
				)
			}

		</div>

	);
}

export default Movie;