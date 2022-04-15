import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios';
import * as Fa from "react-icons/fa";
import * as Ai from "react-icons/ai";

export default function WatchingList(props) {
	const [username, setUsername] = useState("")

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
	}

	return (
		<div className="watching-list">
			{
				props.crudList.filter(status => status.status == "Watching")
					.map((val, key) => {
						return (
							<div key={key} className="crud-list">
								{/* <h1>{val.movieId}</h1> */}
								<h1>{val.title}</h1>
								<h1>Note : {val.score} / 10</h1>
								<h1>Progression : {val.progress}</h1>
								{val.userId == username ? <Link to={`/edit/${val.movieId}`}><Fa.FaEdit /></Link> : null}
								{val.userId == username ? <Ai.AiFillDelete onClick={() => { deleteMovie(val.movieId) }} /> : null}
							</div>
						)
					})
			}
		</div>
	);
}