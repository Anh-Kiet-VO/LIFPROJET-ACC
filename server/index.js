const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const fetch = require('node-fetch');

const app = express();

app.use(express.json());
app.use(cors({
	origin: ["http://localhost:3000"],
	methods: ["GET", "POST"],
	credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(session({
	key: "userId",
	secret: "cecilia",
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 60 * 60 * 24,
	},
	})
);

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "",
	database: "loginsystem",
});

app.post('/register', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	bcrypt.hash(password, saltRounds, (err, hash) => {
		if (err) {
			console.log(err);
		}
		db.query(
			"INSERT into user (email, password) VALUES (?, ?)",
			[email, hash],
			(err, result) => {
				console.log(err);
			}
		);
	})
});

app.get("/login", (req, res) => {
	if(req.session.user) {
		res.send( {loggedIn: true, user: req.session.user})
	} else {
		res.send( {loggedIn: false})
	}
})

app.get("/", (req, res) => {
	res.send('AAAAA');
})
/*
app.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	db.query(
		"SELECT * FROM user WHERE email = ?;",
		email,
		(err, result) => {
			if(err) {
				res.send( { err: err })
			}
			if(result.length > 0) {
					res.send(result);
				} else {
					res.send( { message : "Wrong email/password combination!" });
				}
		}
	);	
});*/


app.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	db.query(
		"SELECT * FROM user WHERE email = ?;",
		email,
		(err, result) => {
			if(err) {
				res.send( { err: err })
			}
			if(result.length > 0) {
				bcrypt.compare(password, result[0].password, (err, response) => {
					if(response) {
						req.session.user = result	;	
						res.send(result);
					} else {
						res.send( { message : "Wrong email/password combination!" });
					}
				});	
			} else {
				res.send( { message : "User doesn't exist" });
			}
		}
	);
});


app.listen(3001, () => {
	console.log("Server running on port 3001");
});


const API_KEY = "api_key=5ffad13612113d1554cbf7d1788c806c";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + '/discover/movie?' + API_KEY; /*+ '&sort_by=popularity.desc&page=1'*/ 

const MOVIE_ID = '634649';
const API_URL_DETAILS = BASE_URL + '/movie/' + MOVIE_ID + '?' + API_KEY/*+ '&sort_by=popularity.desc&page=1'*/ 
const API_URL_CREDITS = BASE_URL + '/movie/' + MOVIE_ID + '/credits?' + API_KEY;

const IMG_URL = 'https://image.tmdb.org/t/p/w200';
const IMG_URL_POSTER = 'https://image.tmdb.org/t/p/w500';

const SEARCH_URL = BASE_URL + '/search/movie?'+ API_KEY;

getMovieInfo(API_URL_DETAILS, API_URL_CREDITS);

function getMovieInfo(url1, url2) {
	fetch(url1).then(res => res.json()).then(data1 => {
	  
	  //let datastring= JSON.stringify(data1)
	  //let json = JSON.parse(datastring);
	  //let myJson = {budget: json.title, releaseDate: json.release_date, overview: json.overview, popularity: json.popularity}
  
	  console.log("detail");
  
	  //showMovieDetails(data1);
	  
	})
	fetch(url2).then(res => res.json()).then(data2 => {
		console.log("credits");
	})
}

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
       console.log(data.result);
    })
}