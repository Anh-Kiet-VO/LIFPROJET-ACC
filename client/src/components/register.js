import React from 'react'
import { useState } from 'react';

/*
	Permet à l'utilisateur de s'enregistrer
*/
export default function Register(props) {
	const [isActive, setActive] = useState("false");

	const displayRegister = () => {
		setActive(!isActive);
	};

	return (
		<div className="registration">
			<div className={isActive ? "hidden" : ""} id="register-modal">
				<h1>Registration</h1>
				<label>Username</label>
				<input
					type="text"
					onChange={(e) => {
						props.setUsernameReg(e.target.value);
					}}
				/>
				<label>Password</label>
				<input
					type="password"
					onChange={(e) => {
						props.setPasswordReg(e.target.value);
					}}
				/>
				<button onClick={props.register}>Register</button>
			</div>

			<button onClick={displayRegister}>S'inscrire</button>
		</div>
	);
}
