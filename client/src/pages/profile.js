import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import WatchingList from '../components/WatchingList';
import CompletedList from '../components/CompletedList';
import PlanningList from '../components/PlanningList';

function Profile() {
	let { id } = useParams();

	const [username, setUsername] = useState("");
	const [crudList, setCrudList] = useState([]);

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
		<div>
			<h1>Bienvenue {username}</h1>
			<h1>En train de regarder :</h1>
			<WatchingList
				crudList={crudList}
			/>

			<h1>Complété : </h1>
			<CompletedList
				crudList={crudList}
			/>

			<h1>Prévu de regarder : </h1>
			<PlanningList
				crudList={crudList}
			/>
			{/* {
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
			} */}

		</div>


	)
}

export default Profile;
