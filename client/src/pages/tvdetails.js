import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CompSheetTv from '../components/CompSheetTv';
import CompSheetTvCredits from "../components/CompSheetTvCredits";
import Axios from "axios"
import CrudListProps from '../components/crudListProps';


import '../App.css';

const TVdetails = () => {
    let movieId = useParams();


    const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";

    const LANGUAGE = '&language=fr';

    const API_URL_DETAILS = 'https://api.themoviedb.org/3/tv/' + movieId.id + '?' + API_KEY + LANGUAGE;
    const API_URL_CREDITS = 'https://api.themoviedb.org/3/tv/' + movieId.id + '/credits?' + API_KEY + LANGUAGE;

    const [data, setData] = useState([]);

    const [credits, setCredits] = useState([]);

    const [MOVIEID, setMovieId] = useState("")

    const [title, setTitle] = useState("")

    useEffect(() => {
        loadTvData();
        setMovieId(movieId.id)
        loadTvCredits();
    }, [])

    const loadTvData = async () => {
        await fetch(API_URL_DETAILS)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setTitle(data.name);
            });
    }

    const loadTvCredits = async () => {
        await fetch(API_URL_CREDITS)
            .then(res => res.json())
            .then(credits => {
                setCredits(credits);
            });
    }

    const createSheet = (media) => {
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
            />
        )
    }

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

    useEffect(() => {
        Axios.get("http://localhost:3000/login") //1
            .then((response) => {
                setUsername(response.data.user[0].username);
            })
    }, [])

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