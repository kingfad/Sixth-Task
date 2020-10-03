const express = require('express');
const router = express.Router();

const BookDirectoryController = require('../controllers/controllers');

router.get('/', BookDirectoryController.testRoute);

// get all books
router.get('/books', BookDirectoryController.getAllBooks);

// get one book by id
router.get('/books/:id', BookDirectoryController.getOneBook);

// post a book
router.post('/books', BookDirectoryController.postBook);

// update a book by id
router.put('/books/:id', BookDirectoryController.updateBook);

// delete a book by id
router.delete('/books/:id', BookDirectoryController.deleteBook);


module.exports = router;