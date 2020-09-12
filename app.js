const express = require('express');
const db = require('./src/config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

//Initialize app
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use(require('./src/config/urls'));

//DB Conexion 
db.conectDB();

//Server port
app.listen(3001);