const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000
var cors = require('cors')
const router = require('express').Router()

// const host = `127.0.0.1`
app.use(cors())

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');


const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      swagger: "2.0",
      // openapi: '3.0.0',
      title: "Abiodun API Documentation",
      description: "Api for fast credit",
      version: '1.0.0',
    },
servers: [ 
      {
        url: "https://fast-credit-challenge-2.abizzy1601.repl.co/",
      },
    ],
  },
  apis: ["server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


/**
 * @swagger
 * definitions:
 *  Register:
 *   type: object
 *   properties:
 *    firstname:
 *     type: string
 *     description: User Name
 *     firstname: 'Abiodun'
 *    lastname:
 *     type: string
 *     description: Last Name
 *     lastname: 'Qudus'
 *    phone:
 *     type: number
 *     description: Phone Number
 *     phone: '0111111111'
 *    email:
 *     type: string
 *     description: user email
 *     email: 'example@example.com'
 *    gender:
 *     type: string
 *     description: Gender
 *     gender: 'Male' 
 *    DOB:
 *     type: string
 *     description: Date of Birth
 *     DOB: '12/12/2020'
 *    nationality:
 *     type: string
 *     description: Nationality
 *     nationality: 'Nigerian'
 *    passwordd:
 *     type: string
 *     description: Password
 *     passwordd: 'abiodun'
 * 
 */


/**
  * @swagger
  * /api/user/add_user:
  *  post:
  *   summary: create user
  *   description: user registration
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/Register'
  *   responses:
  *    200:
  *     description: Registration Successful
  *    400:
  *     A user exist with same email
  *    500:
  *     Error saving user
  */

/**
 * @swagger
 * /api/user/:id:
 *   get:
 *     description: Get user by Id
 *     responses:
 *       200:
 *         description: Found
 * 
 */

/**
 * @swagger
 * /api/user/:id:
 *   delete:
 *     description: delete user by Id
 *     responses:
 *       200:
 *         description: Deleted
 * 
 */

/**
 * @swagger
 * /api/user/:id:
 *   get:
 *     description: Get user by Id
 *     responses:
 *       200:
 *         description: Found
 * 
 */

/**
 * @swagger
 * /api/user/:id:
 *   put:
 *     description: Edit and update user by Id
 *     responses:
 *       200:
 *         description: Found
 * 
 */




app.use(express.static('uploads/'));

// import config
const db = require('./db')

//Use body parser to accept data from html form or in json format
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const allRoute = require('./routes/users.js')

app.use('/api/user', allRoute);
 





























app.listen(port,() => { 
    console.log(`App running on port:${port}`) 
  })