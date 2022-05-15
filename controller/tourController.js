const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours-simple.json`))


exports.getAllTours = (req, res) => {

    res.status(200)
    .json({
        requestAt:req.requestTime,
        status:"success",
        results: tours.length,
        tours
    })
}

exports.getTour = (req, res) => {
    

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
 exports.addTour =  (req, res) => {

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

 exports.updateTour = (req, res) => {

    res.status(500)
    .json({
     status:'failed',
     massage:'updateApi still in progress'
    })
 }

 exports.deleteTour = (req, res) => {
    res.status(500)
    .json({
     status:'failed',
     massage:'deleteApi still on progress '
    })
 }


 