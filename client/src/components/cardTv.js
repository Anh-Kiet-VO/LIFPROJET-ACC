import React from 'react'
import { Link } from "react-router-dom";

export default function CardTv(props) {
    return (
        <div key={props.id} id={props.id} className='movie-link' onClick={props.getMovieInfo}>
            <Link to={`/detailTv/${props.id}`}><img src={props.url} alt={props.title} /></Link>
            <div className='card-text'>
                <h2>{props.title}</h2>
                <p>{props.score}</p>
            </div>
        </div>
    )
}
