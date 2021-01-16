// Datos de conexion a la bd de MongoDB

const mongoose = require('mongoose');

const urlDb = 'mongodb://127.0.0.1/ninjatalent';

mongoose.connect(urlDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(db => console.log("BD conectada"))
    .catch(err => console.error(err));