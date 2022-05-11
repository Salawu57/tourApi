const express =  require('express');
const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`))

const app = express();

app.use(express.json());



app.get('/api/v1/tours', (req, res) => {

    res.status(200)
    .json({
        status:"success",
        results: tours.length,
        tours
    })
})

app.post('/api/v1/tours', (req, res) =>{

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

})

const port = 3000;

app.listen(port, ()=> {

    console.log(`App running on port ${port}....`);

});