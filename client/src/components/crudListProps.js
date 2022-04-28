import React, { useState } from 'react'

/*
	Permet à l'utilisateur d'ajouter un film/série à sa liste
*/
export default function CrudListProps(props) {
	const classes = `crud-modal ${props.className}`;

	const [isVisible, setVisible] = useState(false);

	const addMovie = (event) => {
		event.preventDefault();
		setVisible(!isVisible);
	}

	const handleChange = (e) => {
		props.setMovieStatus(e.target.value);
	}

	return (
		<div className={classes}>
			<form onSubmit={addMovie}>
				<h1>Statut</h1>
				<select onChange={(e) => handleChange(e)}>
					<option value="">Status</option>
					<option value="Completed">Fini</option>
					<option value="Watching">En train de regarder</option>
					<option value="Planning">A regarder</option>
				</select>
				<h1>Progression</h1>
				<input
					type="number"
					placeholder=""
					onChange={(e) => {
						props.setMovieProgress(e.target.value);
					}}
				/>
				<h1>Note</h1>
				<input
					type="number"
					placeholder="../10"
					min="0"
					max="10"
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