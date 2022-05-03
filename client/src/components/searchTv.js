import React, { useEffect, useState } from 'react';
import CardTv from "./CardTv"

/*
	La barre de recherche qui va nous permettre de fetch la série
	indiqué par l'utilisateur.
*/
const SearchTv = () => {

	const [movieId, setMovieId] = useState('');

	const [data, setData] = useState([]);

	const [search, setSearch] = useState(".");

	const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";
	const IMG_URL_POSTER = 'https://image.tmdb.org/t/p/w500';
	const LANGUAGE = '&language=fr';

	const BASE_URL = "https://api.themoviedb.org/3";
	const SEARCH_URL = BASE_URL + '/search/tv?' + API_KEY + `&query=${search}` + LANGUAGE;

	const getMovieInfo = (e) => {
		const getId = e.currentTarget.attributes.id.value;
		setMovieId(getId);
	}

	useEffect(() => {
		loadMovieData();
	}, [search])

	const loadMovieData = async () => {
		await fetch(SEARCH_URL)
			.then(res => res.json())
			.then(data => {
				setData(data);
			});
	}

	// S'il n'y a pas d'image alors on met un placeholder à la place
	const createCard = (movie) => {
		if (movie.poster_path == null) {
			return (
				<CardTv
					id={movie.id}
					key={movie.id}
					getMovieInfo={getMovieInfo}
					movieIdDetail={movieId}
					title={movie.name}
					score={movie.vote_average}
					url={'/no_image.png'}

				/>
			)
		} else {
			return (
				<CardTv
					id={movie.id}
					key={movie.id}
					getMovieInfo={getMovieInfo}
					movieIdDetail={movieId}
					title={movie.name}
					score={movie.vote_average}
					url={IMG_URL_POSTER + movie.poster_path}

				/>
			)
		}
	}

	return (
		<div className='search'>
			<div className='search-bar'>
				<form>
					<input
						type="text"
						placeholder="Entrer le titre"
						id="search-input"
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
					<input type="submit" value="Rechercher" />
				</form>
			</div>

			<div className='search-result'>
				{
					data.results?.map(movie => (
						createCard(movie)
					))
				}
			</div>
		</div>
	)
}

export default SearchTv;
