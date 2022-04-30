import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Axios from "axios";

import Register from '../components/register';
import Login from '../components/login'

import "../style/home.css";

/*
	Accueil du site, il ne sert qu'à gérer l'authentification
*/
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

	// Requête vers l'API pour envoyer les données du nouveau utilisateur enregistré
	const register = () => {
		Axios.post('http://localhost:3001/register', {
			username: usernameReg,
			password: passwordReg,
		}).then((response) => {
			console.log(response)
		});
	};

	// Requête vers l'API pour envoyer les données de l'utilisateur connecté
	const login = () => {
		Axios.post('http://localhost:3000/login', {
			username: username,
			password: password,
		}).then((response) => {
			if (!response.data.auth) {
				setLoginStatus(false);
			} else {
				localStorage.setItem("token", response.data.token);
				setLoginStatus(true);
				window.location.reload(false);
			}
		});
	};

	// Vérifie si un utilisateur est connecté
	const userAuthenticated = () => {
		Axios.get("http://localhost:3001/isUserAuth", {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		}).then((response) => {
			console.log(response);
		})
	}

	const deleteCookie = async () => {
		document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	}

	// Déconnecte l'utilisateur en supprimant le token créer suite à la connexion
	const logout = () => {
		localStorage.removeItem("token");
		deleteCookie();
		window.location.reload(false)
	}


	// Récupère le username si l'utilisateur est connecté
	useEffect(() => {
		Axios.get("http://localhost:3000/login")
			.then((response) => {
				if (response.loggedIn == true) {
					setUsername(response.data.user[0].username)
				}
			})
	})

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