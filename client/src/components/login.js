import React from 'react'
import { useState } from 'react';

export default function Login(props) {
	const [isActive, setActive] = useState("false");

	const displayLogin = () => {
	  setActive(!isActive);
	};

	return (
		<div className="Login">
			<div className={isActive? "hidden" : ""} id="register-modal">
				<h1>Login</h1>
				<input
				type="email"
				placeholder="Email@Email.fr"
				onChange={(e) => {
					props.setEmail(e.target.value);
				}}
				/>
				<input
				type="password"
				placeholder= "Password..."
				onChange={(e) => {
					props.setPassword(e.target.value);
				}}
				/>

				<button onClick={props.login}>Login</button>
			</div>

        <button onClick={displayLogin}>Se connecter</button>

		{props.loginStatus && (
        <button onClick={props.userAuthenticated}>Check if authenticate</button>
      )}
      </div>
	);
}
