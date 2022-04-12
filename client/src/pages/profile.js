import React, { useEffect, useState, useEffectLayout } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile() {
	let { id } = useParams();

	const [username, setUsername] = useState("");
	const [crudList, setCrudList] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:3001/basicInfo/${id}`)
			.then((response) => {
				setUsername(response.data[0].username);
			});


	}, [])

	const showList = () => {
		axios.get(`http://localhost:3001/movieList/${username}`)
			.then((response) => {
				setCrudList(response.data) // Erreur fetch, parfois renvoie error
				// GET http://localhost:3001/movieList/ 404 (Not Found)
				// Uncaught (in promise) Error: Request failed with status code 404
			});
	}

	return (
		<div>
			<h1>Bienvenue {username}</h1>

			<button onClick={showList}>show</button>
			{
				crudList.map((val, key) => {
					return (
						<div key={key} className="crud-list">
							<h1>{val.movieId}</h1>
							<h1>{val.title}</h1>
							<h1>{val.status}</h1>
							<h1>{val.score}</h1>
							<h1>{val.progress}</h1>
							<h1>{val.userId}</h1>
							<input type="text" id="updateInput" />
							<button>Update</button>
						</div>
					)
				})
			}
		</div>


	)
}

export default Profile;
