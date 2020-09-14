const express = require('express');
const db = require('./src/config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/routes/index');

//Initialize app
const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
app.get('/', (req, res) => res.send('API is working'))
app.use('/api', routes)
//app.use(require('./src/routes/index'));

//DB Conexion 
db.conectDB();

//Server port
app.listen(3001);