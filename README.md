ninjaTalent
============

### Restful Front-end on Angular

#### Firebase domain

> https://appninja-668df.web.app


#### Aplicacion desarrollada para generar los servicios (RESTful) y conectar con el Back-end.
#### Interfaz desarrollada en Angular que permite, listar, crear, editar y eliminar usuarios. Dispone de una pagina principal donde se listan los usuarios y un formulario para crear nuevos usuarios o editarlos.






### RESTful Back-end based on Node.js and MongoDB


#### Heroku domain


> https://ninjatalent.herokuapp.com


#### Endpoints


> /users/
```bash
"get": {
        "description": "Get all users",
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/Models/user"
              }
            }
          }
        }
      }
```

> /users/
```bash
 "post": {
        "parameters": [
          {
            "in": "body",
            "name": "user",
            "schema": {
              "$ref": "#/Models/user"
            },
            "required": true
          }
        ],
        "responses": {
          "201": {
            "description": "CREATED",
            "schema": {
              "$ref": "#/Models/user"
            }
          },
          "405": {
            "description": "Invalid input"
          }
        }
      }
```
> /users/{userId}
```bash
"get": {
        "description": "Get one user",
        "parameters": [
          {
            "in": "path",
            "name": "userId",
            "type": "integer",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/Models/user"
            }
          },
          "400": {
            "description": "Bad request
          },
          "404": {
            "description": "User not found"
          }
        }
      }
```
> /users/{userId}
```bash
"put": {
        "parameters": [
          {
            "in": "path",
            "name": "userId",
            "type": "integer",
            "required": true
          },
          {
            "in": "body",
            "name": "user",
            "schema": {
              "$ref": "#/Models/user"
            },
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/Models/user"
            }
          },
          "400": {
            "description": "Bad request"
          },
          "404": {
            "description": "User not found"
          }
        }
      }
```
> /users/{userId}
```bash
"delete": {
        "parameters": [
          {
            "in": "path",
            "name": "userId",
            "type": "integer",
            "required": true
          }
        ],
        "responses": {
          "200": {
            "description": "OK"
          },
          "400": {
            "description": "Bad request"
          },
          "404": {
            "description": "User not found"
          }
        }
      }
```
#### Models


```bash
"user": {
      "properties": {
        "id": {
          "type": "integer"
        },
        "firstname": {
          "type": "string"
        },
        "lastname": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "birthDate": {
          "type": "string($date)",
        },
        "address": {
          "$ref": "#/Models/address"
        }
      }
    },
"address": {
      "properties": {
        "id": {
          "type": "integer"
        },
        "street": {
          "type": "string"
        },
        "state": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "country": {
          "type": "string",
          "Enum": [ ES, UK, DE, US ],
        },
        "postalcode": {
          "type": "string"
        }
      }
    }
```

#### Running test

Run next command from CLI:
```bash
npm run test
```


## Autores ✒️

_Prueba técnica ninjaTalent_

* **Óscar Ibeas** - *Autor* - [oibeas](https://github.com/oibeas)
* **LINKEDIN** -[oibeas](https://www.linkedin.com/in/oscaribeas/)

