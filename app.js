const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const subCategoryRouter = require('./routes/subCategoryRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
dotenv.config({ path: './config.env' });
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP , please try again in an hour!'
});
app.use('/', limiter);

app.use('/users', userRouter);
app.use('/prdoucts', productRouter);
app.use('/category', categoryRouter);
app.use('/orders', orderRouter);
app.use('/subCategory', subCategoryRouter);


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);



module.exports = app;