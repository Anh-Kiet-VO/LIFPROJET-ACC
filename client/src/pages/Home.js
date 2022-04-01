import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Axios from "axios";

import Register from '../components/register';
import Login from '../components/login'

import "../style/home.css";

function Home() {
	const [usernameReg, setUsernameReg] = useState('');
	const [passwordReg, setPasswordReg] = useState('');

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [loginStatus, setLoginStatus] = useState(false);

	const [isActive, setActive] = useState("false");

	const displayRegister = () => {
		setActive(!isActive);
	};

	Axios.defaults.withCredentials = true;

	const register = () => {
		Axios.post('http://localhost:3001/register', {
			username: usernameReg,
			password: passwordReg,
		}).then((response) => {
			console.log(response)
		});
	};

	const login = () => {
		Axios.post('http://localhost:3001/login', {
			username: username,
			password: password,
		}).then((response) => {
			if (!response.data.auth) {

				setLoginStatus(false);
			} else {
				localStorage.setItem("token", response.data.token);
				setLoginStatus(true);
			}
		});
	};

	const userAuthenticated = () => {
		Axios.get("http://localhost:3001/isUserAuth", {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		}).then((response) => {
			console.log(response);
		})
	}

	const logout = () => {
		localStorage.removeItem("token");
		window.location.reload(false)
	}

	useEffect(() => {

	}, [])

	return (
		<div className="home">
			{
				localStorage.getItem("token") == null ? (
					<>
						<Register
							setUsernameReg={setUsernameReg}
							setPasswordReg={setPasswordReg}
							register={register}
						/>

						<Login
							setUsername={setUsername}
							setPassword={setPassword}
							login={login}
							loginStatus={loginStatus}
							userAuthenticated={userAuthenticated}
						/>
					</>
				) : (
					<button onClick={logout}>Logout</button>
				)
			}

		</div>
	);
}

export default Home;