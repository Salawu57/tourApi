const express =  require('express');
const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`))

const app = express();


// app.get('/', (req, res) => {
//     res.status(200)
//     .json({message:'Hell from the server', 
//            app:'Tour'})
// });

// app.post('/', (req, res) =>{

//     res.status(200).json({message:"You can post with this endpoint"});
// })

app.get('/api/v1/tours', (req, res) => {

    res.status(200)
    .json({
        status:"success",
        results: tours.length,
        tours
    })
})

const port = 3000;

app.listen(port, ()=> {

    console.log(`App running on port ${port}....`);

});