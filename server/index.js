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
	methods: ["GET", "POST"],
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
	if (req.session.users) {
		console.log("existe")
		res.send({ loggedIn: true, users: req.session.users })
	} else {
		res.send({ loggedIn: false })
		console.log("pas de user")
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
							expiresIn: "1h",
						})
						req.session.users = result;
						console.log(req.session.users)

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
		'INSERT INTO crud (movieId, status, score, progress, userId) VALUES (?,?,?,?,?)',
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


app.listen(3001, () => {
	console.log("Server running on port 3001");
});
