import React, { useEffect, useState } from 'react';
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
			})

		axios.get(`http://localhost:3001/movieList/${username}`)
			.then((response) => {
				console.log(response);
			})
	}, [])

	return (
		<div>
			<h1>Bienvenue {username}</h1>
		</div>
	)
}

export default Profile;
