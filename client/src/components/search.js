import React, { useEffect, useState } from 'react';
import CardMovie from "./cardMovie"

const Search = () => {

	const [movieId, setMovieId] = useState('');

	const [data, setData] = useState([]);

	const [search, setSearch] = useState(".");

	const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";
	const IMG_URL_POSTER = 'https://image.tmdb.org/t/p/w500';
	const LANGUAGE = '&language=fr';

	const BASE_URL = "https://api.themoviedb.org/3";
	const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY + `&query=${search}` + LANGUAGE;

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

	const createCard = (movie) => {
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

export default Search;