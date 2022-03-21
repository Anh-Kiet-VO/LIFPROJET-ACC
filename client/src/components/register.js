import React from 'react'
import { useState } from 'react';

export default function Register(props) {
	const [isActive, setActive] = useState("false");

	const displayRegister = () => {
	  setActive(!isActive);
	};

	return (
		<div className="registration">
			<div className={isActive? "hidden" : ""} id="register-modal">
				<h1>Registration</h1>
				<label>Email</label>
				<input
				type="email"
				onChange={(e) => {
					props.setEmailReg(e.target.value);
				}}
				/>
				<label>Password</label>
				<input
				type="text"
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
