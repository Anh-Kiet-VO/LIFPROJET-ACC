import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";

import Axios from "axios";
import SearchTv from "../components/SearchTv";
import CardTv from "../components/CardTv";

import "../style/media.css";

/*
	Page des séries, on peut y retrouver les séries du moment et faire les recherches des séries
	chaque carte renvoie au détail d'une série
*/
function Tv() {

	const [serieId, setSerieId] = useState('');

	const [data, setData] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const [pageCount, setPageCount] = useState(1);
	const [currentPage, setcurrentPage] = useState(1);

	const [popular, setPopular] = useState(true);
	const [search, setSearch] = useState(false);

	const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";
	const IMG_URL_POSTER = "https://image.tmdb.org/t/p/w500";

	const LANGUAGE = '&language=fr';
	const API_URL = 'https://api.themoviedb.org/3/discover/tv?' + API_KEY + `&sort_by=popularity.desc&page=${currentPage}` + LANGUAGE;/*+ '&sort_by=popularity.desc&page=1'*/

	let navigate = useNavigate();

	// Si l'utilisateur n'est pas connecté on le renvoie vers la page de connexion
	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/");
		}

		loadMovieData();
	}, [])

	const getSerieInfo = (e) => {
		const getId = e.currentTarget.attributes.id.value;
		setSerieId(getId);
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
	const createCard = (serie) => {
		if (serie.poster_path == null) {
			return (
				<CardTv
					id={serie.id}
					key={serie.id}
					getSerieInfo={getSerieInfo}
					serieIdDetail={serieId}
					title={serie.name}
					score={serie.vote_average}
					url={'/no_image.png'}

				/>
			)
		} else {
			return (
				<CardTv
					id={serie.id}
					key={serie.id}
					getSerieInfo={getSerieInfo}
					serieIdDetail={serieId}
					title={serie.name}
					score={serie.vote_average}
					url={IMG_URL_POSTER + serie.poster_path}
				/>
			)
		}
	}

	// Basculer sur la section Séries tendances
	const togglePopular = () => {
		var active = document.getElementsByClassName('is-active')[0];
		if (active) active.classList.remove('is-active');
		document.activeElement.classList.add('is-active');
		setPopular(true);
		setSearch(false);
	}

	// Basculer sur la barre de recherche
	const toggleSearch = () => {
		var active = document.getElementsByClassName('is-active')[0];
		if (active) active.classList.remove('is-active');
		document.activeElement.classList.add('is-active');
		setPopular(false);
		setSearch(true);
	}

	return (
		<div className="media-display">
			<div className="buttons-ps">
				<button className="is-active" onClick={() => togglePopular()}>Séries tendance</button>
				<button onClick={() => toggleSearch()}>Recherche</button>
			</div>

			{popular && isLoaded && (
				data.results?.map(serie => (
					createCard(serie)
				))
			)
			}

			{search && (
				<SearchTv />
			)
			}

		</div>

	);
}

export default Tv;