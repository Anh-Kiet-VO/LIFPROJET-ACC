const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");

const app = express();

/*
	Les méthodes utilisé afin de ne pas avoir de problème CORS
	et lorsqu'on envoie des requêtes
*/
app.use(express.json());
app.use(cors({
	origin: ["http://localhost:3000"],
	methods: ["GET", "POST", "DELETE", "PUT"],
	credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

/*
	On créer une session avec cookie expiration de 1jours
*/
app.use(session({
	key: "userId",
	secret: "cecilia",
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 99999999,
		httpOnly: true,
	},
})
);

/*
	Connection de notre BDD local
*/
const db = mysql.createConnection({
	user: "root",
	host: "localhost",
	password: "",
	database: "lifprojet",
});

/*
	Récupère les informations transmis pour enregister
	un nouvel utilisateur dans la BDD
	et insère dans la table users.
*/
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

/*
	Vérifie si l'utilisateur possède un token
*/
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

/*
	Permet de verifier si l'utilisateur est bien connecté
*/
app.get("/login", (req, res) => {
	if (req.session.user) {
		res.send({ loggedIn: true, user: req.session.user })
	} else {
		res.send({ loggedIn: false })
	}
})

/*
	Si on reçoit une demande de login on vérifie si l'utilisateur
	existe dans la BDD et on compare les mots de passe
	Si les informations correspondent, on crée un token accessible
	dans localStorage
*/
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

/*
	Si on reçoit un post on récupère les informations reçus du front-end
	et on envoie une requête à la BDD afin d'insérer cette nouvelle donnée
	dans notre table watchlist
*/
app.post('/create', (req, res) => {
	const movieId = req.body.movieId;
	const title = req.body.title;
	const status = req.body.status;
	const score = req.body.score;
	const progress = req.body.progress;
	const userId = req.body.userId;

	db.query(
		'INSERT INTO watchlist (movieId, title, status, score, progress, userId) VALUES (?,?,?,?,?,?)',
		[movieId, title, status, score, progress, userId],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Valeur inséré")
			}
		}
	);
})

/*
	Récupère toutes les informations de la table users en fonction de l'id passé en paramètre
*/
app.get('/basicInfo/:id', (req, res) => {
	const id = req.params.id;
	db.query(
		'SELECT * FROM users WHERE id = ?',
		id,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
})

// On récupère tous les id des utilisateurs enregistré sur le site
app.get('/getAllId', (req, res) => {
	db.query(
		'SELECT id, username FROM users',
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
})

/*
	On récupère la liste de film/série en fonction de l'utilisateur reçu en paramètre
*/
app.get('/movieList/:username', (req, res) => {
	const username = req.params.username;
	db.query(
		'SELECT * FROM watchlist WHERE userId = ?',
		username,
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result);
			}
		}
	);
})

/*
	On delete un film/série en fonction de l'id reçu en paramètre
*/
app.delete('/delete/:movieId', (req, res) => {
	const movieId = req.params.movieId;
	db.query(
		'DELETE FROM watchlist WHERE movieId = ?', [movieId],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Valeur supprimé");
			}
		}
	)
})

/*
	Si on reçoit un put /update du front on va mettre à jours les informations
	du film/série en question et en fonction de l'utilisateur qui a fait cette demande
*/
app.put('/update', (req, res) => {
	const movieId = req.body.movieId;
	const status = req.body.status;
	const score = req.body.score;
	const progress = req.body.progress;
	const userId = req.body.userId;

	db.query(
		'UPDATE watchlist SET score = ?, status = ?, progress = ? WHERE movieId = ? AND userId= ?', [score, status, progress, movieId, userId],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Valeur modifié");
			}
		}
	)
})

// Si on reçoit un get /showList du front on va selectionner toute la liste des films
app.get('/showList', (req, res) => {
	db.query(
		"SELECT * FROM watchlist",
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send(result)
			}
		}
	);
})

// Dès que l'utilisateur  se déconnecte on supprime notre cookie userId
app.get('/delete-cookie', (req, res) => {
	res.clearCookie('userId');
	res.send("Cookie supprimé, deconnexion");
});

// Le port que express va écouter, c'est le port de notre serveur API
app.listen(3001, () => {
	console.log("Server running on port 3001");
});
