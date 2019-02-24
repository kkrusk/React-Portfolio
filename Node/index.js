const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const conn = require('./config.js').localConnect();
const app = express();

conn.connect(err => { 
  if (err) throw err;
  console.log("Connected!");
});

app.use(cors());

// Paths -----------------------------
app.get('/', (req, res) => {
	console.log('Made it');
});

app.get('/user', (req, res) => {
	const SELECT_ALL_USERS = 'CALL portfolio.selectAllUsers()';
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
	const send = [name, email, password];
	CREATE_USER = mysql.format(CREATE_USER, send);

	conn.query(CREATE_USER, send,  (err, results) => {
		if (err) throw res.send(err);
	});
});

app.get('/user/login', (res, req) => {
	const { name, password } = req.query;
	let LOGIN_USER = 'SELECT * FROM USER WHERE name = ? AND password = ?';
	const send = [name, password];
	LOGIN_USER = mysql.format(LOGIN_USER, send);

	conn.query(LOGIN_USER, send, (err, results) => {
		if (err) throw res.send(err);
		res.json({
			data: results[0]
		});
	})
})

app.get('/user/deleteUser', (res, req) => {
	const { name } = req.query;
	let DELETE_USER_BY_NAME = 'DELETE FROM user where id = ?';
	const send = [name];
	DELETE_USER_BY_NAME = mysql.format(CREATE_USER, send);

	conn.query(DELETE_USER_BY_NAME, send, (err, results) => {
		if (err) throw res.send(err);
		
	});
});

// /Paths -----------------------------

app.listen(4000, () => {
	console.log('User server listening on port 4000');
});