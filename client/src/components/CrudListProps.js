import React, { useState } from 'react';

import '../style/crud.css';

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
				<div>
				<h3>Statut</h3>
				<select onChange={(e) => handleChange(e)}>
					<option value="Completed">Fini</option>
					<option value="Watching">En train de regarder</option>
					<option value="Planning">A regarder</option>
				</select>
				</div>
				<div>
				<h3>Progression</h3>
				<input
					type="number"
					placeholder=""
					onChange={(e) => {
						props.setMovieProgress(e.target.value);
					}}
				/>
				</div>
				<div>
				<h3>Note</h3>
				<input
					type="number"
					placeholder="../10"
					min="0"
					max="10"
					onChange={(e) => {
						props.setMovieScore(e.target.value);
					}}
				/>
				</div>

				<button onClick={props.addMovie} type='submit'>Envoyer</button>
			</form>

			<div className={isVisible ? null : 'hidden'}><p>Média bien ajouté à votre liste !</p></div>
		</div>
	);
}