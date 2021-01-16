var express = require('express');
var router = express.Router();
const User = require('../models/user');

//GET localhost:3000/users/
// Metodo para traer todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.send({ description: "OK", users });
  } catch (error) {
    res.status(500).send();
  }
});


//POST localhost:3000/users/
//Metodo para crear usuarios
router.post('/', async (req, res) => {
  const user = new User(req.body);
  try {
    const result = await user.save();
    res.status(201).send({ description: "CREATED", result });
  } catch (error) {
    res.status(405).send({ description: "Invalid input" });
  }
})


//GET localhost:3000/users/userId
//Metodo para recuperar un usuario por su id
router.get('/:userId', async (req, res) => {
  const id = req.params.userId;
  // console.log(id);
  try {
    const user = await User.findOne({ id });
    if (!user) {
      res.status(404).send({ description: "User not found" });
    } else {
      res.send({ description: "OK", user });
    }
  } catch (error) {
    res.status(400).send({ description: "Bad request" });
  }
});

//PUT localhost:3000/users/userId
//Metodo para modificar un usuario por su id
router.put('/:userId', async (req, res) => {
  const id = req.params.userId;
  const usuarioMod = req.body;
  try {
    const user = await User.findOneAndUpdate({ id }, usuarioMod, { new: true, useFindAndModify: false });
    if (!user) {
      res.status(404).send({ description: "User not found" });
    } else {
      res.send({ description: "OK", user });
    }
  } catch (error) {
    res.status(400).send({ description: "Bad request" });
  }
});


//DELETE localhost:3000/users/userId
//Metodo para borrar un usuario por su id
router.delete('/:userId', async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await User.findOneAndDelete({ id });
    if (!user) {
      res.status(404).send({ description: "User not found" });
    } else {
      res.send({ description: "OK", user });
    }
  } catch (error) {
    res.status(400).send({ description: "Bad request" });
  }
})



module.exports = router;
