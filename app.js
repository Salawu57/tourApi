const express =  require('express');
const fs = require('fs');
const morgan = require('morgan');


const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`))

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next)=>{
   console.log("this is a middleware call 😀")
    next();
})


const getAllTours = (req, res) => {

    res.status(200)
    .json({
        status:"success",
        results: tours.length,
        tours
    })
}

const getTour = (req, res) => {
    

    const id  = Number(req.params.id);

    // if(id > tours.length){

    //     return res.status(400)
    //     .json({
    //         status : 'failed',
    //         message : 'Invalid id specified'
    //     })
    // }

    const tour = tours.find(el => el.id === id);

    if(!tour){

        return res.status(400)
        .json({
            status : 'failed',
            message : 'Invalid id specified'
        })
    }

    res.status(200)
    .json({
        status:'success',
        data:{
         tour
    }
         
    })
}

const addTour =  (req, res) => {

    const tourID = tours[tours.length - 1].id+1;
    
    const newTour = Object.assign({id:tourID}, req.body);
    
    tours.push(newTour);
    
    fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201)
    .json({
        status:'success',
        data:{
            tours : newTour
        }
    })
    })
 }

 app.route('/api/v1/tours').get(getAllTours).post(addTour);

 app.route('/api/v1/tours/:id').get(getTour);

// app.get('/api/v1/tours', getAllTours);

// app.post('/api/v1/tours', addTour);

//app.get(`/api/v1/tours/:id`, getTour)


const port = 3000;

app.listen(port, ()=> {

    console.log(`App running on port ${port}....`);

});