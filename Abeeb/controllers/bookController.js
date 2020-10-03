const fs = require("fs");

const books = JSON.parse(fs.readFileSync("data.json", "utf-8"));

exports.getAllBooks = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    results: books.length,
    data: {
      books,
    },
  });
};
exports.getBook = async (req, res, next) => {
  const id = req.params.id * 1;
  const book = await books.find((el) => el.id === id);
  if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "No book found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
};
exports.createBook = async (req, res, next) => {
  // Generate a new ID based on the last ID
  const newId = books[books.length - 1].id + 1;
  // Get and set (assign and copy) new properties
  const newBook = Object.assign({ id: newId }, req.body);
  //   Add new book object to the books API
  books.push(newBook);

  //   Over-write the existing file with the newly created object
  fs.writeFile("data.json", JSON.stringify(books), (err) => {
    //   json response
    res.status(201).json({
      status: "success",
      message: "New book created",
      data: {
        book: newBook,
      },
    });
  });
};
exports.updateBook = async (req, res, next) => {
  const id = req.params.id * 1;
  const book = await books.find((el) => el.id === id);
  console.log(book);
  if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "No book found with that ID",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Book updated",
    // book:
  });
};
exports.deleteBook = async (req, res, next) => {
  const id = req.params.id * 1;
  const book = await books.find((el) => delete el.id);
  if (!book) {
    return res.status(404).json({
      status: "fail",
      message: "No book found with that ID",
    });
  }
  res.status(200).json({
    status: "success",
    message: "Book deleted",
  });
};
