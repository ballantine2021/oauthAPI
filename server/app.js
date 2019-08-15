const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const app = express();


// Middleware
if (!process.env.NODE_ENV === 'test'){
    app.use(morgan('dev'));
}
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));
app.use(express.static('../helpers/privacy.html'));

module.exports = app;