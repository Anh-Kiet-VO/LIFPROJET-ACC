import React, { useEffect, useState, useEffectLayout } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';


function Edit() {
	let { id } = useParams();

	const [newmovieStatus, setnewMovieStatus] = useState("")
	const [newmovieProgress, setnewMovieProgress] = useState(0)
	const [newmovieScore, setnewMovieScore] = useState(0)

	const updateMovie = (movieId, userId) => {
		Axios.put("http://localhost:3001/update", {
			movieId: movieId,
			status: newmovieStatus,
			score: newmovieScore,
			progress: newmovieProgress,
			userId: userId
		}).then(() => {
			console.log("Film bien modifié !")
		});
	}

	return (
		<div>
			{
				<div className="salutCecilia">

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
					<button onClick={() => { updateMovie(id) }}>Editer</button>
				</div>


			}
		</div>


	)
}

export default Edit;
