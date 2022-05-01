import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios';

import { IconContext } from 'react-icons/lib';
import * as Fa from "react-icons/fa";
import * as Ai from "react-icons/ai";

import '../style/profile.css';

/*
	Section des films/séries plannifié par l'utilisateur
	Composant utilisé dans la page Profile
*/

export default function PlanningList(props) {
	const [username, setUsername] = useState("")

	// On get le pseudo de l'utilisateur pour vérifier s'il peut modifier/éditer la liste
	useEffect(() => {
		Axios.get("http://localhost:3000/login") //1
			.then((response) => {
				setUsername(response.data.user[0].username);
			})
	}, [])

	const deleteMovie = (movieId) => {
		Axios.delete(`http://localhost:3001/delete/${movieId}`).then(() => {
			console.log("Film bien supprimé !")
		})
		window.location.reload();
	}

	return (
		<div className="Planning-list">
			{
				props.crudList.filter(status => status.status == "Planning")
					.map((val, key) => {
						return (
							<div key={key} className="crud-list">
								<h4>{val.title}</h4>
								<IconContext.Provider value={{ className: 'icon' }}>
								{val.userId == username ? <Link to={`/edit/${val.movieId}`}><Fa.FaEdit /></Link> : null}
								{val.userId == username ? <div className='cursor-delete'><Ai.AiFillDelete onClick={() => { deleteMovie(val.movieId) }} /></div> : null}
								</IconContext.Provider>
							</div>
						)
					})
			}
		</div>
	);
}