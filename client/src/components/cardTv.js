import React from 'react';
import { Link } from "react-router-dom";

/*
    Permet de créer une carte d'une série
*/

export default function CardTv(props) {
    return (
        <div key={props.id} id={props.id} className='movie-link' onClick={props.getMovieInfo}>
            <Link to={`/detailTv/${props.id}`}>
                <div className="media-img">
                    <img src={props.url} alt={props.title} />
                </div>
            </Link>
            <div className="card-text">
                <div className="media-title">{props.title}</div>
                <p>{props.score}</p>
            </div>
        </div>
    )
}
