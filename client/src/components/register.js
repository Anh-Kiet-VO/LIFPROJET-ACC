import React from 'react'
import { useState } from 'react';

/*
	Permet à l'utilisateur de s'enregistrer
*/
export default function Register(props) {
	return (
		<div className="inner">
				<h2>Inscription</h2>
				<label>Pseudo</label>
				<input
					type="text"
					placeholder="Pseudo"
					onChange={(e) => {
						props.setUsernameReg(e.target.value);
					}}
				/>
				<label>Mot de passe</label>
				<input
					type="password"
					placeholder="Mot de passe"
					onChange={(e) => {
						props.setPasswordReg(e.target.value);
					}}
				/>
				<button className="btn-cf" onClick={props.register}>S'inscrire</button>
		</div>
	);
}
