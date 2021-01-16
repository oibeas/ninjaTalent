const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defino el tipo de datos
const addressSchema = new Schema({
    id: Number,
    street: String,
    city: String,
    country: {
        type: String,
        enum: ['ES', 'UK', 'DE', 'US']
    },
    postalcode: String
});


module.exports = addressSchema;