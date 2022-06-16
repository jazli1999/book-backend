import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import indexRouter from './src/routes/index.js';
import usersRouter from './src/routes/users.js';
import gbooksRouter from './src/routes/gbooks.js';
import booksRouter from './src/routes/books.js';

const app = express();
// var port = process.env.PORT || 3000;

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); // this is about the template type

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // enable body-parser
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// test if connect the mongodb successfully
mongoose.connect(process.env.ATLAS_URI);
mongoose.connection.once('open', () => {
    console.log('mongodb connect successfully');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gbooks', gbooksRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
