const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
let bcrypt = require('bcrypt');
let saltRounds = 10;
const conn = require('./config.js').localConnect();
const app = express();

conn.connect(err => {
	if (err) throw err;
	console.log("Connected!");
});

app.use(cors());

app.get('/', (req, res) => {
	console.log('Made it');
});

app.get('/user', (req, res) => {
	let SELECT_ALL_USERS = 'CALL portfolio.selectAllUsers()';
	SELECT_ALL_USERS = mysql.format(SELECT_ALL_USERS);

	conn.query(SELECT_ALL_USERS, (err, results) => {
		if (err) throw err;
		res.json({
			data: results[0]
		});
	});
});

app.get('/user/addUser', (req, res) => {
	const { name, email, password } = req.query;
	let CREATE_USER = `INSERT INTO user(name, email, password) VALUES(?,?,?)`;
	let input = [name, email, password];

	bcrypt.hash(input[2], saltRounds, function (err, hash) {
		if (err) throw err;
		input[2] = hash;
		console.log(input[2]);
		CREATE_USER = mysql.format(CREATE_USER, input);
		conn.query(CREATE_USER, input, (err, results) => {
			if (err) throw err

		});
	});
});

app.get('/user/deleteUser', (req, res) => {
	const { id } = req.query.id;
	let DELETE_USER_BY_NAME = 'CALL deleteUser(?)';
	const input = [id];
	DELETE_USER_BY_NAME = mysql.format(DELETE_USER_BY_NAME, input);

	conn.query(DELETE_USER_BY_NAME, input, (err, results) => {
		if (err) throw err
	});
});

app.get('/user/login', (req, res) => {
	const { email, password } = req.query;
	let LOGIN_USER_EMAIL = `SELECT * FROM user WHERE email = ?`;
	let em = [email];
	LOGIN_USER_EMAIL = mysql.format(LOGIN_USER_EMAIL, em);
	conn.query(LOGIN_USER_EMAIL, em, (err, results) => {
		if (err) throw err;
		let hash = JSON.parse(JSON.stringify(results[0].password));
		console.log(hash);

		bcrypt.compare(password, hash, function (err, acceptedPassword) {
			if (err) throw err;
			if (acceptedPassword) {
				console.log('madeit');
				res.json({
					data: results[0]
				});
			};
		});
	});
});

// /Paths -----------------------------

app.listen(4000, () => {
	console.log('User server listening on port 4000');
});