import React from 'react'
import { Link } from "react-router-dom";

export default function CardMovie(props) {
	return (
		<div key={props.id} id={props.id} className='movie-link' onClick={props.getMovieInfo}>
			<Link to={`/detailMovie/${props.id}`}><div className="media-img"><img src={props.url} alt={props.title} /></div></Link>
			<div className="card-text">
				<div className="media-title">{props.title}</div>
				<p>{props.score}</p>
			</div>
		</div>
	)
}
