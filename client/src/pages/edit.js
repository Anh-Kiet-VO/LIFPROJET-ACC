import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

/*
	Page pour éditer le film/série que nous avons dans la liste
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
		<div>
			{
				<div className="salutCecilia">
					<form onSubmit={editMovie}>
						<h1>Status</h1>
						<select onChange={(e) => handleChange(e)}>
							<option value="">Status</option>
							<option value="Completed">Fini</option>
							<option value="Watching">En train de regarder</option>
							<option value="Planning">A regarder</option>
						</select>

						<h1>Progession</h1>
						<input
							type="number"
							placeholder="Progession"
							onChange={(e) => {
								setnewMovieProgress(e.target.value);
							}}
						/>

						<h1>Note</h1>
						<input
							type="number"
							placeholder=".../10"
							onChange={(e) => {
								setnewMovieScore(e.target.value);
							}}
						/>
						<button type='submit'>Editer</button>
					</form>
					<div className={isVisible ? null : 'hidden'}><p>Données bien modifiés !</p></div>
				</div>



			}
		</div>


	)
}

export default Edit;
