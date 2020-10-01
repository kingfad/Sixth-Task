const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/', (req, res, next) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end("<html><body><h1>a book directory. goto '/books' to see all books or '/books/bookID' for a specific book</h1></body></html>");
});

app.get('/books', (req, res, next) => {
	fs.readFile('./json/books.json', (err, data) => {
		if (err) throw err;
		
		let books = JSON.parse(data);
		console.log(books);
		
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(books);
	});
});

app.post('/books', (req, res, next) => {
	let book = req.body;
	console.log(book);
	
	fs.readFile('./json/books.json', (err, data) => {
		if (err) throw err;
		
		let books = JSON.parse(data);
		
		var id = books.length;
		book._id = id;
		books[id] = book;
		books = JSON.stringify(books, null, 2);
		
		fs.writeFile('./json/books.json', books, (err) => {
			if (err) throw err;
			
			console.log('Data written to file');
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(JSON.parse(books));
		});
	});
});

app.put('/books', (req, res, next) => {
	res.end('PUT operation not supported');
});

app.delete('/books', (req, res, next) => {
	books = [];
	books = JSON.stringify(books, null, 2);
	
	fs.writeFile('./json/books.json', books, (err) => {
			if (err) throw err;
			
			console.log('Data written to file');
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(JSON.parse(books));
		});
});

app.get('/books/:bookID', (req, res, next) => {
	fs.readFile('./json/books.json', (err, data) => {
		if (err) throw err;
		
		let books = JSON.parse(data);
		var book = books[req.params.bookID];
		console.log(book);
		
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(book);
	});
});

app.post('/books/:bookID', (req, res, next) => {
	res.end('POST operation not supported');
});

app.put('/books/:bookID', (req, res, next) => {
	fs.readFile('./json/books.json', (err, data) => {
		if (err) throw err;
		
		let books = JSON.parse(data);
		var book = books[req.params.bookID];
		console.log(book);
		
		book = Object.assign(book, req.body); 
		books[req.params.bookID] = book;
		
		books = JSON.stringify(books, null, 2);
		
		fs.writeFile('./json/books.json', books, (err) => {
			if (err) throw err;
			
			console.log('Data written to file');
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(JSON.parse(books));
		});
	});
});

app.delete('/books/:bookID', (req, res, next) => {
	fs.readFile('./json/books.json', (err, data) => {
		if (err) throw err;
		
		let books = JSON.parse(data);
		books[req.params.bookID] = null;
		
		books = JSON.stringify(books, null, 2);
		
		fs.writeFile('./json/books.json', books, (err) => {
			if (err) throw err;
			
			console.log('Data written to file');
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json(JSON.parse(books));
		});
	});
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});