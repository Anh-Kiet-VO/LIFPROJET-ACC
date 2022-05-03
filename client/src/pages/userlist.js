import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";

import '../style/userlist.css';

/*
	Page qui permet de voir tous les utilisateurs du site
	si nous souhaitons consulter la liste d'un autre utilisateur
*/
function Userlist() {
	const [userlist, setUserlist] = useState([]);

	let navigate = useNavigate();

	// Si l'utilisateur n'est pas connecté on le renvoie vers la page de connexion
	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/");
		}
	}, [])

	useEffect(() => {
		axios.get(`http://localhost:3001/getAllId/`)
			.then((response) => {
				setUserlist(response.data);
			})

	}, [])

	return (

		<div className="userlist">
			<h1>Utilisateurs enregistrés</h1>
			{
				userlist.map((val, key) => {
					return (
						<div key={key} className="user">
							<Link to={`/profile/${val.id}`}>
								<h3>{val.username}</h3>
							</Link>
						</div>
					)
				})
			}

		</div>


	)
}

export default Userlist;
