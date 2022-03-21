import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Axios from "axios";
import "./App.css";
import Card from './components/card';
import Register from './components/register';
import Login from './components/login'

import Moviedetails from "./pages/moviedetails";

function App() {

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
  }
  const [movieId, setMovieId] = useState('');


  const getMovieInfo = (e) => {
    const getId = e.currentTarget.attributes.id.value;
    setMovieId(getId);
  }

  const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_URL = BASE_URL + '/discover/movie?' + API_KEY + '&sort_by=popularity.desc&page=1' /*+ '&sort_by=popularity.desc&page=1'*/ 
  
  const MOVIE_ID = '634649';
  const API_URL_DETAILS = BASE_URL + '/movie/' + MOVIE_ID + '?' + API_KEY
  const API_URL_CREDITS = BASE_URL + '/movie/' + MOVIE_ID + '/credits?' + API_KEY;
  
  const IMG_URL = 'https://image.tmdb.org/t/p/w200';
  const IMG_URL_POSTER = 'https://image.tmdb.org/t/p/w500';
  
  const SEARCH_URL = BASE_URL + '/search/movie?'+ API_KEY;
  //https://api.themoviedb.org/3/discover/movie?api_key=5ffad13612113d1554cbf7d1788c806c

  const [data, setData] = useState([]);

  useEffect( () => {
    loadMovieData();
  }, [])

  const loadMovieData = async () => {
    await fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      setData(data);
    });
  }

  const createCard = (movie) => {
    return (
      <Card
        getMovieInfo = {getMovieInfo}
        key = {movie.id}
        title = {movie.title}
        score = {movie.vote_average}
        url = {IMG_URL_POSTER + movie.poster_path}
        id = {movie.id}
      />
    )
  }
  

  /*const loadMovieDetails =  async () => {
    await fetch(API_URL_CREDITS)
    .then(res => res.json())
    .then(data => {
      
      setData(data);
      console.log(data.results[0]);
    });
  }*/
/*
  const loadData =   () => {
    axios.get('https://api.themoviedb.org/3/discover/movie?api_key=5ffad13612113d1554cbf7d1788c806c')
    .then(res => res.json())
    .then(data => {
      
      setData(data);
      console.log(data.results[0]);
    });
  }*/
  

  return (
    <div className="App">
      {
        data.results?.map(movie => (
          <div key={movie.id}><li>{movie.title}</li></div>
          
        ))
      } 

      {
        data.results?.map(movie => (
          createCard(movie)
        ))
      }
      <BrowserRouter>

        <Routes>
          <Route exact path="/details" element={<Moviedetails/>}></Route>
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

      <Register
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
      />

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