const express = require('express');
const app = express();
const bodyParser = require('body-paerser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

//Nu finns det en koppling till Postgress databasen
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'viktorlarsson',
    password: '',
    database: 'smart-brain',
  },
});

db.select('*').from('users').then(data => {
	console.log(data);
});

app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			password: "cookies",
			email: 'john@gmail.com'
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			password: "bananas",
			email: 'sally@gmail.com'
			entries: 1, 
			joined: new Date()
		}
	],
	login: [
		{
			id: '987',
			hash: ' ',
			email: 'john@gmail.com'
		}
	]

}

app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	// Kan användas för att jämföra om hash:et stämmer med varandra
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});
	if (req.body.email === database.users[0].email 
		&& req.body.password ===database.users[0].password) {
		res.json('sucess');
	} else {
		res.status(400).json('error logging in');
	}
})

//Får Postgress databasen att fungera 
app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	const hash = bcrypt.hashSync(password);
	db('users')
		.returning('*')
		.insert({
     	email: email,
    	 name: name,
     	joined: new Date(	)
	})
	.then(user => {
		res.json(user[0]);
	})
	.catch(err => res.status(400).json('Unable to join'))
})


app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	db.select('*').from('users').where({id})
	.then(user => {
		if (user.length) {
			res.json(user[0])
		} else {
			res.status(400).json('Not found'))
		}
	})
	.catch(err => res.status(400).json('error getting user'))
})

app.put('/image', (req, res) => {
const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
  	res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
})


app.listen(3000, ()=> {
	console.log('App is running on port 3000');
})