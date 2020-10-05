const express = require("express")
const bodyParser = require("body-parser")
const books = require("./src/books.json")
const app = express()
const port = 6000

app.use(bodyParser.json())

app.listen(port, () => console.log(`app running on port ${port}`))

const router = require("express").Router()

let booksDirectory = books

router.get("/books", function (req, res) {
  res.send(booksDirectory)
})

router.get("/books/:id", function (req, res) {
  const { id } = req.params

  const book = booksDirectory.find((b) => b.isbn === id)
  if (!book) return res.status(404).send("Book does not exist")

  res.send(book)
})

router.post("/books", function (req, res) {
  const { isbn, title, authors, year } = req.body

  const bookExist = booksDirectory.find((b) => b.isbn === isbn)
  if (bookExist) return res.send("Book already exist")

  const book = {
    isbn,
    title,
    authors,
    year
  }
  booksDirectory.push(book)

  res.send(book)
})

router.put("/books/:id", function (req, res) {
  const { id } = req.params
  const { isbn, title, authors, year } = req.body

  let book = booksDirectory.find((b) => b.isbn === id)
  if (!book) return res.status(404).send("Book does not exist")

  const updateField = (val, prev) => (!val ? prev : val)

  const updatedBook = {
    ...book,
    isbn: updateField(isbn, book.isbn),
    title: updateField(title, book.title),
    authors: updateField(authors, book.authors),
    year: updateField(year, book.year)
  }

  const bookIndex = booksDirectory.findIndex((b) => b.isbn === book.isbn)
  booksDirectory.splice(bookIndex, 1, updatedBook)

  res.status(200).send(updatedBook)
})

router.delete("/books/:id", function (req, res) {
  const { id } = req.params

  let book = booksDirectory.find((b) => b.isbn === id)
  if (!book) return res.status(404).send("Book does not exist")

  booksDirectory = booksDirectory.filter((b) => b.isbn !== id)

  res.send("Success")
})

module.exports = router
