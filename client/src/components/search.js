import React, { useEffect, useState } from 'react';
import CardMovie from "./cardMovie"

const Search = () => {

	const [movieId, setMovieId] = useState('');

	const [data, setData] = useState([]);

	const [search, setSearch] = useState(".");

	const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";
	const IMG_URL_POSTER = 'https://image.tmdb.org/t/p/w500';
	const LANGUAGE = '&language=fr';

	const [page, setPage] = useState(1);

	const BASE_URL = "https://api.themoviedb.org/3";
	const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY + `&query=${search}` + LANGUAGE;
	const API_URL = `https://api.themoviedb.org/3/discover/movie?` + API_KEY + `&sort_by=popularity.desc&page=1` + LANGUAGE;/*+ '&sort_by=popularity.desc&page=1'*/

	const getMovieInfo = (e) => {
		const getId = e.currentTarget.attributes.id.value;
		setMovieId(getId);
	}

	useEffect(() => {
		loadMovieData();
	}, [search])

	const loadMovieData = async () => {
		/*await fetch(SEARCH_URL)
			.then(res => res.json())
			.then(data => {
				setData(data);
			});*/

		Promise.all([
			fetch(SEARCH_URL),
			fetch(API_URL)
		])
		.then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
		/*.then(([data1, data2]) => this.setState({
            searchMedia: data1,
            popularMedia: data2
        }));
		.then(([data1, data2]) => {
			setData(data1);
			setData(data2);
		});*/
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

						//data.results ? data.results.map(movie => (createCard(movie))) : console.log("rien")
				}
			</div>
		</div>
	)
}

export default Search;
