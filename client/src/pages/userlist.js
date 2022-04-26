import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import '../style/userlist.css';

function Userlist() {
	const [userlist, setUserlist] = useState([]);

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
