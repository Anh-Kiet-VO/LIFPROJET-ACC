import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Axios from "axios";

import Register from '../components/register';
import Login from '../components/login'

import "../style/home.css";

function Home() {
	const [emailReg, setEmailReg] = useState('');
	const [passwordReg, setPasswordReg] = useState('');

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [loginStatus, setLoginStatus] = useState(false);

	const [isActive, setActive] = useState("false");

	const displayRegister = () => {
		setActive(!isActive);
	};

	Axios.defaults.withCredentials = true;

	const register = () => {
		Axios.post('http://localhost:3001/register', {
			email: emailReg,
			password: passwordReg,
		}).then((response) => {
			console.log(response)
		});
	};

	const login = () => {
		Axios.post('http://localhost:3001/login', {
			email: email,
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
	return (
		<div className="home">
			<Register
				setEmailReg={setEmailReg}
				setPasswordReg={setPasswordReg}
				register={register}
			/>

			<Login
				setEmail={setEmail}
				setPassword={setPassword}
				login={login}
				loginStatus={loginStatus}
				userAuthenticated={userAuthenticated}
			/>
		</div>
	);
}

export default Home;