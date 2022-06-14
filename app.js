var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const gbooksRouter = require('./routes/gbooks');
const booksRouter = require('./routes/books');

var app = express();
// var port = process.env.PORT || 5000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); //this is about the template type

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // enable body-parser
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// test if connect the mongodb successfully
mongoose.connect(process.env.ATLAS_URI);
mongoose.connection.once('open', function() {
  console.log("mongodb connect successfully");
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gbooks', gbooksRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
