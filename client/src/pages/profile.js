import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import WatchingList from '../components/WatchingList';
import CompletedList from '../components/CompletedList';
import PlanningList from '../components/PlanningList';

import '../style/profile.css';

/*
	Page profil de l'utilisateur, il peut retrouver sa liste de film/série
*/
function Profile() {
	// On récupère l'id présent dans l'url
	let { id } = useParams();

	const [username, setUsername] = useState("");
	const [crudList, setCrudList] = useState([]);

	// Requête vers notre API pour récuperer les informations en fonction de l'id présent dans l'url
	useEffect(() => {
		axios.get(`http://localhost:3001/basicInfo/${id}`)
			.then((response) => {
				axios.get("http://localhost:3001/movieList/" + response.data[0].username)
					.then((response) => {
						setCrudList(response.data);
					})
				setUsername(response.data[0].username);
			})

	}, [])


	return (
		<div className="profile-page">
			<h1>Bienvenue {username} !</h1>
			<h2>En train de regarder</h2>
			<WatchingList
				crudList={crudList}
			/>

			<h2>Complétés</h2>
			<CompletedList
				crudList={crudList}
			/>

			<h2>Prévu de regarder</h2>
			<PlanningList
				crudList={crudList}
			/>

		</div>


	)
}

export default Profile;
