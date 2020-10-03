const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(morgan('dev'));

app.use('/api/v1', routes);

const PORT = 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));