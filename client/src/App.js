import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";
import "./App.css";

import Moviedetails from "./pages/MovieDetails";
import Tvdetails from "./pages/TvDetails";
import Movie from "./pages/Movie";
import Tv from "./pages/Tv";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";
import UserList from "./pages/Userlist";

/*
	Affiche la barre de navigation et met en place les différentes routes
*/

function App() {

	return (
		<div className="main">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/detailMovie/:id" element={<Moviedetails />}></Route>
					<Route path="/detailTv/:id" element={<Tvdetails />}></Route>
					<Route path="/" element={<Home />}></Route>
					<Route path="/movie" element={<Movie />}></Route>
					<Route path="/tv" element={<Tv />}></Route>
					<Route exact path="/profile/:id" element={<Profile />}></Route>
					<Route path="/edit/:id" element={<Edit />}></Route>
					<Route exact path="/userlist" element={<UserList />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;