import React from 'react'

export default function crudListProps(props) {
	return (
		<div className="crud-modal">
			<h1>Status</h1>
			<input
				type="text"
				placeholder="Cécilia"
				onChange={(e) => {
					props.setMovieStatus(e.target.value);
				}}
			/>

			<h1>Progress</h1>
			<input
				type="number"
				placeholder="Cécilia"
				onChange={(e) => {
					props.setMovieProgress(e.target.value);
				}}
			/>

			<h1>Score</h1>
			<input
				type="number"
				placeholder="Cécilia"
				onChange={(e) => {
					props.setMovieScore(e.target.value);
				}}
			/>
			<button onClick={props.addMovie}>Save</button>

			<button onClick={props.showList}>show</button>
			{
				props.crudList.filter(user => user.userId == props.username)
					.map((val, key) => {
						return (
							<div key={key} className="crud-list">
								<h1>{val.movieId}</h1>
								<h1>{val.title}</h1>
								<h1>{val.status}</h1>
								<h1>{val.score}</h1>
								<h1>{val.progress}</h1>
								<h1>{val.userId}</h1>
								<button onClick={() => { props.deleteMovie(val.movieId) }}>Delete</button>

								<h1>EDIT</h1>
								<h1>Status</h1>
								<input
									type="text"
									placeholder="Completed..."
									onChange={(e) => {
										props.setnewMovieProgress(e.target.value);
									}}
								/>

								<h1>Progress</h1>
								<input
									type="number"
									placeholder="1"
									onChange={(e) => {
										props.setnewMovieProgress(e.target.value);
									}}
								/>

								<h1>Score</h1>
								<input
									type="number"
									placeholder="7"
									onChange={(e) => {
										props.setnewMovieScore(e.target.value);
									}}
								/>
								<button onClick={props.updateMovie(val.movieId)}>Editer</button>
							</div>
						)
					})
			}
		</div>
	);
}