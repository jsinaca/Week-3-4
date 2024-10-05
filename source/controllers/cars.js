const mongodb = require('../db/');
const ObjectID = require('mongodb').ObjectId;
const db = require('../models');
const Car = db.car;
const basecontroller = {};

basecontroller.allCars = async (req, res, next) => {
    //#swagger.tags=['Cars']
    const result = await mongodb.getDB().db().collection('cars').find();
    result.toArray((err) => {
        if (err) {
            res.status(400).json({message: err})
        }
    }).then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    })
}
basecontroller.getCar = async (req, res, next) => {
    //#swagger.tags=['Cars']
    const carId = new ObjectID(req.params.id);
    const result = await mongodb.getDB().db().collection('cars').find({_id: carId});
    result.toArray((err) => {
        if (err) {
            res.status(400).json({message: err});
        }
    }).then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list[0]);
    })
}

basecontroller.createCar = async (req, res, next) => {
    //#swagger.tags=['Cars']
    if (!req.body) {
        res.status(400).send();
        // return;
    }
    const newCar = new Car ({
        Make: req.body.Make,
        Model: req.body.Model,
        Year: req.body.Year,
        Color: req.body.Color,
        Engine: req.body.Engine,
        Miles: req.body.Miles,
        FuelType: req.body.FuelType,
        Transmission: req.body.Transmission
    })
    const response = await mongodb.getDB().db().collection('cars').insertOne(newCar);
    if (response.acknowledged ) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating Car');
    }
}
basecontroller.updateCar = async (req, res, next) => {
    //#swagger.tags=['Cars']
    const carId = new ObjectID(req.params.id);
    if (!req.body) {
        return res.status(400).send({message: 'Data to update cannot be empty'});
    }
    const update = ({
        Make: req.body.Make,
        Model: req.body.Model,
        Year: req.body.Year,
        Color: req.body.Color,
        Engine: req.body.Engine,
        Miles: req.body.Miles,
        FuelType: req.body.FuelType,
        Transmission: req.body.Transmission
    })
    const response = await mongodb.getDB().db().collection('cars').replaceOne({_id: carId}, update)
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).send({message: err.message || `Error updating Car with Id: ${carId}`})
    }
}
basecontroller.deleteCar = async (req, res, next) => {
    //#swagger.tags=['Cars']
    const carId = new ObjectID(req.params.id);
    const response = await mongodb.getDB().db().collection('cars').deleteOne({_id: carId})
    .then(result => {
        if (result.deleteCount === 0) {
            res.status(500).json(
                response.error || `Cannot delet Car with id:${carId}. Maybe Car was not found`
            )
            // return res.json('Cannot delete Car');
        }
        res.status(204).send();
    })
    // .catch(error => {
    //     res.status(500).json(
    //         response.error || `Cannot delet Car with id:${carId}. Maybe Car was not found`
    //     )
    // })
}

module.exports = basecontroller