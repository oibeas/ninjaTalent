ninjaTalent
============

Restful frontend on Angular

#### Firebase domain

> https://appninja-668df.web.app







RESTful backend based on Node.js and MongoDB


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
