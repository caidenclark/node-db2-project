const express =  require('express')

const db = require('./data/dbConfig.js')

const server = express();

server.use(express.json());

//GET ALL CARS
server.get('/api/cars', (req, res) => {
    db('cars')
        .then(cars => {
            res.json(cars)
        })
        .catch(() => {
            res.status(500).json({ message: "Failed to get cars." })
        })
})

//ADD CAR
server.post('/api/cars', (req, res) => {
    const newCar = { vin: req.body.vin, make: req.body.make, model: req.body.model, mileage: req.body.mileage, transmission: req.body.transmission, title_status: req.body.title_status };

    db('cars').insert(newCar)
        .then(id => {
            db('cars').where({ id: id[0] })
            .then(car => {
                res.json({ message: "Car was created successfully", car: car })
            })
            .catch(() => {
                res.json({ message: "There was an error fetching this new car" })
            })
        })
        .catch(() => {
            res.json({ message: "There was an error creating this car." })
        }) 
})

module.exports = server;