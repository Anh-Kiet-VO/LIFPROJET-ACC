import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import Axios from "axios"

import CompSheetMovie from '../components/CompSheetMovie';
import CompSheetMovieCredits from "../components/CompSheetMovieCredits";
import CrudListProps from '../components/CrudListProps';

import '../App.css';
import '../style/sheet.css';

/*
	Page permettant d'avoir les détails d'un film
*/
const Moviedetails = () => {
	const movieId = useParams();

	const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";

	const LANGUAGE = '&language=fr';

	const API_URL_TRAILER = 'https://api.themoviedb.org/3/movie/' + movieId.id + '?' + API_KEY + '&append_to_response=videos';

	const API_URL_DETAILS = 'https://api.themoviedb.org/3/movie/' + movieId.id + '?' + API_KEY + LANGUAGE;
	const API_URL_CREDITS = 'https://api.themoviedb.org/3/movie/' + movieId.id + '/credits?' + API_KEY + LANGUAGE;

	const [data, setData] = useState([]);

	const [credits, setCredits] = useState([]);

	const [MOVIEID, setMovieId] = useState("");

	const [title, setTitle] = useState("");

	const [trailer, setTrailer] = useState([]);

	// Récupère les données du film
	useEffect(() => {
		loadMovieData();
		setMovieId(movieId.id)
		loadMovieCredits();
		loadTrailer();
	}, [])

	// Récupère les données du film
	const loadMovieData = async () => {
		await fetch(API_URL_DETAILS)
			.then(res => res.json())
			.then(data => {
				setData(data);
				setTitle(data.title);
			});
	}

	// Récupère le trailer du film
	const loadTrailer = async () => {
		await fetch(API_URL_TRAILER)
			.then(res => res.json())
			.then(data => {
				setTrailer(data.videos.results[0].key);
			});
	}

	const [isVisible, setVisible] = useState(false);

	// Récupère les crédits du film
	const loadMovieCredits = async () => {
		await fetch(API_URL_CREDITS)
			.then(res => res.json())
			.then(credits => {
				setCredits(credits);
			});
	}

	// Le code du trailer à afficher
	const YoutubeEmbed = ({ embedId }) => (
		<div className="video-responsive">
			<iframe
				width="853"
				height="480"
				src={`https://www.youtube.com/embed/${embedId}`}
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
				title="Embedded youtube"
			/>
		</div>
	);

	YoutubeEmbed.propTypes = {
		embedId: PropTypes.string.isRequired
	};

	// On appelle notre composant pour créer la carte information du film
	const createSheet = (media) => {
		const addListCrud = () => {
			setVisible(!isVisible);
		}

		return (
			<CompSheetMovie
				key={media.id}
				id={media.id}
				title={media.title}
				description={media.overview}
				date={media.release_date}
				genres={media.genres_ids}
				runtime={media.runtime}
				score={media.vote_average}
				url={"https://image.tmdb.org/t/p/w500" + media.poster_path}
				addListCrud={addListCrud}
			/>
		)
	}

	// On appelle notre composant pour créer la partie crédit du film
	const createSheetMovieCredits = (credits) => {
		if (credits !== credits.length) {
			return (
				<CompSheetMovieCredits
					cast={credits.cast}
				/>
			)
		}

	}

	const [movieStatus, setMovieStatus] = useState("");
	const [movieProgress, setMovieProgress] = useState(0);
	const [movieScore, setMovieScore] = useState(0);

	const [username, setUsername] = useState("");

	const [crudList, setCrudList] = useState([]);

	// Second useEffect qui récupère le username de l'utilisateur connecté
	useEffect(() => {
		Axios.get("http://localhost:3000/login") //1
			.then((response) => {
				setUsername(response.data.user[0].username);
			})
	}, [])

	// Permet d'ajouter à la liste de l'utilisateur le film
	const addMovie = () => {
		Axios.post("http://localhost:3001/create", {
			movieId: MOVIEID,
			title: title,
			status: movieStatus,
			score: movieScore,
			progress: movieProgress,
			userId: username
		})
	};

	return (
		<div className="sheet-page">
			{
				data ? createSheet(data) : null
			}
			<CrudListProps
				setMovieStatus={setMovieStatus}
				setMovieProgress={setMovieProgress}
				setMovieScore={setMovieScore}
				addMovie={addMovie}
				crudList={crudList}
				username={username}
			/>
			<div className="video">
                <YoutubeEmbed embedId={trailer} />
            </div>
			{
				credits ? createSheetMovieCredits(credits) : null
			}
		</div>
	);
}

export default Moviedetails;