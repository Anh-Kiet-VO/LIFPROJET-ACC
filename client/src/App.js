import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";
import "./App.css";

import Moviedetails from "./pages/moviedetails";
import Tvdetails from "./pages/tvdetails";
import Movie from "./pages/movie";
import Tv from "./pages/Tv";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Profile from "./pages/profile";
import Edit from "./pages/edit";
import UserList from "./pages/userlist";

/*
	On initialise les routes ici.
	Pour chaque chemin on va afficher des pages différentes
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
					<Route path="/profile/:id" element={<Profile />}></Route>
					<Route path="/edit/:id" element={<Edit />}></Route>
					<Route path="/userlist" element={<UserList />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;