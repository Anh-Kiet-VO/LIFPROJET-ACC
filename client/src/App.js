import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";
import "./App.css";
import CardMovie from './components/cardMovie';
import Register from './components/register';
import Login from './components/login';

import Moviedetails from "./pages/moviedetails";
import Tvdetails from "./pages/tvdetails"
import Movie from "./pages/movie";
import Tv from "./pages/Tv";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
	/*const [emailReg, setEmailReg] = useState('');
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
		if(!response.data.auth) {
			
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
	}*/

	return (
		<div className="App">

			<BrowserRouter>
				<Navbar />
				<Routes>

					<Route path="/detailMovie/:id" element={<Moviedetails />}></Route>
					<Route path="/detailTv/:id" element={<Tvdetails />}></Route>
					<Route path="/" element={<Home />}></Route>
					<Route path="/movie" element={<Movie />}></Route>
					<Route path="/tv" element={<Tv />}></Route>
				</Routes>
			</BrowserRouter>

			{/* <div className="registration">
		<div className={isActive? "hidden" : ""} id="register-modal">
			<h1>Registration</h1>
			<label>Email</label>
			<input
				type="email"
				onChange={(e) => {
				setEmailReg(e.target.value);
				}}
			/>
			<label>Password</label>
			<input
				type="text"
				onChange={(e) => {
				setPasswordReg(e.target.value);
				}}
			/>
			<button onClick={register}>Register</button>
			</div>
			
			<button onClick={displayRegister}>S'inscrire</button>
		</div> */}

			{ /*<Register
			setEmailReg = {setEmailReg}
			setPasswordReg = {setPasswordReg}
			register = {register}
		/>

		<Login
			setEmail = {setEmail}
			setPassword = {setPassword}
			login = {login}
			loginStatus = {loginStatus}
			userAuthenticated = {userAuthenticated}
		/>*/ }

			{/*<div className="Login">
			<h1>Login</h1>
			<input
			type="email"
			placeholder="Email@Email.fr"
			onChange={(e) => {
				setEmail(e.target.value);
			}}
			/>
			<input
			type="password"
			placeholder= "Password..."
			onChange={(e) => {
				setPassword(e.target.value);
			}}
			/>
			<button onClick={login}>Login</button>
		</div>

		{loginStatus && (
			<button onClick={userAuthenticated}>Check if authenticate</button>
		)}}*/}
		</div>
	);
}

export default App;