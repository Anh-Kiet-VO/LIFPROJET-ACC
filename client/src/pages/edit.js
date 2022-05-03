import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

import '../style/crud.css';

/*
	Page pour éditer le film/série que nous avons dans notre liste
*/
function Edit() {
	// On récupère l'id présent dans l'url
	let { id } = useParams();

	const [username, setUsername] = useState("")

	useEffect(() => {
		Axios.get("http://localhost:3000/login") //1
			.then((response) => {
				setUsername(response.data.user[0].username);
			})
	}, [])

	// useState permettant de récuperer les nouveaux données de l'utilisateur
	const [newmovieStatus, setnewMovieStatus] = useState("")
	const [newmovieProgress, setnewMovieProgress] = useState(0)
	const [newmovieScore, setnewMovieScore] = useState(0)

	// Requête vers notre API pour mettre à jour le détail d'un film/série
	const updateMovie = (movieId) => {
		Axios.put("http://localhost:3001/update", {
			movieId: movieId,
			userId: username,
			status: newmovieStatus,
			score: newmovieScore,
			progress: newmovieProgress,
		});
	}

	const [isVisible, setVisible] = useState(false);

	// Après que l'utilisateur a envoyé son formulaire, on appelle la fonction qui va envoyer les données
	const editMovie = (event) => {
		event.preventDefault();
		updateMovie(id);
		setVisible(!isVisible);
	}

	const handleChange = (e) => {
		setnewMovieStatus(e.target.value);
	}

	return (
		<div className="crud-modal edit">
			<h2>Editer</h2>
			<form onSubmit={editMovie}>
				<div>
				<h3>Statut</h3>
				<select onChange={(e) => handleChange(e)}>
					<option value="">Status</option>
					<option value="Completed">Fini</option>
					<option value="Watching">En train de regarder</option>
					<option value="Planning">A regarder</option>
				</select>
				</div>

				<div>
				<h3>Progession</h3>
				<input
					type="number"
					placeholder="Progession"
					onChange={(e) => {
						setnewMovieProgress(e.target.value);
					}}
				/>
				</div>
				
				<div>
				<h3>Note</h3>
				<input
					type="number"
					placeholder=".../10"
					onChange={(e) => {
						setnewMovieScore(e.target.value);
					}}
				/>
				</div>
				<button type='submit'>Editer</button>
			</form>
			<div className={isVisible ? null : 'hidden'}><p>Données bien modifiés !</p></div>
		</div>
	)
}

export default Edit;
