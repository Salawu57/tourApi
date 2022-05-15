const express =  require('express');
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routers/tourRouter');

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next)=>{
   console.log("this is a middleware call 😀")
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

 app.use('/api/v1/tours', tourRouter)

module.exports = app;

