import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CompSheet from '../components/CompSheetTv';
import '../App.css';

const TVdetails = () => {
    let tvId = useParams();
    console.log(tvId.id);

    const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";

    const LANGUAGE = '&language=fr';

    const API_URL_DETAILS = 'https://api.themoviedb.org/3/tv/' + tvId.id + '?' + API_KEY + LANGUAGE;
    const API_URL_CREDITS = 'https://api.themoviedb.org/3/tv/' + tvId.id + '/credits?' + API_KEY + LANGUAGE;

    const [data, setData] = useState([]);

    useEffect(() => {
        loadTvData();
    }, [])

    const loadTvData = async () => {
        await fetch(API_URL_DETAILS)
            .then(res => res.json())
            .then(data => {
                setData(data);
                console.log(data)
            });
    }

    const loadTvDetails = async () => {
        await fetch(API_URL_CREDITS)
            .then(res => res.json())
            .then(data => {
                setData(data);
            });
    }

    const createSheet = (media) => {
        return (
            <CompSheet
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

    return (
        <div className="Sheet">
            {
                //createSheet(data.results[1])
                /*data.results?.map(movie => (
                  createCard(movie)
                ))*/
                data ? createSheet(data) : null

            }
        </div>
    );
}

export default TVdetails;