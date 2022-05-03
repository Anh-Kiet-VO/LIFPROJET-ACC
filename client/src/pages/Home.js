import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Axios from "axios";

import Register from '../components/Register';
import Login from '../components/Login'

import "../style/home.css";

import { IconContext } from 'react-icons/lib';
import * as Vsc from 'react-icons/vsc';

/*
	Accueil du site, il ne sert qu'à gérer l'authentification
*/
function Home() {
	const [usernameReg, setUsernameReg] = useState('');
	const [passwordReg, setPasswordReg] = useState('');

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [loginStatus, setLoginStatus] = useState(false);

	const [openLogin, setOpenLogin] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);

	const [inscrit, setInscrit] = useState("");

	Axios.defaults.withCredentials = true;

	// Requête vers l'API pour envoyer les données du nouveau utilisateur enregistré
	const register = () => {
		Axios.post('http://localhost:3001/register', {
			username: usernameReg,
			password: passwordReg,
		}).then((response) => {
			console.log(response);
			setInscrit(response.data);
			console.log(inscrit);
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

	/* On supprime le cookie en le faisant expirer
	const deleteCookie = async () => {
		document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
	}*/

	// Déconnecte l'utilisateur en supprimant le token créer suite à la connexion
	// et supprime le cookie en faisant une requête à notre serveur
	const logout = () => {
		localStorage.removeItem("token");
		Axios.get('/delete-cookie')
			.then(window.location.reload(false));
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

	// Permet d'afficher l'onglet de connexion
	const openLoginHandler = () => {
		var active = document.getElementsByClassName('is-active')[0];
		if(active) active.classList.remove('is-active');
		document.activeElement.classList.add('is-active');
		setOpenLogin(true);
		setOpenRegister(false);
	}

	// Permet d'afficher l'onglet d'inscription
	const openRegisterHandler = () => {
		var active = document.getElementsByClassName('is-active')[0];
		if(active) active.classList.remove('is-active');
		document.activeElement.classList.add('is-active');
		setOpenRegister(true);
		setOpenLogin(false);
	}

	// Permet de fermer l'onlet en cours
	const close = () => {
		setOpenLogin(false);
		setOpenRegister(false);
		document.getElementsByClassName('is-active')[0].classList.remove('is-active');
	}

	return (
		<div className="home">
			{openLogin && (
				<IconContext.Provider value={{ color: 'white' }}>
				<div className="login">
					<button className="btn-close" onClick={() => { close(); }}><Vsc.VscChromeClose /></button>
					<>
						<Login
							setUsername={setUsername}
							setPassword={setPassword}
							login={login}
							loginStatus={loginStatus}
							userAuthenticated={userAuthenticated}
						/>
					</>
				</div>
				</IconContext.Provider>
			)
			}
			{openRegister && (
				<IconContext.Provider value={{ className: 'icon' }}>
				<div className="register">
					<button className="btn-close" onClick={() => { close(); }}><Vsc.VscChromeClose /></button>
					{
						inscrit && (
							<span className="inscritOk">{inscrit}</span>
						)
					}
					<>
						<Register
							setUsernameReg={setUsernameReg}
							setPasswordReg={setPasswordReg}
							register={register}
						/>
					</>
				</div>
				</IconContext.Provider>
			)
			}
			{!openLogin && !openRegister && (
				<div className="intro">
					<h1>AC</h1>
					<p>Le site qui vous permet d'être à jour sur tous vos films et vos séries préférées. Laissez-vous guider et séduire par le plus grand catalogue jamais proposé !</p>
				</div>
			)
			}
			
			<div className="buttons">
				{
					localStorage.getItem("token") == null ? (
						<>
							<button onClick={() => { openLoginHandler(); }}>Connexion</button>
							<button className="btn-rg" onClick={() => { openRegisterHandler(); }}>Inscription</button>
						</>
					) : (
						<button onClick={logout}>Se déconnecter</button>
					)
				}
			</div>
			<div className="bg-home"></div>
		</div>
	);
}

export default Home;