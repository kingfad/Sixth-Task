exports.getAllBooks = async (req, res, next) => {
  try {
    //   get all books
  } catch (error) {}
  res.status(200).json({
    status: "success",
    data: {
      books,
    },
  });
};
exports.getBook = async (req, res, next) => {
  try {
    //   get book by id
  } catch (error) {}
  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
};
exports.createBook = async (req, res, next) => {
  try {
  } catch (error) {}
  res.status(200).json({
    status: "success",
    message: "New book created",
    data: {
      book,
    },
  });
};
exports.updateBook = async (req, res, next) => {
  try {
    //   update bookby id
  } catch (error) {}
  res.status(200).json({
    status: "success",
    message: "Book updated",
    data: {
      book,
    },
  });
};
exports.deleteBook = async (req, res, next) => {
  try {
    //   delete book by id
  } catch (error) {}
  res.status(200).json({
    status: "success",
    message: "Book deleted",
    data: {
      book,
    },
  });
};
