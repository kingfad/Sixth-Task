// Require modules
const express = require("express");
const morgan = require("morgan");
const bookRouter = require("./routes/bookRoute");

// Execute express
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// route
app.use("/api/v1/books", bookRouter);

// Error
app.all("*", (req, res, next) => {
  next(new Error(`Could not get ${req.originalUrl} on the server!`));
});

// start server
const port = 5000;
app.listen(port, () => console.log(`App running on port ${port}`));
