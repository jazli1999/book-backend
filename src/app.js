import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
// import gbooksRouter from './routes/gbooks.js';
import booksRouter from './routes/books.js';
import authRouter from './routes/auth.js';
import orderRouter from './routes/orders.js';
import bookmateRouter from './routes/bookmates.js';
import subscriptionRouter from './routes/subscription.js';
import reviewRouter from './routes/review.js';

import messageRouter from './routes/message.js';

const app = express();

app.use(cors());
app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // enable body-parser
app.use(cookieParser());
// test if connect the mongodb successfully
mongoose.connect(process.env.ATLAS_URI);
mongoose.connection.once('open', () => {
    console.log('mongodb connect successfully');
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/gbooks', gbooksRouter);
app.use('/books', booksRouter);
app.use('/auth', authRouter);
app.use('/orders', orderRouter);
app.use('/bookmates', bookmateRouter);

app.use('/messages', messageRouter);
app.use('/reviews', reviewRouter);

app.use('/subscription', subscriptionRouter);

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

app.disable('etag');

export default app;
