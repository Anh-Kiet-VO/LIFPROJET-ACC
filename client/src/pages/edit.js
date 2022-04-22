import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';


function Edit() {
	let { id } = useParams();

	const [username, setUsername] = useState("")

	useEffect(() => {
		Axios.get("http://localhost:3000/login") //1
			.then((response) => {
				setUsername(response.data.user[0].username);
				console.log(username)
			})
	}, [])

	const [newmovieStatus, setnewMovieStatus] = useState("")
	const [newmovieProgress, setnewMovieProgress] = useState(0)
	const [newmovieScore, setnewMovieScore] = useState(0)

	const updateMovie = (movieId) => {
		Axios.put("http://localhost:3001/update", {
			movieId: movieId,
			userId: username,
			status: newmovieStatus,
			score: newmovieScore,
			progress: newmovieProgress,
		}).then(() => {
			console.log("Film bien modifié !")
		});
	}

	const [isVisible, setVisible] = useState(false);

	const editMovie = (event) => {
		event.preventDefault();
		updateMovie(id);
		setVisible(!isVisible);
	}

	return (
		<div>
			{
				<div className="salutCecilia">
					<form onSubmit={editMovie}>
						<h1>EDIT</h1>
						<h1>Status</h1>
						<input
							type="text"
							placeholder="Completed / Watching"
							onChange={(e) => {
								setnewMovieStatus(e.target.value);
							}}
						/>

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
