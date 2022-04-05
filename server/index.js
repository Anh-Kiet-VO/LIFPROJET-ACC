const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

const fetch = require('node-fetch');

const app = express();

app.use(express.json());
app.use(cors({
	origin: ["http://localhost:3000"],
	methods: ["GET", "POST", "DELETE"],
	credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
	key: "userId",
	secret: "cecilia",
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 60 * 60 * 24,
		httpOnly: false
	},
})
);

const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "",
	database: "lifprojet",
});

app.post('/register', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	bcrypt.hash(password, saltRounds, (err, hash) => {
		if (err) {
			console.log(err);
		}
		db.query(
			"INSERT into users (username, password) VALUES (?, ?)",
			[username, hash],
			(err, result) => {
				console.log(err);
			}
		);
	})
});

const verifiyJWT = (req, res, next) => {
	const token = req.headers["x-access-token"]

	if (!token) {
		res.send("Besoin d'un token, envoyez le nous la prochaine fois");
	} else {
		jwt.verify(token, "jwtSecret", (err, decoded) => {
			if (err) {
				res.json({ auth: false, message: "Echec de l'authentification" });
			} else {
				req.userId = decoded.id;
				next();
			}
		})
	}
}

app.get("/isUserAuth", verifiyJWT, (req, res) => {
	res.send("Bien connecté")
})

app.get("/login", (req, res) => {
	if (req.session.user) {
		console.log("existe");
		res.send({ loggedIn: true, user: req.session.user })
	} else {
		res.send({ loggedIn: false })
		console.log("user en loggedIn false : " + req.session.user);
	}
})

app.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	db.query(
		"SELECT * FROM users WHERE username = ?;",
		username,
		(err, result) => {
			if (err) {
				res.send({ err: err })
			}
			if (result.length > 0) {
				bcrypt.compare(password, result[0].password, (err, response) => {
					if (response) {
						const id = result[0].id;
						const token = jwt.sign({ id }, "jwtSecret", {
							expiresIn: 300,
						})
						req.session.user = result;
						console.log(req.session.user)

						res.json({ auth: true, token: token, result: result });
					} else {
						res.json({ auth: false, message: "Wrong username/password combination" });
					}
				});
			} else {
				res.json({ auth: false, message: "No user exist" });
			}
		}
	);
});

app.post('/create', (req, res) => {
	const movieId = req.body.movieId;
	const status = req.body.status;
	const score = req.body.score;
	const progress = req.body.progress;
	const userId = req.body.userId;

	db.query(
		'INSERT INTO watchlist (movieId, status, score, progress, userId) VALUES (?,?,?,?,?)',
		[movieId, status, score, progress, userId],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Valeur inséré")
			}
		}
	);
})

// app.delete('/delete', (req, res) => {
// 	const movieId = req.body.movieId;
// 	const status = req.body.status;
// 	const score = req.body.score;
// 	const progress = req.body.progress;
// 	const userId = req.body.userId;
// 	db.query(
// 		'DELETE FROM watchlist WHERE movieId = ? AND status = ? AND score = ? AND progress = ? AND userId = ?',
// 		[movieId, status, score, progress, userId],
// 		(err, result) => {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				res.send("Valeur supprimé");
// 			}
// 		}
// 	)
// })

app.delete('/delete/:movieId', (req, res) => {
	const movieId = req.params.movieId;

	db.query(
		'DELETE FROM watchlist WHERE movieId = ?', [movieId],
		(err, result) => {
			if (err) {
				console.log("Film non supprimé");
				console.log(err);
			} else {
				res.send("Valeur supprimé");
			}
		}
	)
})

app.get('/showList', (req, res) => {
	const username = req.headers["userID"];
	db.query(
		"SELECT * FROM watchlist",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result)
				console.log(result)
			}
		}
	);
})


app.listen(3001, () => {
	console.log("Server running on port 3001");
});
