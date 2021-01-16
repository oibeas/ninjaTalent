const request = require('supertest');
const app = require('./app');
const mongoose = require('mongoose');
const User = require('./models/user');

describe('Test de usuarios', () => {

    beforeAll(async () => {
        await User.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    // GET localhost:3000/users/
    // Test para traer todos los usuarios
    test('Traer todos los usuarios', async () => {
        await request(app)
            .get('/users')
            .send()
            .expect(200);
    });


    // POST localhost:3000/users/
    // Test para insertar un usuario
    test('Crear un usuario', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                "id": 1,
                "firstname": "Prueba",
                "lastname": "Usuario",
                "email": "prueba@usuario.com",
                "birthDate": "1999-12-31",
                "address": {
                    "id": 1,
                    "street": "Calle del medio",
                    "city": "Vigo",
                    "country": "ES",
                    "postalcode": "39001"
                }
            })
            .expect(201);

        const user = await User.findById(response.body.result._id);
        expect(user).not.toBeNull();
    });

    test('Test con usuario invalido', async () => {
        await request(app)
            .post('/users')
            .send({
                "id": "ZZZZ",
                "firstname": "Prueba",
                "lastname": "Fallo",
                "email": "fallo@usuario.com",
                "birthDate": "2030-30-41",
                "address": {
                    "id": 0,
                    "street": "Calle Fallo",
                    "city": "Madrid",
                    "country": "MD",
                    "postalcode": 39001
                }
            })
            .expect(405);
    });


    // GET localhost:3000/users/:userId
    // Test para traer un usuario por su id
    test('Buscar un usuario por su id', async () => {
        await request(app)
            .get('/users/1')
            .send()
            .expect(200);
    });

    test('Buscar un usuario que no existe su id', async () => {
        await request(app)
            .get('/users/8888')
            .send()
            .expect(404);
    });

    test('Buscar un usuario con dato incorrecto', async () => {
        await request(app)
            .get('/users/ZZZZZ')
            .send()
            .expect(400);
    });


    // PUT localhost:3000/users/:userId
    // Test para modificar un usuario por su id
    test('Modificar usuario', async () => {
        await request(app)
            .put('/users/1')
            .send({
                "id": 1,
                "firstname": "Usuario",
                "lastname": "Modificado",
                "email": "UM@example.com",
                "birthDate": "1970-01-01",
                "address": {
                    "id": 1,
                    "street": "Plaza de Modificacion",
                    "city": "Test",
                    "country": "UK",
                    "postalcode": "00000"
                }
            })
            .expect(200);
    });

    test('Modificar usuario inexistente', async () => {
        await request(app)
            .put('/users/8888')
            .send({
                "id": 8888,
                "firstname": "Usuario",
                "lastname": "Modificado",
                "email": "UM@example.com",
                "birthDate": "1970-01-01",
                "address": {
                    "id": 8888,
                    "street": "Plaza de Modificacion",
                    "city": "Test",
                    "country": "UK",
                    "postalcode": "00000"
                }
            })
            .expect(404);
    });
    test('Modificar usuario con id incorrecto', async () => {
        await request(app)
            .put('/users/ZZZZ')
            .send({
                "id": 0,
                "firstname": "Usuario",
                "lastname": "Modificado",
                "email": "UM@example.com",
                "birthDate": "1970-01-01",
                "address": {
                    "id": 0,
                    "street": "Plaza de Modificacion",
                    "city": "Test",
                    "country": "UK",
                    "postalcode": "00000"
                }
            })
            .expect(400);
    });


    // DELETE localhost:3000/users/:userId
    // Test para borrar un usuario por su id
    test('Test para borrar un usuario por su id', async () => {
        await request(app)
            .delete('/users/1')
            .send()
            .expect(200);
    });

    test('Test para borrar un usuario que no existe', async () => {
        await request(app)
            .delete('/users/8888')
            .send()
            .expect(404);
    });

    test('Test para borrar un usuario con id incorrecto', async () => {
        await request(app)
            .delete('/users/ZZZZ')
            .send()
            .expect(400);
    });




})