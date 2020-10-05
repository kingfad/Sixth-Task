const express = require('express');
const bodyParser = require('body-parser');
let port = process.env.PORT || "3000";
const cors = require('cors');
const fs = require("fs");
const path = require("path");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(cors({ origin: `http://localhost:${port}`}));


const apiRoutes = require('./routes/bookApi');
app.use('/api/books', apiRoutes);



app.listen(port, err => {
	if (err) {
		console.log(err);
	} else {
		console.log("Server started at Port " + port)
	}
})