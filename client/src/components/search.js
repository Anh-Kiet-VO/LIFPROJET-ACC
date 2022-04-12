import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import CardMovie from "./cardMovie"
import "../style/search.css";

const Search = () => {

	const [movieId, setMovieId] = useState('');

	const [data1, setData1] = useState([]);
	const [data2, setData2] = useState([]);

	const [search, setSearch] = useState(".");

	const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";
	const IMG_URL_POSTER = 'https://image.tmdb.org/t/p/w500';
	const LANGUAGE = '&language=fr';

	const [hits, setHits] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [pageCount, setPageCount] = useState(1);
	const [currentPage, setcurrentPage] = useState(1);

	const BASE_URL = "https://api.themoviedb.org/3";
	const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY + `&query=${search}` + `&page=${currentPage}` + LANGUAGE;
	const API_URL = `https://api.themoviedb.org/3/discover/movie?` + API_KEY + `&sort_by=popularity.desc&page=1` + LANGUAGE;/*+ '&sort_by=popularity.desc&page=1'*/

	const getMovieInfo = (e) => {
		const getId = e.currentTarget.attributes.id.value;
		setMovieId(getId);
	}

	useEffect(() => {
		loadMovieData();
	}, [search])

	const loadMovieData = async () => {
		Promise.all([
			fetch(SEARCH_URL),
			fetch(API_URL)
		])
		.then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
		.then(([data1, data2]) => {
			setData1(data1);
			setPageCount(data1.total_pages);
			setIsLoaded(true);
			setData2(data2);
			console.log(data2);
		})
		.catch(error => console.error('Error', error));
	}

	const createCard = (movie) => {
		if(movie.poster_path == null) {
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

	const handlePageChange = (selectedObject) => {
		console.log(selectedObject);
		setcurrentPage(selectedObject.selected + 1);
		loadMovieData();
	};

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
				{(isLoaded && data1.results) ? (
					//data1.results ? data1.results?.map(movie => (createCard(movie))) : data2.results?.map(movie => (createCard(movie)))
					data1.results?.map(movie => createCard(movie))
				) : ( 
					data2.results?.map(movie => createCard(movie))
					//<div></div>
				)
				}

				{isLoaded ? (
					<ReactPaginate
						pageCount={pageCount}
						pageRange={2}
						marginPagesDisplayed={2}
						onPageChange={handlePageChange}
						containerClassName={'container'}
						previousLinkClassName={'page'}
						breakClassName={'page'}
						nextLinkClassName={'page'}
						pageClassName={'page'}
						disabledClassNae={'disabled'}
						activeClassName={'active'}
					/>
				) : (
					<div>Nothing to display</div>
				)} 
			</div>
		</div>
	)
}

export default Search;