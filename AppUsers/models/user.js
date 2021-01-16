const mongoose = require('mongoose');
const addressSchema = require('./address'); //Añadimos el modelo address

//Defino el tipo de datos
const userSchema = mongoose.model('user', {
    id: Number,
    firstname: String,
    lastname: String,
    email: String,
    birthDate: Date,
    address: addressSchema
});

module.exports = userSchema;