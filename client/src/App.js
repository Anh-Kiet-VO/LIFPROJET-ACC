import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import axios from "axios";
import CompSheet from './components/CompSheet';
import Card from './components/card';


function App() {

  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginStatus, setLoginStatus] = useState('');

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post('http://localhost:3001/register', {
      email: emailReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response)
      console.log("caca")
    });
  };

  const login = () => {
    Axios.post('http://localhost:3001/login', {
      email: email,
      password: password,
    }).then((response) => {
      if(response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].email);
      }
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if(response.data.loggedIn === true) {
        setLoginStatus(response.data[0].email);
      }
    })
  }, [])

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

  const createSheet = (media) => {
    return (
      <CompSheet 
        key = {media.id}
        id = {media.id}
        title = {media.title}
        description = {media.overview}
        score = {media.vote_average}
        url_img = {IMG_URL_POSTER + media.poster_path}
      />
    )
}

  const createCard = (movie) => {
    return (
      <Card
        key = {movie.id}
        title = {movie.title}
        score = {movie.vote_average}
        url = {IMG_URL_POSTER + movie.poster_path}
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
  
  /*
  return (
    <div className="App">
      {
        data.results?.map(movie => (
          createCard(movie)
        ))
      }

    </div>
  );
  */

  return (
    <div className="App">
      {
        data.results?.map(movie => (
          createCard(movie)
        ))
      }
    </div>
  );
  
  //PREMIER RETURN

  /* return (
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

      <div className="registration">
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

      <div className="Login">
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

      <h1>{loginStatus}</h1>
    </div>
  ); */
}

export default App;