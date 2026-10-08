const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv');
const globalErrorHandler = require('./controller/errorController');
const appError = require('./utils/appError');
 
dotenv.config({path:'./config.env'});
app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
}

const weatherRoutes = require('./Routes/weatherRoutes');
app.use('/api/v1/weather',weatherRoutes);

// if user enter a router doesn't exist
app.all('/{*splat}', (req, res, next) => {
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this server`,
      404
    )
  );
});


app.use(globalErrorHandler)

module.exports = app;