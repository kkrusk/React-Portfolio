const express = require('express');
const cors = require('cors');
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
	let CREATE_USER = "CALL portfolio.createUser(`?, ?, ?)`";
	conn.query(CREATE_USER, (err, results) => {
		if (err) throw res.send(err);
	});
});

app.get('/user/deleteUser', (res, req) => {
	const { name } = req.query;
	const DELETE_USER_BY_NAME = 'DELETE from members where id = '+name+'';

	conn.query(DELETE_USER_BY_NAME, (err, results) => {
		if (err) throw res.send(err);
		res.json({
			data: results
		});
	});
});

// /Paths -----------------------------

app.listen(4000, () => {
	console.log('User server listening on port 4000');
});