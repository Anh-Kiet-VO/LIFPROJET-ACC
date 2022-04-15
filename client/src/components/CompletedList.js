import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios';
import * as Fa from "react-icons/fa";

export default function CompletedList(props) {
	const [username, setUsername] = useState("")

	useEffect(() => {
		Axios.get("http://localhost:3000/login") //1
			.then((response) => {
				setUsername(response.data.user[0].username);
			})
	}, [])

	return (
		<div className="Completed-list">
			{
				props.crudList.filter(status => status.status == "Completed")
					.map((val, key) => {
						return (
							<div key={key} className="crud-list">
								<h1>{val.title}</h1>
								<h1>Note : {val.score} /10</h1>
								<h1> Progression : {val.progress}</h1>
								{val.userId == username ? <Link to={`/edit/${val.movieId}`}><Fa.FaEdit /></Link> : null}
							</div>
						)
					})
			}
		</div>
	);
}