import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import Axios from "axios"

import CompSheetTv from '../components/CompSheetTv';
import CompSheetTvCredits from "../components/CompSheetTvCredits";
import CrudListProps from '../components/crudListProps';

import '../App.css';

/*
    Page permettant d'avoir les détails d'une série
*/
const TVdetails = () => {
    // On récupère l'id présent dans l'url
    let movieId = useParams();

    const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";

    const LANGUAGE = '&language=fr';

    const API_URL_TRAILER = 'https://api.themoviedb.org/3/tv/' + movieId.id + '?' + API_KEY + '&append_to_response=videos';

    const API_URL_DETAILS = 'https://api.themoviedb.org/3/tv/' + movieId.id + '?' + API_KEY + LANGUAGE;
    const API_URL_CREDITS = 'https://api.themoviedb.org/3/tv/' + movieId.id + '/credits?' + API_KEY + LANGUAGE;

    const [data, setData] = useState([]);

    const [credits, setCredits] = useState([]);

    const [MOVIEID, setMovieId] = useState("")

    const [title, setTitle] = useState("")

    const [trailer, setTrailer] = useState([]);

    // Dès la mise en place de la page on va récuperer les données
    useEffect(() => {
        loadTvData();
        setMovieId(movieId.id)
        loadTvCredits();
        loadTrailer();
    }, [])

    // Fetch à notre API TMBD les détails du film
    const loadTvData = async () => {
        await fetch(API_URL_DETAILS)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setTitle(data.name);
            });
    }

    const loadTrailer = async () => {
        await fetch(API_URL_TRAILER)
            .then(res => res.json())
            .then(data => {
                setTrailer(data.videos.results[0].key);
            });
    }

    const [isVisible, setVisible] = useState(false);

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

    // Fetch à notre API TMBD les crédits du film
    const loadTvCredits = async () => {
        await fetch(API_URL_CREDITS)
            .then(res => res.json())
            .then(credits => {
                setCredits(credits);
            });
    }

    // On appele notre composant pour créer la carte information de la série
    const createSheet = (media) => {
        const addListCrud = () => {
            setVisible(!isVisible);
        }

        return (
            <CompSheetTv
                key={media.id}
                id={media.id}
                title={media.name}
                description={media.overview}
                date={media.release_date}
                genres={media.genre_ids}
                score={media.vote_average}
                url={"https://image.tmdb.org/t/p/w500" + media.poster_path}
                addListCrud={addListCrud}
            />
        )
    }

    // On appelle notre composant pour créer la partie crédit de la série
    const createTvCredits = (credits) => {
        if (credits != credits.length) {
            return (
                <CompSheetTvCredits
                    cast={credits.cast}
                />
            )
        }
    }

    const [movieStatus, setMovieStatus] = useState("")
    const [movieProgress, setMovieProgress] = useState(0)
    const [movieScore, setMovieScore] = useState(0)

    const [username, setUsername] = useState("")

    const [crudList, setCrudList] = useState([])

    // Second useEffect qui récupère le username de l'utilisateur connecté
    useEffect(() => {
        Axios.get("http://localhost:3000/login") //1
            .then((response) => {
                setUsername(response.data.user[0].username);
            })
    }, [])

    // Permet d'ajouter à la liste de l'utilisateur la série
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
        <div className="Sheet">
            {
                data ? createSheet(data) : null

            }
            <YoutubeEmbed embedId={trailer} />
            {
                credits ? createTvCredits(credits) : null
            }

            <CrudListProps
                setMovieStatus={setMovieStatus}
                setMovieProgress={setMovieProgress}
                setMovieScore={setMovieScore}
                addMovie={addMovie}
                crudList={crudList}
                username={username}
            />
        </div>
    );
}

export default TVdetails;