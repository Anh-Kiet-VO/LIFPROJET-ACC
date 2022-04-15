import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function Userlist() {
	const [userlist, setUserlist] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:3001/getAllId/`)
			.then((response) => {
				setUserlist(response.data);
			})

	}, [])

	return (

		<div className="user-list">
			<h1>Utilisateurs enregistré : </h1>
			{
				userlist.map((val, key) => {
					return (
						<div key={key} className="userlist">
							<Link to={`/profile/${val.id}`}> <h1>{val.username}</h1></Link>
						</div>
					)
				})
			}

		</div>


	)
}

export default Userlist;
