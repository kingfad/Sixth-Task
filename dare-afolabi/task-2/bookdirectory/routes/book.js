var express = require('express');
var books = require('../modules/books.js');

var router = express.Router();


// GET book listing.
router.get('/', function(req, res) {
  var allBooks = books.getBooks();
  res.json(allBooks.books);
});


// GET a book.
router.get('/:bookIsbn', function(req, res, next) {
  var theBook = books.findBook(req.params.bookIsbn);
  if (theBook === undefined) {
    res.writeHead(404, {'Content-Type' : 'text/plain'});
    res.end('Not found');
  } else {
    res.json(theBook);
  }
});


// POST(Add) a book.
router.post('/', function(req, res) {
  
  var obj = {
    title: req.body.title,
    category: req.body.category,
    author: req.body.author,
    publisher: req.body.publisher,
    year: req.body.year,
    pages: req.body.pages,
    isbn: req.body.isbn
  };
  books.addBook(obj);
  res.json({"addedBook": obj});
});


// UPDATE(Modify) a book.
router.put('/', function(req, res) {
  var obj = {
    title: req.body.title,
    category: req.body.category,
    author: req.body.author,
    publisher: req.body.publisher,
    year: req.body.year,
    pages: req.body.pages,
    isbn: req.body.isbn
  };
  var toRedirect = books.updateBook(obj);
  if (toRedirect) {
    res.send("Book can't be modified because it doesn't exist.");
  } else if(toRedirect === false) {
    res.json({"updatedBook": obj});
  } else {
    res.send('Directory is empty');
  }
});

// DELETE(Remove) a book.
router.delete('/:bookIsbn', function(req, res, next) {
  var theBook = books.removeBook(req.params.bookIsbn);
  if (theBook === undefined) {
    res.writeHead(404, {'Content-Type' : 'text/plain'});
    res.end('Not found');
  } else {
    res.json({"removedBook": theBook});
  }
});

module.exports = router;

