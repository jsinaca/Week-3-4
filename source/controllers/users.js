const mongodb = require('../db/');
const ObjectID = require('mongodb').ObjectId;
const db = require('../models');
const User = db.user;
const basecontroller = {};

basecontroller.allUsers = async (req, res, next) => {
    //#swagger.tags=['Users']
    const result = await mongodb.getDB().db().collection('users').find();
    result.toArray((err) => {
        if (err) {
            res.status(400).json({message: err})
        }
    }).then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    })
}
basecontroller.getUser = async (req, res, next) => {
    //#swagger.tags=['Users']
    const userId = new ObjectID(req.params.id);
    const result = await mongodb.getDB().db().collection('users').find({_id: userId});
    result.toArray((err) => {
        if (err) {
            res.status(400).json({message: err});
        }
    }).then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list[0]);
    })
}

basecontroller.createUser = async (req, res, next) => {
    //#swagger.tags=['Users']
    if (!req.body) {
        return;
    }
    const newUser = new User ({
        email:req.body.email,
        lastName:req.body.lastName,
        firstName:req.body.firstName,
        DOB:req.body.DOB,
        age:req.body.age
    })
    const response = await mongodb.getDB().db().collection('users').insertOne(newUser);
    if (response.acknowledged ) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating User');
    }
}
basecontroller.updateUser = async (req, res, next) => {
    //#swagger.tags=['Users']
    const userId = new ObjectID(req.params.id);
    if (!req.body) {
        return res.status(400).send({message: 'Data to update cannot be empty'});
    }
    const update = ({
        email:req.body.email,
        lastName:req.body.lastName,
        firstName:req.body.firstName,
        DOB:req.body.DOB,
        age:req.body.age
    })
    const response = await mongodb.getDB().db().collection('users').replaceOne({_id: userId}, update)
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).send({message: err.message || `Error updating User with Id: ${userId}`})
    }
}
basecontroller.deleteUser = async (req, res, next) => {
    //#swagger.tags=['Users']
    const userId = new ObjectID(req.params.id);
    const response = await mongodb.getDB().db().collection('users').deleteOne({_id: userId})
    .then(result => {
        if (result.deleteCount === 0) {
            return res.json('Cannot delete User');
        }
        res.json('User deleted');
    })
    .catch(error => {
        res.status(500).json(
            response.error || `Cannot delet User with id:${userId}. Maybe User was not found`
        )
    })
}

module.exports = basecontroller;