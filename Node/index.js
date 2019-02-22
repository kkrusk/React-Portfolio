const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

const SELECT_ALL_USERS = 'SELECT * FROM user';

const conn = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'P!zzaboy12',
	database:'portfolio'
});

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
	conn.query(SELECT_ALL_USERS, (err, results) => {
		if (err) throw err;
		res.json({
			data: results
		});
	});
});

app.get('/user/addUser', (req, res) => {
	const { name, age, image } = req.query;
	const ADD_USER = `INSERT INTO user (name, age, image) VALUES ('${name}','${age}','${image}');`;
	
	conn.query(ADD_USER, (err, results) => {
		if (err) throw res.send(err);
	});
});

app.get('/user/removeUser', (res, req) => {
	const { name } = req.query;
	const DELETE_USER_BY_NAME = `DELETE FROM user WHERE name='${name}'`;

	conn.query(DELETE_USER_BY_NAME, (err, results) => {
		if(err) throw res.send(err);
	});
});

// /Paths -----------------------------

app.listen(4000, () => {
	console.log('User server listening on port 4000');
});