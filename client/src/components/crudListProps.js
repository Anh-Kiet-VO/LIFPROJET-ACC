import React from 'react'

export default function crudListProps(props) {
	return (
		<div className="crud-modal">
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
			<button onClick={props.addMovie}>Envoyer</button>
		</div>
	);
}