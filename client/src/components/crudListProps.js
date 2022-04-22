import React, { useState } from 'react'

export default function CrudListProps(props) {
	const classes = `crud-modal ${props.className}`;

	const [isVisible, setVisible] = useState(false);

	const addMovie = (event) => {
		event.preventDefault();
		setVisible(!isVisible);
	}

	return (
		<div className={classes}>
			<form onSubmit={addMovie}>
				<h1>Statut</h1>
				<input
					type="text"
					placeholder="Cécilia"
					onChange={(e) => {
						props.setMovieStatus(e.target.value);
					}}
				/>
				<h1>Progression</h1>
				<input
					type="number"
					placeholder="Cécilia"
					onChange={(e) => {
						props.setMovieProgress(e.target.value);
					}}
				/>
				<h1>Note</h1>
				<input
					type="number"
					placeholder="Cécilia"
					onChange={(e) => {
						props.setMovieScore(e.target.value);
					}}
				/>

				<button onClick={props.addMovie} type='submit'>Envoyer</button>
			</form>

			<div className={isVisible ? null : 'hidden'}><p>Film bien ajouté à votre liste !</p></div>
		</div>
	);
}