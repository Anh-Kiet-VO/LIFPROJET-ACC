import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import CardMovie from "./CardMovie"
import "../style/search.css";

/*
	La barre de recherche qui va nous permettre de fetch le film
	indiqué par l'utilisateur.
*/
const Search = () => {

	const [movieId, setMovieId] = useState('');

	const [data, setData] = useState([]);

	const [search, setSearch] = useState(".");

	const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";
	const IMG_URL_POSTER = 'https://image.tmdb.org/t/p/w500';
	const LANGUAGE = '&language=fr';

	const [isLoaded, setIsLoaded] = useState(false);
	const [pageCount, setPageCount] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);

	const BASE_URL = "https://api.themoviedb.org/3";
	const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY + `&query=${search}` + `&page=${currentPage}` + LANGUAGE;
	const API_URL = `https://api.themoviedb.org/3/discover/movie?` + API_KEY + `&sort_by=popularity.desc&page=1` + LANGUAGE;
	/*+ '&sort_by=popularity.desc&page=1'*/

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
				setIsLoaded(true);
			});
	}

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

	return (
		<div className="search">
			<div className="search-bar">
				<form>
					<input
						type="text"
						placeholder="Entrer le titre"
						id="search-input"
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>
					<input type="submit" value="Rechercher" id="search-submit" />
				</form>
			</div>

			<div className="search-result">
				{isLoaded ? (
					data.results?.map(movie => createCard(movie))
				) : (
					<div>Vous pouvez faire votre recherche...</div>
				)
				}
			</div>
		</div>
	)
}

export default Search;