const express =  require('express');
const fs = require('fs');
const morgan = require('morgan');
const tourController = require('./controller/tourController');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`));

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


 const tourRouter = express.Router();

 app.use('/api/v1/tours', tourRouter)

 tourRouter.route('/').get(tourController.getAllTours).post(tourController.addTour);

 tourRouter.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);


// app.get('/api/v1/tours', getAllTours);

// app.post('/api/v1/tours', addTour);

//app.get(`/api/v1/tours/:id`, getTour)

const port = 3000;

app.listen(port, ()=> {

    console.log(`App running on port ${port}....`);

});