// Datos de conexion a la bd de MongoDB

const mongoose = require('mongoose');

// const urlDb = 'mongodb://127.0.0.1/ninjatalent'; 
const urlDb = 'mongodb+srv://ninja:3Io9xsjOacPVhtqO@ninjatalent.hwzb1.mongodb.net/ninjatalent?retryWrites=true'


mongoose.connect(urlDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(db => console.log("BD conectada"))
    .catch(err => console.error(err));