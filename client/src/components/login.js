import React from 'react'
import { useState } from 'react';

/*
	Composant qui permet à l'utilisateur de se connecter
*/
export default function Login(props) {
	return (
		<div className="inner">
				<h2>Connexion</h2>
				<input
					type="text"
					placeholder="Pseudo"
					onChange={(e) => {
						props.setUsername(e.target.value);
					}}
				/>
				<input
					type="password"
					placeholder="Mot de passe"
					onChange={(e) => {
						props.setPassword(e.target.value);
					}}
				/>

				<button className="btn-cf" onClick={props.login}>Se connecter</button>

			{props.loginStatus && (
				<button onClick={props.userAuthenticated}>Check if authenticate</button>
			)}
		</div>
	);
}
