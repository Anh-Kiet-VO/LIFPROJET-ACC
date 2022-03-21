import React from 'react'

export default function Card(props) {
  return (
	<div key={props.id} id={props.id} className='movie-link' onClick={props.getMovieInfo}>
		<img src={props.url} alt={props.title}/>
		<div className='card-text'>
		<h2>{props.title}</h2>
		<p>{props.score}</p>
		</div>
	</div>
  )
}
